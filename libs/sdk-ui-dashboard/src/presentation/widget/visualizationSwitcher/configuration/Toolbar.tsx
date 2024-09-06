// (C) 2024 GoodData Corporation

import { Bubble, Button, GD_COLOR_HIGHLIGHT, Icon, Typography } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import React, { useCallback, useState } from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";

import {
    IInsight,
    IInsightWidget,
    IVisualizationSwitcherWidget,
    idRef,
    insightRef,
    insightTitle,
} from "@gooddata/sdk-model";
import { gdColorStateBlank } from "../../../constants/colors.js";
import noop from "lodash/noop.js";

import { DashboardInsightMenuBody } from "../../insightMenu/DefaultDashboardInsightMenu/DashboardInsightMenu/index.js";
import {
    selectInsightsMap,
    selectRenderMode,
    selectSettings,
    useDashboardSelector,
} from "../../../../model/index.js";
import { IInsightMenuSubmenu } from "../../insightMenu/index.js";
import { useEditableInsightMenu } from "../../widget/InsightWidget/useEditableInsightMenu.js";
import { useIntl } from "react-intl";
import {
    defaultAlignPoints,
    defaultArrowOffsets,
    defaultArrowDirections,
} from "../../common/configuration/ConfigurationBubble.js";
import { getSizeInfo } from "../../../../_staging/layout/sizing.js";
import { InsightList } from "../../../insightList/index.js";
import { DashboardInsightSubmenuHeader } from "../../insightMenu/DefaultDashboardInsightMenu/DashboardInsightMenu/DashboardInsightSubmenuHeader.js";
import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";

interface ToolbarProps {
    widget: IVisualizationSwitcherWidget;
    onVisualizationsChanged: (visualizations: IInsightWidget[]) => void;
    onVisualizationAdded: (insightWidget: IInsightWidget, insight: IInsight, sizeInfo: any) => void; // TODO INE any
    onWidgetDelete: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    widget,
    onVisualizationsChanged,
    onVisualizationAdded,
    onWidgetDelete,
}) => {
    const visualizations = widget.visualizations;

    const [isVisualizationsListVisible, setVisualizationsListVisible] = useState(true);

    const [activeVisualizationId, setActiveVisualizationId] = useState(visualizations[0]?.identifier);
    const settings = useDashboardSelector(selectSettings);

    const onVisualizationAdd = useCallback(
        (insight: IInsight) => {
            const sizeInfo = getSizeInfo(settings, "insight", insight);
            const identifier = uuid();

            const newWidget: IInsightWidget = {
                type: "insight",
                insight: insightRef(insight),
                ignoreDashboardFilters: [],
                drills: [],
                title: insightTitle(insight),
                description: "",
                identifier,
                localIdentifier: identifier,
                uri: "",
                ref: idRef(identifier),
            };
            onVisualizationAdded(newWidget, insight, sizeInfo);
        },
        [onVisualizationAdded, settings],
    );

    const onVisualizationDelete = useCallback(
        (widgetId: string) => {
            onVisualizationsChanged(
                visualizations.filter((visualization) => visualization.identifier !== widgetId),
            );
        },
        [onVisualizationsChanged, visualizations],
    );

    const toggleVisualizationsList = () => {
        setVisualizationsListVisible(!isVisualizationsListVisible);
    };

    const onNavigate = useCallback((identifier: string) => {
        setActiveVisualizationId(identifier);
    }, []);

    const onVisualizationSelect = useCallback((identifier: string) => {
        setActiveVisualizationId(identifier);
        setVisualizationsListVisible(false);
    }, []);

    const activeVisualization = visualizations.find(
        (visualization) => visualization.identifier === activeVisualizationId,
    );

    const showVisualizationsList = isVisualizationsListVisible || !activeVisualization;
    const alignTo = ".s-dash-item.is-selected";
    const ignoreClicksOnByClass = [alignTo]; // do not close on click to the widget
    const configBubbleClassNames = cx(
        "edit-insight-config",
        "s-edit-insight-config",
        "edit-insight-config-title-1-line",
        "edit-insight-config-arrow-color",
    );

    return (
        <Bubble
            className={cx(
                "gd-configuration-bubble s-gd-visualization-switcher-toolbar-bubble",
                configBubbleClassNames,
            )}
            overlayClassName="gd-configuration-bubble-wrapper sdk-edit-mode-on"
            alignTo={alignTo}
            alignPoints={defaultAlignPoints}
            arrowOffsets={defaultArrowOffsets}
            arrowDirections={defaultArrowDirections}
            closeOnOutsideClick
            closeOnParentScroll={false}
            ignoreClicksOnByClass={ignoreClicksOnByClass}
            arrowStyle={{ display: "none" }}
        >
            <ToolbarTop
                visualizations={visualizations}
                onNavigate={onNavigate}
                activeVisualizationId={activeVisualizationId}
                onDelete={onWidgetDelete}
                toggleVisualizationsList={toggleVisualizationsList}
                visualizationsListShown={showVisualizationsList}
            />
            <ToolbarBottom
                visualizations={visualizations}
                activeVisualizationId={activeVisualizationId}
                showVisualizationsList={showVisualizationsList}
                onVisualizationAdd={onVisualizationAdd}
                onVisualizationDelete={onVisualizationDelete}
                onVisualizationSelect={onVisualizationSelect}
            />
        </Bubble>
    );
};

