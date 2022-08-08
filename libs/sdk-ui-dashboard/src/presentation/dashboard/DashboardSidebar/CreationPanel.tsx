// (C) 2007-2022 GoodData Corporation
import { Typography } from "@gooddata/sdk-ui-kit";
import React from "react";

import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { CreatableAttributeFilter } from "./CreationalPanelItems/CreatableAttributeFilter";
import { CreatableKpi } from "./CreationalPanelItems/CreatableKpi";
import { DraggableInsightList } from "./DraggableInsightList";
import { selectSupportsKpiWidgetCapability, useDashboardSelector } from "../../../model";

interface ICreationPanelProps {
    isSticky: boolean;
}

export const CreationPanel: React.FC<ICreationPanelProps> = ({ isSticky = false }) => {
    const supportsKpis = useDashboardSelector(selectSupportsKpiWidgetCapability);
    return (
        <div className="configuration-panel creation-panel">
            <div
                className={cx("flex-panel-full-vh-height", {
                    "sticky-panel": isSticky,
                })}
            >
                <Typography tagName="h2" className="flex-panel-item-nostretch">
                    <FormattedMessage id="visualizationsList.dragToAdd" />
                </Typography>
                <div className="configuration-category drag-to-add">
                    <Typography tagName="h3">
                        <FormattedMessage id="addPanel.newItem" />
                    </Typography>
                    <div className="add-item-panel">
                        <CreatableAttributeFilter />
                        {supportsKpis && <CreatableKpi />}
                    </div>
                </div>
                <div className="configuration-category configuration-category-vis drag-to-add flex-panel-item-stretch">
                    <Typography tagName="h3">
                        <FormattedMessage id="visualizationsList.savedVisualizations" />
                    </Typography>
                    <DraggableInsightList />
                </div>
            </div>
        </div>
    );
};
