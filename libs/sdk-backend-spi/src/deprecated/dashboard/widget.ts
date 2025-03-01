// (C) 2020-2022 GoodData Corporation
/* eslint-disable @typescript-eslint/no-empty-interface, import/namespace */
import * as m from "@gooddata/sdk-model";

/**
 * See {@link IWidget}]
 * @deprecated Use {@link @gooddata/sdk-model#IWidgetDefinition}
 * @alpha
 */
export type IWidgetDefinition = m.IWidgetDefinition;

/**
 * @deprecated Use {@link @gooddata/sdk-model#IWidget}
 * @alpha
 */
export type IWidget = m.IWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetDefinition}.
 * @deprecated Use {@link @gooddata/sdk-model#isWidgetDefinition}
 * @alpha
 */
export const isWidgetDefinition = m.isWidgetDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IWidget}.
 * @deprecated Use {@link @gooddata/sdk-model#isWidget}
 * @alpha
 */
export const isWidget = m.isWidget;

/**
 * Gets the widget identifier
 *
 * @param widget - widget to get identifier of
 * @returns the widget identifier
 * @deprecated Use {@link @gooddata/sdk-model#widgetId}
 * @alpha
 */
export const widgetId = m.widgetId;

/**
 * Gets the widget uri
 *
 * @param widget - widget to get uri of
 * @returns the widget uri
 * @deprecated Use {@link @gooddata/sdk-model#widgetUri}
 * @alpha
 */
export const widgetUri = m.widgetUri;

/**
 * Gets the widget ref
 *
 * @param widget - widget to get ref of
 * @returns the widget ref
 * @deprecated Use {@link @gooddata/sdk-model#widgetRef}
 * @alpha
 */
export const widgetRef = m.widgetRef;

/**
 * Gets the widget type
 *
 * @param widget - widget to get type of
 * @returns the widget type
 * @deprecated Use {@link @gooddata/sdk-model#widgetType}
 * @alpha
 */
export const widgetType = m.widgetType;

/**
 * Gets the widget title
 *
 * @param widget - widget to get title of
 * @returns the widget title
 * @deprecated Use {@link @gooddata/sdk-model#widgetTitle}
 * @alpha
 */
export const widgetTitle = m.widgetTitle;

/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidget}.
 * @deprecated Use {@link @gooddata/sdk-model#isInsightWidget}
 * @alpha
 */
export const isInsightWidget = m.isInsightWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidgetDefinition}.
 * @deprecated Use {@link @gooddata/sdk-model#isInsightWidgetDefinition}
 * @alpha
 */
export const isInsightWidgetDefinition = m.isInsightWidgetDefinition;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @deprecated Use {@link @gooddata/sdk-model#isKpiWidget}
 * @alpha
 */
export const isKpiWidget = m.isKpiWidget;

/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @deprecated Use {@link @gooddata/sdk-model#isKpiWidgetDefinition}
 * @alpha
 */
export const isKpiWidgetDefinition = m.isKpiWidgetDefinition;
