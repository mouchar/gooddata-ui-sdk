// (C) 2022 GoodData Corporation
import React from "react";

import { DashboardInsight } from "../ViewModeDashboardInsight/Insight/DashboardInsight";
import { IDashboardInsightProps } from "../types";

/**
 * @internal
 */
export const EditModeDashboardInsight = (props: IDashboardInsightProps): JSX.Element => {
    return <DashboardInsight {...props} />;
};
