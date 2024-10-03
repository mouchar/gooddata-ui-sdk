// (C) 2024 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { Icon, Typography } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import cx from "classnames";

import { IDashboardVisualizationSwitcherProps } from "./types.js";
import {
    useDashboardSelector,
    selectInsightsMap,
    selectSettings,
    useDashboardScheduledEmails,
} from "../../../model/index.js";
import { useDashboardComponentsContext } from "../../../presentation/dashboardContexts/index.js";
import {
    DashboardItem,
    DashboardItemVisualization,
    getVisTypeCssClass,
} from "../../../presentation/presentationComponents/index.js";
import { IInsight, IInsightWidget, insightVisualizationType, widgetTitle } from "@gooddata/sdk-model";
import { VisType } from "@gooddata/sdk-ui";
import { InsightWidgetDescriptionTrigger } from "../description/InsightWidgetDescriptionTrigger.js";
import { useInsightExport } from "../common/index.js";
import { useAlertingAndScheduling } from "../widget/InsightWidget/useAlertingAndScheduling.js";
import { useInsightMenu } from "../widget/InsightWidget/useInsightMenu.js";
import { VisualizationSwitcherNavigationHeader } from "../widget/VisualizationSwitcherWidget/VisualizationSwitcherNavigationHeader.js";
import { useExecutionProgress } from "./useExecutionProgress.js";
import { AllVisualizationsDashInsights } from "./AllVisualizationsDashInsights.js";

/**
 * @internal
 */
export const ViewModeDashboardVisualizationSwitcher: React.FC<IDashboardVisualizationSwitcherProps> = (
    props,
) => {
    const {
        widget,
        activeVisualizationId: initialActiveVisualizationId,
        onError,
        onExportReady,
        onLoadingChanged,
        screen,
    } = props;

    const [activeVisualizationId, setActiveVisualizationId] = React.useState(initialActiveVisualizationId);

    const activeVisualization =
        widget.visualizations.find((visualization) => visualization.identifier === activeVisualizationId) ??
        widget.visualizations[0];

    const insights = useDashboardSelector(selectInsightsMap);
    const insight = activeVisualization ? insights.get(activeVisualization.insight) : undefined;

    if (!activeVisualization || !insight) {
        return <ViewModeDashboardVisualizationSwitcherEmpty />;
    } else {
        return (
            <ViewModeDashboardVisualizationSwitcherContent
                widget={widget}
                insight={insight}
                activeVisualization={activeVisualization}
                screen={screen}
                onError={onError}
                onExportReady={onExportReady}
                onLoadingChanged={onLoadingChanged}
                onActiveVisualizationChange={setActiveVisualizationId}
            />
        );
    }
};

export const ViewModeDashboardVisualizationSwitcherEmpty: React.FC = () => {
    const theme = useTheme();
    const intl = useIntl();
    const emptyContentIconColor = theme?.palette?.complementary?.c7 ?? "#6D7680";

    return (
        <div className="gd-visualization-switcher-widget-empty-content">
            <Icon.VisualizationSwitcher width={32} height={38} color={emptyContentIconColor} />
            <Typography tagName="p">
                {intl.formatMessage({ id: "visualizationSwitcher.emptyContent" })}
            </Typography>
        </div>
    );
};

export interface IViewModeDashboardVisualizationSwitcherContentProps
    extends IDashboardVisualizationSwitcherProps {
    insight: IInsight;
    activeVisualization: IInsightWidget;
    onActiveVisualizationChange: (activeVisualizationId: string) => void;
}

export const ViewModeDashboardVisualizationSwitcherContent: React.FC<
    IViewModeDashboardVisualizationSwitcherContentProps
