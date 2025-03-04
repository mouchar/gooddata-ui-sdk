// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart";
import { ICoreChartProps } from "../../interfaces";

export class CoreBulletChart extends React.PureComponent<ICoreChartProps> {
    public render() {
        return <BaseChart type="bullet" {...this.props} />;
    }
}