interface IToolbarTopProps {
    visualizations: IInsightWidget[];
    activeVisualizationId: string | undefined;
    onNavigate: (widgetId: string) => void;
    onDelete: () => void;
    toggleVisualizationsList: () => void;
    visualizationsListShown: boolean;
}

const ToolbarTop: React.FC<IToolbarTopProps> = ({
    visualizations,
    onNavigate,
    activeVisualizationId: activeWidgetId,
    onDelete,
    toggleVisualizationsList,
    visualizationsListShown,
}) => {
    const theme = useTheme();
    const activeWidgetIndex = visualizations.findIndex(() => activeWidgetId);

    const prevDisabled = activeWidgetIndex <= 0;
    const nextDisabled = activeWidgetIndex === -1 || activeWidgetIndex >= visualizations.length - 1;

    const iconColor = visualizationsListShown
        ? theme?.palette?.primary?.base ?? GD_COLOR_HIGHLIGHT
        : theme?.palette?.complementary?.c6 ?? gdColorStateBlank;

    const enabledColor = theme?.palette?.complementary?.c7 ?? "#6D7680";
    const disabledColor = theme?.palette?.complementary?.c5 ?? "#B0BECA";

    const prevColor = prevDisabled ? disabledColor : enabledColor;
    const nextColor = nextDisabled ? disabledColor : enabledColor;

    const onNavigatePrev = useCallback(() => {
        if (prevDisabled) {
            return;
        }
        const prevIndex = activeWidgetIndex - 1;
        const prevWidgetId = visualizations[prevIndex].identifier;
        onNavigate(prevWidgetId);
    }, [activeWidgetIndex, visualizations, onNavigate, prevDisabled]);

    const onNavigateNext = useCallback(() => {
        if (nextDisabled) {
            return;
        }
        const nextIndex = activeWidgetIndex + 1;
        const nextWidgetId = visualizations[nextIndex].identifier;
        onNavigate(nextWidgetId);
    }, [activeWidgetIndex, visualizations, onNavigate, nextDisabled]);

    return (
        <div className="visualization-switcher-toolbar-top bubble-light">
            <div className="left-section" onClick={toggleVisualizationsList}>
                <Icon.VisualizationSwitcher color={iconColor} width={20} height={20} />
            </div>
            <div className="vertical-divider" />
            <div className="middle-section">
                <div className="navigate-button navigate-prev" onClick={onNavigatePrev}>
                    <Icon.ArrowLeft color={prevColor} />
                </div>
                <div className="status">
                    {activeWidgetIndex + 1}/{visualizations.length}
                </div>
                <div className="navigate-button navigate-next" onClick={onNavigateNext}>
                    <Icon.ArrowRight color={nextColor} />
                </div>
            </div>
            <div className="vertical-divider" />
            <div className="right-section">
                <Button
                    className="gd-button-link gd-button-icon-only gd-icon-trash s-visualization-switcher-remove-button"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

interface IToolbarBottomProps {
    visualizations: IInsightWidget[];
    activeVisualizationId: string | undefined;
    onVisualizationAdd: (insight: IInsight) => void;
    onVisualizationDelete: (visualizationWidgetId: string) => void;
    onVisualizationSelect: (visualizationWidgetId: string) => void;
    showVisualizationsList: boolean;
}

const ToolbarBottom: React.FC<IToolbarBottomProps> = ({
    showVisualizationsList,
    visualizations,
    onVisualizationAdd,
    onVisualizationDelete,
    onVisualizationSelect,
    activeVisualizationId,
}) => {
    const activeVisualization = visualizations.find(
        (visualization) => visualization.identifier === activeVisualizationId,
    );

    return (
        <div className="visualization-switcher-toolbar-bottom bubble-light">
            {showVisualizationsList || !activeVisualization ? (
                <VisualizationsPage
                    visualizations={visualizations}
                    activeVisualizationId={activeVisualizationId}
                    onVisualizationAdd={onVisualizationAdd}
                    onVisualizationDeleted={onVisualizationDelete}
                    onVisualizationSelect={onVisualizationSelect}
                />
            ) : (
                <VisualizationConfig widget={activeVisualization} />
            )}
        </div>
    );
};

interface IVisualizationsPageProps {
    visualizations: IInsightWidget[];
    activeVisualizationId: string | undefined;
    onVisualizationAdd: (insight: IInsight) => void;
    onVisualizationDeleted: (visualizationWidgetId: string) => void;
    onVisualizationSelect: (visualizationWidgetId: string) => void;
}

const VisualizationsPage: React.FC<IVisualizationsPageProps> = ({
    visualizations,
    activeVisualizationId,
    onVisualizationDeleted,
    onVisualizationAdd,
    onVisualizationSelect,
}) => {
    const [isVisualizationPickerVisible, setVisualizationPickerVisible] = React.useState(false);

    const intl = useIntl();

    const insights = useDashboardSelector(selectInsightsMap);

    const onAdd = () => {
        setVisualizationPickerVisible(!isVisualizationPickerVisible);
    };
    const onBack = () => {
        setVisualizationPickerVisible(!isVisualizationPickerVisible);
    };

    const onAdded = (insight: IInsight) => {
        onVisualizationAdd(insight);
        setVisualizationPickerVisible(false);
    };
    return isVisualizationPickerVisible ? (
        <InsightPicker onInsightSelect={onAdded} onBack={onBack} />
    ) : (
        <div className="edit-insight-config">
            <div className="insight-configuration">
                <div className="insight-configuration-panel-header">
                    <Typography tagName="h3" className="widget-title">
                        <span>
                            {intl.formatMessage({
                                id: "visualizationSwitcherToolbar.visualizationsList.header",
                            })}
                        </span>
                    </Typography>
                </div>
                <div className="insight-configuration-content">
                    {visualizations.length === 0 && (
                        <div className="no-visualizations-text">
                            {intl.formatMessage({
                                id: "visualizationSwitcherToolbar.visualizationsList.empty",
                            })}
                        </div>
                    )}
                    <VisualizationsList
                        visualizations={visualizations}
                        insights={insights}
                        activeVisualizationId={activeVisualizationId}
                        onVisualizationDeleted={onVisualizationDeleted}
                        onVisualizationSelect={onVisualizationSelect}
                    />
                    <div className="horizontal-divider">
                        <div className="horizontal-divider-line" />
                    </div>
                    <Button
                        className="gd-button-link gd-icon-plus gd-add-visualization s-visualization-switcher-add-button"
                        onClick={onAdd}
                    >
                        {intl.formatMessage({ id: "visualizationSwitcherToolbar.visualizationsList.add" })}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const VisualizationConfig: React.FC<{ widget: IInsightWidget }> = ({ widget }) => {
    const insights = useDashboardSelector(selectInsightsMap);
    const fakeInsight: IInsight = {
        insight: {
            buckets: [
                {
                    items: [
                        {
                            measure: {
                                localIdentifier: "5c7210080e9e47328d0e3d2a3b54af7f",
                                definition: {
                                    measureDefinition: {
                                        item: {
                                            identifier: "87a053b0-3947-49f3-b0c5-de53fd01f050",
                                            type: "measure",
                                        },
                                        filters: [],
                                    },
                                },
                                title: "Amount",
                            },
                        },
                    ],
                    localIdentifier: "measures",
                },
                {
                    items: [
                        {
                            attribute: {
                                localIdentifier: "199571ef00d74addb94b49801192ff7c",
                                displayForm: { identifier: "user_id", type: "displayForm" },
                            },
                        },
                        {
                            attribute: {
                                localIdentifier: "7c00e367648b4415b9ad061d0ba7b459",
                                displayForm: { identifier: "user_id.username", type: "displayForm" },
                            },
                        },
                    ],
                    localIdentifier: "attribute",
                },
            ],
            filters: [],
            sorts: [
                {
                    attributeSortItem: {
                        attributeIdentifier: "199571ef00d74addb94b49801192ff7c",
                        direction: "asc",
                    },
                },
            ],
            properties: {
                sortItems: [
                    {
                        attributeSortItem: {
                            attributeIdentifier: "199571ef00d74addb94b49801192ff7c",
                            direction: "asc",
                        },
                    },
                ],
            },
            visualizationUrl: "local:table",
            title: "Users",
            summary: "",
            identifier: "c9b7bca1-3384-4931-a57d-e49dc4bea810",
            uri: "https://staging.dev-latest.stg11.panther.intgdc.com/api/v1/entities/workspaces/4d6dec78f9304bf7a578992a837f8307/visualizationObjects/c9b7bca1-3384-4931-a57d-e49dc4bea810",
            ref: { identifier: "c9b7bca1-3384-4931-a57d-e49dc4bea810", type: "insight" },
            isLocked: false,
            created: "2024-08-30 08:43",
        },
    };
    const insight = insights.get(widget.insight) ?? fakeInsight;

    if (!insight) {
        // eslint-disable-next-line no-console
        console.debug(
            "DefaultDashboardInsightWidget rendered before the insights were ready, skipping render.",
        );
        return null;
    }

    return <VisualizationConfigContent widget={widget} insight={insight} />;
};

const VisualizationConfigContent: React.FC<{ widget: IInsightWidget; insight: IInsight }> = ({
    widget,
    insight,
}) => {
    const { menuItems } = useEditableInsightMenu({
        widget,
        insight,
        closeMenu: noop,
    });
    const renderMode = useDashboardSelector(selectRenderMode);
    const [submenu, setSubmenu] = useState<IInsightMenuSubmenu | null>(null);

    return (
        <DashboardInsightMenuBody
            widget={widget}
            insight={insight}
            items={menuItems}
            submenu={submenu}
            setSubmenu={setSubmenu}
            renderMode={renderMode}
            isOpen={true}
            onClose={noop}
        />
    );
};

interface IInsightPickerProps {
    onInsightSelect: (insight: IInsight) => void;
    onBack: () => void;
}

const InsightPicker: React.FC<IInsightPickerProps> = ({ onInsightSelect, onBack }) => {
    const intl = useIntl();
    return (
        <div className="visualization-picker">
            <div className="configuration-panel-header" onClick={onBack}>
                <DashboardInsightSubmenuHeader
                    title={intl.formatMessage({
                        id: "visualizationSwitcherToolbar.visualizationsList.add",
                    })}
                    onHeaderClick={onBack}
                />
            </div>
            <div className="open-visualizations s-open-visualizations">
                <InsightList
                    height={260}
                    width={240}
                    searchAutofocus={true}
                    onSelect={(insight) => {
                        onInsightSelect(insight);
                    }}
                />
            </div>
        </div>
    );
};

interface IVisulizationsListProps {
    visualizations: IInsightWidget[];
    insights: ObjRefMap<IInsight>;
    activeVisualizationId: string | undefined;
    onVisualizationDeleted: (visualizationWidgetId: string) => void;
    onVisualizationSelect: (visualizationWidgetId: string) => void;
}

const VisualizationsList: React.FC<IVisulizationsListProps> = ({
    visualizations,
    activeVisualizationId,
    onVisualizationDeleted,
    onVisualizationSelect,
}) => {
    return visualizations.map((visualization) => (
        <div
            key={visualization.identifier}
            className={cx("switcher-visualizations-list-item", {
                "is-active": visualization.identifier === activeVisualizationId,
            })}
        >
            <div
                className="visualization-title"
                onClick={() => onVisualizationSelect(visualization.identifier)}
            >
                {/* TODO INE: get insight type */}
                {visualization.title}
            </div>
            <Button
                className="gd-button-link gd-button-icon-only gd-icon-trash s-visualization-switcher-remove-button"
                onClick={() => onVisualizationDeleted(visualization.identifier)}
            />
        </div>
    ));
};