> = ({
    widget,
    insight,
    activeVisualization,
    onActiveVisualizationChange,
    screen,
    onError,
    onExportReady,
    onLoadingChanged,
}) => {
    const intl = useIntl();
    const visType = insightVisualizationType(insight) as VisType;
    const settings = useDashboardSelector(selectSettings);

    const { showOthers } = useExecutionProgress();

    const { ref: widgetRef } = activeVisualization;

    const { exportCSVEnabled, exportXLSXEnabled, onExportCSV, onExportXLSX } = useInsightExport({
        widgetRef,
        title: widgetTitle(activeVisualization) || intl.formatMessage({ id: "export.defaultTitle" }),
        insight,
    });

    const {
        onScheduleEmailingOpen,
        onScheduleEmailingManagementOpen,
        isScheduledEmailingVisible,
        isScheduledManagementEmailingVisible,
        numberOfAvailableDestinations,
    } = useDashboardScheduledEmails();

    const onScheduleExport = useCallback(() => {
        onScheduleEmailingOpen(activeVisualization);
    }, [onScheduleEmailingOpen, activeVisualization]);

    const onScheduleManagementExport = useCallback(() => {
        onScheduleEmailingManagementOpen(activeVisualization);
    }, [onScheduleEmailingManagementOpen, activeVisualization]);

    const {
        isAlertingVisible,
        alertingDisabled,
        alertingDisabledReason,
        scheduleExportDisabled,
        scheduleExportManagementDisabled,
        scheduleExportDisabledReason,
    } = useAlertingAndScheduling({
        widget: activeVisualization,
        insight,
        numberOfAvailableDestinations,
    });

    const { closeMenu, isMenuOpen, menuItems, openMenu } = useInsightMenu({
        insight,
        widget: activeVisualization,
        exportCSVEnabled,
        exportXLSXEnabled,
        onExportCSV,
        onExportXLSX,
        onScheduleExport,
        onScheduleManagementExport,
        isScheduleExportVisible: isScheduledEmailingVisible,
        isScheduleExportManagementVisible: isScheduledManagementEmailingVisible,
        isAlertingVisible,
        alertingDisabled,
        alertingDisabledReason,
        scheduleExportDisabled,
        scheduleExportManagementDisabled,
        scheduleExportDisabledReason,
    });
    const toggleMenu = useCallback(() => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, [isMenuOpen, closeMenu, openMenu]);

    const { InsightMenuButtonComponentProvider, InsightMenuComponentProvider } =
        useDashboardComponentsContext();

    const InsightMenuButtonComponent = useMemo(
        () => InsightMenuButtonComponentProvider(insight, activeVisualization),
        [InsightMenuButtonComponentProvider, insight, activeVisualization],
    );

    const InsightMenuComponent = useMemo(
        () => InsightMenuComponentProvider(insight, activeVisualization),
        [InsightMenuComponentProvider, insight, activeVisualization],
    );

    return (
        <DashboardItem
            className={cx(
                "type-visualization",
                "gd-dashboard-view-widget",
                getVisTypeCssClass(activeVisualization.type, visType),
            )}
            screen={screen}
        >
            <DashboardItemVisualization
                renderHeadline={(clientHeight, clientWidth) => (
                    <VisualizationSwitcherNavigationHeader
                        widget={widget}
                        clientHeight={clientHeight}
                        clientWidth={clientWidth}
                        activeVisualization={activeVisualization}
                        onActiveVisualizationChange={(activeVisualizationId) =>
                            onActiveVisualizationChange(activeVisualizationId)
                        }
                    />
                )}
                renderBeforeVisualization={() => (
                    <div className="gd-absolute-row">
                        {settings?.enableDescriptions ? (
                            <InsightWidgetDescriptionTrigger
                                insight={insight}
                                widget={activeVisualization}
                                screen={screen}
                            />
                        ) : null}
                        <InsightMenuButtonComponent
                            insight={insight}
                            widget={activeVisualization}
                            isOpen={isMenuOpen}
                            onClick={toggleMenu}
                            items={menuItems}
                        />
                    </div>
                )}
                renderAfterContent={() => {
                    if (!isMenuOpen) {
                        return null;
                    }

                    return (
                        <InsightMenuComponent
                            insight={insight}
                            widget={activeVisualization}
                            isOpen={isMenuOpen}
                            onClose={closeMenu}
                            items={menuItems}
                        />
                    );
                }}
            >
                {({ clientHeight, clientWidth }) => (
                    <AllVisualizationsDashInsights
                        visualizations={widget.visualizations}
                        activeVisualization={activeVisualization}
                        showOthers={showOthers}
                        onExportReady={onExportReady}
                        onError={onError}
                        onLoadingChanged={onLoadingChanged}
                        clientHeight={clientHeight}
                        clientWidth={clientWidth}
                    />
                )}
            </DashboardItemVisualization>
        </DashboardItem>
    );
};
