// (C) 2019-2022 GoodData Corporation

import { IAttributeElement, IAttributeFilter, Identifier, ObjRef } from "@gooddata/sdk-model";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { AttributeFiltersOrPlaceholders, ILocale, IPlaceholder, GoodDataSdkError } from "@gooddata/sdk-ui";
import {
    IAttributeFilterErrorProps,
    IAttributeFilterDropdownButtonProps,
    IAttributeFilterDropdownBodyProps,
    IAttributeFilterDropdownActionsProps,
    IAttributeFilterElementsSearchBarProps,
    IAttributeFilterElementsSelectProps,
    IAttributeFilterElementsSelectItemProps,
    IAttributeFilterElementsSelectErrorProps,
    IAttributeFilterElementsSelectLoadingProps,
    IAttributeFilterEmptyResultProps,
    IAttributeFilterStatusBarProps,
} from "./Components/types";

/**
 * @alpha
 */
export type OnApplyCallbackType = (filter: IAttributeFilter, isInverted: boolean) => void;

/**
 * @alpha
 */
export type ParentFilterOverAttributeType =
    | ObjRef
    | ((parentFilter: IAttributeFilter, index: number) => ObjRef);

/**
 * @alpha
 */
export interface IAttributeFilterBaseProps
    extends IAttributeFilterCoreProps,
        IAttributeFilterCustomComponentProps {}

/**
 * @alpha
 */
export interface IAttributeFilterCoreProps {
    /**
     * Specify an instance of analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;

    /**
     * Specify workspace to work with.
     *
     * @remarks
     * Note: if you do not have a WorkspaceProvider above in the component tree, then you MUST specify the workspace.
     */
    workspace?: string;

    /**
     * Specify an attribute filter that will be customized using this filter.
     *
     * @remarks
     * The component will use content of the filter and select the items that are already specified on the filter.
     *
     * Note: It's not possible to combine this property with "connectToPlaceholder" property. Either - provide a value, or a placeholder.
     * The 'onApply' callback must be specified in order to handle filter changes.
     */
    filter?: IAttributeFilter;

    /**
     * Specifies a parent attribute filter that will be used to reduce options for for current attribute filter.
     *
     * @remarks
     * Parent filters elements must contain their URIs due to current backend limitations.
     */
    parentFilters?: AttributeFiltersOrPlaceholders;

    /**
     * Specify {@link @gooddata/sdk-ui#IPlaceholder} to use to get and set the value of the attribute filter.
     *
     * @remarks
     * Note: It's not possible to combine this property with "filter" property. Either - provide a value, or a placeholder.
     * There is no need to specify 'onApply' callback if 'connectToPlaceholder' property is used as the value of the filter
     * is set via this placeholder.
     */
    connectToPlaceholder?: IPlaceholder<IAttributeFilter>;

    /**
     * Specify the over attribute - an attribute the filter and its parent filter are connected through.
     *
     * @remarks
     * You can either provide an {@link @gooddata/sdk-model#ObjRef} which will be used for all the parent filters,
     * or you can provide a pure function that will be called for each parent filter to determine the respective over attribute.
     */
    parentFilterOverAttribute?: ParentFilterOverAttributeType;

    /**
     * Specify identifier of attribute display form, for which you want to construct the filter.
     *
     * @remarks
     * Note: this is optional and deprecated. If you do not specify this, then you MUST specify the 'filter' prop or 'connectToPlaceholder' prop.
     *
     * @deprecated - use the filter prop instead
     */
    identifier?: Identifier;

    /**
     * Specify title for the attribute filter.
     *
     * @remarks
     * By default, the attribute name will be used.
     */
    title?: string;

    /**
     * Locale to use for localization of appearing texts.
     */
    locale?: ILocale;

    /**
     * If specified, these will be excluded from the elements available for selection and will also be removed from the resulting filter.
     * This effectively behaves as if those elements were not part of the underlying display form.
     *
     * @remarks
     * The meaning of the items is determined by the way the filter is specified: if the filter uses URIs,
     * then these are also interpreted as URIs, analogously with values.
     */
    hiddenElements?: string[];

    /**
     * If specified, these elements will replace the elements that would be loaded from the server.
     * Note that if using this, limiting measures and/or filters will not work: it is your responsibility to filter
     * the static elements yourself.
     */
    staticElements?: IAttributeElement[];

    /**
     * Customize, whether the filter should take the entire screen on mobile devices.
     */
    fullscreenOnMobile?: boolean;

    /**
     * Specify function which will be called when user clicks 'Apply' button.
     *
     * @remarks
     * The function will receive the current specification of the filter, as it was updated by the user.
     *
     * @param filter - new value of the filter.
     */
    onApply?: OnApplyCallbackType;

    /**
     * Callback that will be triggered when error is thrown.
     */
    onError?: (error: GoodDataSdkError) => void;
}

/**
 * @alpha
 */
export interface IAttributeFilterCustomComponentProps {
    /**
     * Customize attribute filter with a component to be rendered if initialization fails.
     */
    ErrorComponent?: React.ComponentType<IAttributeFilterErrorProps>;

    /**
     * Customize attribute filter with a component to be rendered if attribute filter is loading.
     */
    LoadingComponent?: React.ComponentType;

    /**
     * Customize attribute filter dropdown button component.
     */
    DropdownButtonComponent?: React.ComponentType<IAttributeFilterDropdownButtonProps>;

    /**
     * Customize attribute filter dropdown body component.
     */
    DropdownBodyComponent?: React.ComponentType<IAttributeFilterDropdownBodyProps>;

    /**
     * Customize attribute filter dropdown actions component.
     */
    DropdownActionsComponent?: React.ComponentType<IAttributeFilterDropdownActionsProps>;

    /**
     * Customize attribute filter search bar component.
     */
    ElementsSearchBarComponent?: React.ComponentType<IAttributeFilterElementsSearchBarProps>;

    /**
     * Customize attribute filter elements select component.
     */
    ElementsSelectComponent?: React.ComponentType<IAttributeFilterElementsSelectProps>;

    /**
     * Customize attribute filter elements select loading component.
     */
    ElementsSelectLoadingComponent?: React.ComponentType<IAttributeFilterElementsSelectLoadingProps>;

    /**
     * Customize attribute filter elements select item component.
     */
    ElementsSelectItemComponent?: React.ComponentType<IAttributeFilterElementsSelectItemProps>;

    /**
     * Customize attribute filter elements select error component.
     */
    ElementsSelectErrorComponent?: React.ComponentType<IAttributeFilterElementsSelectErrorProps>;

    /**
     * Customize attribute filter empty result component.
     */
    EmptyResultComponent?: React.ComponentType<IAttributeFilterEmptyResultProps>;

    /**
     * Customize attribute filter status bar component.
     */
    StatusBarComponent?: React.ComponentType<IAttributeFilterStatusBarProps>;

    // Deprecated
    /**
     * Customize attribute filter with a component to be rendered if initialization fails.
     *
     * @deprecated use {@link IAttributeFilterCustomComponentProps.ErrorComponent} instead
     */
    FilterError?: React.ComponentType<IAttributeFilterErrorProps>;

    /**
     * Customize attribute filter with a component to be rendered if attribute filter is loading.
     *
     * @deprecated use {@link IAttributeFilterCustomComponentProps.LoadingComponent} instead
     */
    FilterLoading?: React.ComponentType;
}
