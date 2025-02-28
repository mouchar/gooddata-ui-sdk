// (C) 2020-2022 GoodData Corporation
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IMeasureDescriptor, IMeasureGroupDescriptor, IResultAttributeHeader } from "@gooddata/sdk-model";
import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess";
import { getLighterColor, IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import { parseValue, unwrap } from "../_util/common";
import isEqual from "lodash/isEqual";
import { IPointData } from "../../typings/unsafe";

function getColorStep(valuesCount: number): number {
    const MAX_COLOR_BRIGHTNESS = 0.8;
    return MAX_COLOR_BRIGHTNESS / valuesCount;
}

function gradientPreviousGroup(solidColorLeafs: any[]): any[] {
    const colorChange = getColorStep(solidColorLeafs.length);
    return solidColorLeafs.map((leaf: any, index: number) => ({
        ...leaf,
        color: getLighterColor(leaf.color, colorChange * index),
    }));
}

function getRootPoint(rootName: string, index: number, format: string, colorStrategy: IColorStrategy) {
    return {
        id: `${index}`,
        name: rootName,
        color: colorStrategy.getColorByIndex(index),
        showInLegend: true,
        legendIndex: index,
        format,
    };
}

function getLeafPoint(
    stackByAttribute: any,
    parentIndex: number,
    seriesIndex: number,
    data: any,
    format: string,
    colorStrategy: IColorStrategy,
) {
    return {
        name: stackByAttribute.items[seriesIndex].attributeHeaderItem.name,
        parent: `${parentIndex}`,
        value: parseValue(data),
        x: seriesIndex,
        y: seriesIndex,
        showInLegend: false,
        color: colorStrategy.getColorByIndex(parentIndex),
        format,
    };
}

function isLastSerie(seriesIndex: number, dataLength: number) {
    return seriesIndex === dataLength - 1;
}

export function getTreemapStackedSeriesDataWithViewBy(
    dv: DataViewFacade,
    measureGroup: IMeasureGroupDescriptor["measureGroupHeader"],
    viewByAttribute: IUnwrappedAttributeHeadersWithItems,
    stackByAttribute: IUnwrappedAttributeHeadersWithItems,
    colorStrategy: IColorStrategy,
): any[] {
    const roots: any = [];
    const leafs: any = [];
    let rootId = -1;
    let uncoloredLeafs: any = [];
    let lastRoot: IResultAttributeHeader["attributeHeaderItem"] = null;

    const executionResultData = dv.rawData().twoDimData();
    const dataLength = executionResultData.length;
    const format = unwrap(measureGroup.items[0]).format; // this configuration has only one measure

    executionResultData.forEach((seriesItems: string[], seriesIndex: number) => {
        const currentRoot = viewByAttribute.items[seriesIndex].attributeHeaderItem;

        if (!isEqual(currentRoot, lastRoot)) {
            // store previous group leafs
            leafs.push(...gradientPreviousGroup(uncoloredLeafs));
            rootId++;
            lastRoot = currentRoot;
            uncoloredLeafs = [];
            // create parent for pasted leafs
            const lastRootName = lastRoot?.name;
            roots.push(getRootPoint(lastRootName, rootId, format, colorStrategy));
        }
        // create leafs which will be colored at the end of group
        uncoloredLeafs.push(
            getLeafPoint(stackByAttribute, rootId, seriesIndex, seriesItems[0], format, colorStrategy),
        );

        if (isLastSerie(seriesIndex, dataLength)) {
            // store last group leafs
            leafs.push(...gradientPreviousGroup(uncoloredLeafs));
        }
    });

    return [...roots, ...leafs]; // roots need to be first items in data to keep legend working
}

export function getTreemapStackedSeriesDataWithMeasures(
    dv: DataViewFacade,
    measureGroup: IMeasureGroupDescriptor["measureGroupHeader"],
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute: any,
    colorStrategy: IColorStrategy,
): any[] {
    let data = measureGroup.items.map((measureGroupItem, index): IPointData => {
        return {
            id: `${index}`,
            name: measureGroupItem.measureHeaderItem.name,
            format: measureGroupItem.measureHeaderItem.format,
            color: colorStrategy.getColorByIndex(index),
            showInLegend: true,
            legendIndex: index,
        };
    });

    dv.rawData()
        .twoDimData()
        .forEach((seriesItems: string[], seriesIndex: number) => {
            const colorChange = getColorStep(seriesItems.length);

            const unsortedLeafs = seriesItems.map((seriesItem, seriesItemIndex): IPointData => {
                return {
                    name: stackByAttribute.items[seriesItemIndex].attributeHeaderItem.name,
                    parent: `${seriesIndex}`,
                    format: unwrap(measureGroup.items[seriesIndex]).format,
                    value: parseValue(seriesItem),
                    x: seriesIndex,
                    y: seriesItemIndex,
                    showInLegend: false,
                };
            });

            const sortedLeafs = unsortedLeafs.sort((a: IPointData, b: IPointData) => b.value - a.value);

            data = [
                ...data,
                ...sortedLeafs.map((leaf: IPointData, seriesItemIndex: number) => ({
                    ...leaf,
                    color: getLighterColor(
                        colorStrategy.getColorByIndex(seriesIndex),
                        colorChange * seriesItemIndex,
                    ),
                })),
            ];
        });

    return data;
}

export function getTreemapStackedSeries(
    dv: DataViewFacade,
    measureGroup: IMeasureGroupDescriptor["measureGroupHeader"],
    viewByAttribute: IUnwrappedAttributeHeadersWithItems,
    stackByAttribute: IUnwrappedAttributeHeadersWithItems,
    colorStrategy: IColorStrategy,
) {
    let data = [];
    if (viewByAttribute) {
        data = getTreemapStackedSeriesDataWithViewBy(
            dv,
            measureGroup,
            viewByAttribute,
            stackByAttribute,
            colorStrategy,
        );
    } else {
        data = getTreemapStackedSeriesDataWithMeasures(dv, measureGroup, stackByAttribute, colorStrategy);
    }

    const seriesName = measureGroup.items
        .map((wrappedMeasure: IMeasureDescriptor) => {
            return unwrap(wrappedMeasure).name;
        })
        .join(", ");

    return [
        {
            name: seriesName,
            legendType: "point",
            showInLegend: true,
            data,
            turboThreshold: 0,
            seriesIndex: 0,
        },
    ];
}
