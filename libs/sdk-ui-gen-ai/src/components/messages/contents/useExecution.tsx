// (C) 2024 GoodData Corporation

import React from "react";
import {
    idRef,
    MeasureAggregation,
    newAttribute,
    newMeasure,
    IGenAIVisualization,
    GenAIFilter,
    newPositiveAttributeFilter,
    newNegativeAttributeFilter,
    newRelativeDateFilter,
    newAbsoluteDateFilter,
    DateAttributeGranularity,
    IFilter,
    GenAIPositiveAttributeFilter,
    GenAINegativeAttributeFilter,
    GenAIRelativeDateFilter,
    GenAIDateGranularity,
    GenAIAbsoluteDateFilter,
} from "@gooddata/sdk-model";

export const useExecution = (vis?: IGenAIVisualization) => {
    return React.useMemo(() => {
        const dimensions = vis?.dimensionality?.map((d) => newAttribute(d.id)) ?? [];
        const metrics =
            vis?.metrics?.map((md) => {
                switch (md.type) {
                    case "fact":
                        return newMeasure(idRef(md.id, "fact"), (m) => {
                            if (md.aggFunction) {
                                m = m.aggregation(md.aggFunction.toLowerCase() as MeasureAggregation);
                            }

                            if (md.title) {
                                m = m.title(md.title);
                            }

                            return m;
                        });
                    case "metric":
                        return newMeasure(idRef(md.id, "measure"), (m) => {
                            if (md.title) {
                                m = m.title(md.title);
                            }

                            return m;
                        });
                    case "attribute":
                        return newMeasure(idRef(md.id, "attribute"), (m) => {
                            if (md.title) {
                                m = m.title(md.title);
                            }

                            return m.aggregation("count");
                        });
                }
            }) ?? [];

        return {
            metrics,
            dimensions,
            filters: (vis?.filters?.map(convertFilter).filter(Boolean) as IFilter[]) ?? [],
        };
    }, [vis]);
};

const convertFilter = (data: GenAIFilter): IFilter | false => {
    if (isPositiveAttributeFilter(data)) {
        return newPositiveAttributeFilter(data.using, { values: data.include });
    }

    if (isNegativeAttributeFilter(data)) {
        return newNegativeAttributeFilter(data.using, { values: data.exclude });
    }

    if (isRelativeDateFilter(data)) {
        return newRelativeDateFilter(data.using, granularityMap[data.granularity], data.from, data.to);
    }

    if (isAbsoluteDateFilter(data)) {
        return newAbsoluteDateFilter(
            data.using,
            data.from ??
                (() => {
                    const date = new Date();
                    date.setUTCHours(0, 0, 0, 0);
                    return date.toISOString();
                })(),
            data.to ?? new Date().toISOString(),
        );
    }

    return false;
};

const isPositiveAttributeFilter = (obj: unknown): obj is GenAIPositiveAttributeFilter => {
    return typeof obj === "object" && obj !== null && "using" in obj && "include" in obj;
};

const isNegativeAttributeFilter = (obj: unknown): obj is GenAINegativeAttributeFilter => {
    return typeof obj === "object" && obj !== null && "using" in obj && "exclude" in obj;
};

const isRelativeDateFilter = (obj: unknown): obj is GenAIRelativeDateFilter => {
    return typeof obj === "object" && obj !== null && "using" in obj && "granularity" in obj;
};

const isAbsoluteDateFilter = (obj: unknown): obj is GenAIAbsoluteDateFilter => {
    return typeof obj === "object" && obj !== null && "using" in obj && ("from" in obj || "to" in obj);
};

const granularityMap: { [key in GenAIDateGranularity]: DateAttributeGranularity } = {
    MINUTE: "GDC.time.minute",
    HOUR: "GDC.time.hour",
    DAY: "GDC.time.date",
    WEEK: "GDC.time.week",
    MONTH: "GDC.time.month",
    QUARTER: "GDC.time.quarter",
    YEAR: "GDC.time.year",
    MINUTE_OF_HOUR: "GDC.time.minute_in_hour",
    HOUR_OF_DAY: "GDC.time.hour_in_day",
    DAY_OF_WEEK: "GDC.time.day_in_week",
    DAY_OF_MONTH: "GDC.time.day_in_month",
    DAY_OF_YEAR: "GDC.time.day_in_year",
    WEEK_OF_YEAR: "GDC.time.week_in_year",
    MONTH_OF_YEAR: "GDC.time.month_in_year",
    QUARTER_OF_YEAR: "GDC.time.quarter_in_year",
};
