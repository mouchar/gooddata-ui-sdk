// (C) 2021-2024 GoodData Corporation
export type {
    DashboardDispatch,
    DashboardState,
    DashboardSelector,
    DashboardSelectorEvaluator,
} from "./types.js";

export { selectDashboardLoading, selectIsDashboardLoading } from "./loading/loadingSelectors.js";
export type { LoadingState } from "./loading/loadingState.js";
export { selectDashboardSaving, selectIsDashboardSaving } from "./saving/savingSelectors.js";
export type { SavingState } from "./saving/savingState.js";
export type { BackendCapabilitiesState } from "./backendCapabilities/backendCapabilitiesState.js";
export {
    selectBackendCapabilities,
    selectSupportsElementsQueryParentFiltering,
    selectSupportsElementUris,
    selectSupportsKpiWidgetCapability,
    selectSupportsAccessControlCapability,
    selectSupportsHierarchicalWorkspacesCapability,
    selectSupportsObjectUris,
    selectSupportsSettingConnectingAttributes,
    selectSupportsKeepingDependentFiltersSelection,
    selectAllowMultipleInteractionsPerAttributeAndMeasure,
    selectSupportsAttributeHierarchies,
    selectSupportsSingleSelectDependentFilters,
    selectSupportsCrossFiltering,
    selectSupportsMultipleDateFilters,
    selectSupportsRichTextWidgets,
} from "./backendCapabilities/backendCapabilitiesSelectors.js";
export type { ConfigState } from "./config/configState.js";
export {
    selectConfig,
    selectLocale,
    selectSeparators,
    selectSettings,
    selectColorPalette,
    selectDateFilterConfig,
    selectObjectAvailabilityConfig,
    selectIsReadOnly,
    selectMapboxToken,
    selectDateFormat,
    selectEnableInsightExportScheduling,
    selectEnableKPIDashboardSchedule,
    selectEnableKPIDashboardScheduleRecipients,
    selectEnableCompanyLogoInEmbeddedUI,
    selectIsEmbedded,
    selectIsExport,
    selectPlatformEdition,
    selectDisableDefaultDrills,
    selectEnableFilterValuesResolutionInDrillEvents,
    selectEnableKPIDashboardExportPDF,
    selectEnableKPIDashboardDrillToDashboard,
    selectEnableKPIDashboardSaveAsNew,
    selectEnableClickableAttributeURL,
    selectEnableKPIDashboardDrillToInsight,
    selectEnableKPIDashboardDrillToURL,
    selectEnableKPIDashboardImplicitDrillDown,
    selectHideKpiDrillInEmbedded,
    selectEnableWidgetCustomHeight,
    selectEnableRenamingProjectToWorkspace,
    selectEnableRenamingMeasureToMetric,
    selectShouldHidePixelPerfectExperience,
    selectDisableKpiDashboardHeadlineUnderline,
    selectIsWhiteLabeled,
    selectEnableAnalyticalDashboardPermissions,
    selectIsSaveAsNewButtonHidden,
    selectAllowUnfinishedFeatures,
    selectAllowCreateInsightRequest,
    selectIsAnalyticalDesignerEnabled,
    selectIsDeleteFilterButtonEnabled,
    selectIsKPIDashboardDependentFiltersEnabled,
    selectIsAlternativeDisplayFormSelectionEnabled,
    selectEnableKPIDashboardDrillFromAttribute,
    selectIsShareButtonHidden,
    selectWeekStart,
    selectTimezone,
    selectIsDrillDownEnabled,
    selectEnableUnavailableItemsVisibility,
    selectEnableKDDependentFilters,
    selectIsKDDependentFiltersEnabled,
    selectEnableKDCrossFiltering,
    selectEnableMultipleDateFilters,
    selectEnableKDRichText,
    selectEnableAttributeFilterValuesValidation,
    selectEnableKDAttributeFilterDatesValidation,
    selectEnableDuplicatedLabelValuesInAttributeFilter,
    selectEnableRichTextDescriptions,
    selectIsDisabledCrossFiltering,
    selectIsDisableUserFilterReset,
    selectEnableScheduling,
    selectEnableFilterViews,
    selectEnableAlerting,
    selectEnableAlertAttributes,
    selectEnableVisualizationSwitcher,
    selectEnableIgnoreCrossFiltering,
    selectEnableAutomations,
    selectEnableCrossFilteringAliasTitles,
    selectEnableFlexibleLayout,
} from "./config/configSelectors.js";
export type { EntitlementsState } from "./entitlements/entitlementsState.js";
export {
    selectEntitlementExportPdf,
    selectEntitlementMaxAutomationRecipients,
    selectEntitlementMaxAutomations,
    selectEntitlementMinimumRecurrenceMinutes,
    selectEntitlementUnlimitedAutomations,
} from "./entitlements/entitlementsSelectors.js";

export type { PermissionsState } from "./permissions/permissionsState.js";
export {
    selectPermissions,
    selectCanListUsersInWorkspace,
    selectCanManageWorkspace,
    selectCanExportReport,
    selectCanExportTabular,
    selectCanExportPdf,
    selectCanCreateAnalyticalDashboard,
    selectCanManageACL,
    selectCanManageAnalyticalDashboard,
    selectCanCreateScheduledMail,
    selectCanInitData,
    selectCanUploadNonProductionCSV,
    selectCanExecuteRaw,
    selectCanCreateVisualization,
    selectCanManageMetric,
    selectCanManageDomain,
    selectCanInviteUserToWorkspace,
    selectCanRefreshData,
    selectCanManageScheduledMail,
    selectCanManageAttributeHierarchy,
    selectCanCreateFilterView,
    selectCanCreateAutomation,
} from "./permissions/permissionsSelectors.js";
export type { DashboardPermissionsState } from "./dashboardPermissions/dashboardPermissionsState.js";
export {
    selectCanViewDashboardPermission,
    selectCanShareDashboardPermission,
    selectCanShareLockedDashboardPermission,
    selectCanEditDashboardPermission,
    selectCanEditLockedDashboardPermission,
    selectDashboardPermissions,
} from "./dashboardPermissions/dashboardPermissionsSelectors.js";
export type { FilterContextState } from "./filterContext/filterContextState.js";
export {
    selectFilterContextDefinition,
    selectFilterContextIdentity,
    selectFilterContextFilters,
    selectFilterContextDateFilter,
    selectFilterContextDateFiltersWithDimension,
    selectFilterContextAttributeFilters,
    selectOtherContextAttributeFilters,
    selectAttributeFilterDisplayFormsMap,
    selectAttributeFilterDisplayForms,
    selectFilterContextAttributeFilterByLocalId,
    selectFilterContextAttributeFilterByDisplayForm,
    selectOriginalFilterContextDefinition,
    selectOriginalFilterContextFilters,
    selectAttributeFilterDescendants,
    selectAttributeFilterDisplayFormByLocalId,
    selectIsCircularDependency,
    selectCanAddMoreAttributeFilters,
    selectCanAddMoreFilters,
    selectIsAttributeFilterDependentByLocalIdentifier,
    selectFilterContextDateFilterByDataSet,
} from "./filterContext/filterContextSelectors.js";
export type { IImplicitDrillWithPredicates } from "./widgetDrills/widgetDrillSelectors.js";
export {
    selectImplicitDrillsDownByWidgetRef,
    selectConfiguredDrillsByWidgetRef,
    selectDrillableItemsByWidgetRef,
    selectConfiguredAndImplicitDrillsByWidgetRef,
    selectValidConfiguredDrillsByWidgetRef,
    selectImplicitDrillsByAvailableDrillTargets,
    selectDrillableItemsByAvailableDrillTargets,
    selectImplicitDrillsToUrlByWidgetRef,
    selectGlobalDrillsDownAttributeHierarchyByWidgetRef,
} from "./widgetDrills/widgetDrillSelectors.js";
export { selectLegacyDashboards } from "./legacyDashboards/legacyDashboardsSelectors.js";

export type { UndoEnhancedState, UndoEntry } from "./_infra/undoEnhancer.js";
export type { LayoutState, LayoutStash } from "./layout/layoutState.js";
export {
    selectLayout,
    selectStash,
    selectWidgetByRef,
    selectAnalyticalWidgetByRef,
    selectWidgets,
    selectWidgetsMap,
    selectAllInsightWidgets,
    selectAllCustomWidgets,
    selectAllKpiWidgets,
    selectAllAnalyticalWidgets,
    selectIsLayoutEmpty,
    selectLayoutHasAnalyticalWidgets,
    selectWidgetDrills,
    selectWidgetCoordinatesByRef,
    selectWidgetPlaceholder,
    selectWidgetPlaceholderCoordinates,
    selectInsightWidgetPlaceholder,
    selectInsightWidgetPlaceholderCoordinates,
    selectKpiWidgetPlaceholder,
    selectKpiWidgetPlaceholderCoordinates,
    selectIgnoredDrillDownHierarchiesByWidgetRef,
} from "./layout/layoutSelectors.js";
export type { DateFilterConfigState } from "./dateFilterConfig/dateFilterConfigState.js";
export {
    selectDateFilterConfigOverrides,
    selectEffectiveDateFilterConfig,
    selectEffectiveDateFilterTitle,
    selectEffectiveDateFilterMode,
    selectEffectiveDateFilterOptions,
    selectEffectiveDateFilterAvailableGranularities,
    selectDateFilterConfigValidationWarnings,
} from "./dateFilterConfig/dateFilterConfigSelectors.js";
export type { AttributeFilterConfigsState } from "./attributeFilterConfigs/attributeFilterConfigsState.js";
export {
    selectAttributeFilterConfigsOverrides,
    selectAttributeFilterConfigsModeMap,
    selectEffectiveAttributeFiltersModeMap,
    selectAttributeFilterConfigsDisplayAsLabelMap,
} from "./attributeFilterConfigs/attributeFilterConfigsSelectors.js";
export type { DateFilterConfigsState } from "./dateFilterConfigs/dateFilterConfigsState.js";
export {
    selectDateFilterConfigsOverrides,
    selectDateFilterConfigsModeMap,
    selectEffectiveDateFiltersModeMap,
} from "./dateFilterConfigs/dateFilterConfigsSelectors.js";
export {
    selectInsights,
    selectInsightRefs,
    selectInsightsMap,
    selectInsightByRef,
    selectInsightByWidgetRef,
} from "./insights/insightsSelectors.js";
export type { CatalogState } from "./catalog/catalogState.js";
export {
    selectAttributesWithDrillDown,
    selectCatalogAttributes,
    selectCatalogAttributeDisplayForms,
    selectCatalogDateDatasets,
    selectCatalogFacts,
    selectCatalogMeasures,
    selectAllCatalogAttributesMap,
    selectAllCatalogDisplayFormsMap,
    selectAllCatalogDateDatasetsMap,
    selectAllCatalogMeasuresMap,
    selectHasCatalogAttributes,
    selectHasCatalogMeasures,
    selectHasCatalogDateDatasets,
    selectHasCatalogFacts,
    selectCatalogAttributeHierarchies,
    selectCatalogDateAttributes,
    selectDateHierarchyTemplates,
    selectAdhocDateHierarchies,
    selectAllCatalogAttributeHierarchies,
    selectCatalogAttributeDisplayFormsById,
} from "./catalog/catalogSelectors.js";
export { catalogActions } from "./catalog/index.js";
export { drillActions } from "./drill/index.js";
export {
    selectDrillableItems,
    selectIsCrossFiltering,
    selectCrossFilteringItems,
    selectCrossFilteringItemByWidgetRef,
    selectCrossFilteringFiltersLocalIdentifiers,
    selectCrossFilteringFiltersLocalIdentifiersByWidgetRef,
    selectCrossFilteringSelectedPointsByWidgetRef,
    selectIsFilterFromCrossFilteringByLocalIdentifier,
} from "./drill/drillSelectors.js";
export type { DrillState } from "./drill/drillState.js";
export type { ICrossFilteringItem } from "./drill/types.js";
export type { AlertsState } from "./alerts/alertsState.js";
export {
    selectAlerts,
    selectAlertByWidgetRef,
    selectAlertsMap,
    selectAlertByRef,
} from "./alerts/alertsSelectors.js";
export type { UserState } from "./user/userState.js";
export { selectCurrentUser, selectCurrentUserRef } from "./user/userSelectors.js";
export type { DashboardMetaState, DashboardDescriptor } from "./meta/metaState.js";
export {
    selectDashboardRef,
    selectDashboardUriRef,
    selectDashboardTitle,
    selectDashboardDescription,
    selectDashboardIdRef,
    selectDashboardTags,
    selectDashboardUri,
    selectDashboardId,
    selectDashboardShareStatus,
    selectDashboardShareInfo,
    selectPersistedDashboard,
    selectDashboardLockStatus,
    selectIsNewDashboard,
    selectIsDashboardDirty,
    selectIsDashboardPrivate,
    selectDashboardWorkingDefinition,
    selectDisableDashboardCrossFiltering,
    selectDisableDashboardUserFilterReset,
    selectDisableDashboardUserFilterSave,
    selectDisableFilterViews,
} from "./meta/metaSelectors.js";
export {
    selectListedDashboards,
    selectListedDashboardsMap,
} from "./listedDashboards/listedDashboardsSelectors.js";
export {
    selectAccessibleDashboards,
    selectAccessibleDashboardsMap,
} from "./accessibleDashboards/accessibleDashboardsSelectors.js";
export {
    selectInaccessibleDashboards,
    selectInaccessibleDashboardsMap,
} from "./inaccessibleDashboards/inaccessibleDashboardsSelectors.js";
export { selectDrillTargetsByWidgetRef, selectDrillTargets } from "./drillTargets/drillTargetsSelectors.js";
export type { IDrillTargets } from "./drillTargets/drillTargetsTypes.js";
export {
    selectExecutionResult,
    selectExecutionResultByRef,
    selectIsExecutionResultExportableToCsvByRef,
    selectIsExecutionResultExportableToXlsxByRef,
    selectIsExecutionResultReadyForExportByRef,
} from "./executionResults/executionResultsSelectors.js";
export type { IExecutionResultEnvelope } from "./executionResults/types.js";
export type { UiState, InvalidCustomUrlDrillParameterInfo, FilterViewDialogMode } from "./ui/uiState.js";
export {
    selectIsScheduleEmailDialogOpen,
    selectIsScheduleEmailManagementDialogOpen,
    selectIsScheduleEmailDialogContext,
    selectIsScheduleEmailManagementDialogContext,
    selectIsSaveAsDialogOpen,
    selectIsShareDialogOpen,
    selectFilterBarExpanded,
    selectIsKpiAlertOpenedByWidgetRef,
    selectIsKpiAlertHighlightedByWidgetRef,
    selectMenuButtonItemsVisibility,
    selectScheduleEmailDialogDefaultAttachment,
    selectSelectedWidgetRef,
    selectConfigurationPanelOpened,
    selectWidgetDateDatasetAutoSelect,
    selectIsDeleteDialogOpen,
    selectIsKpiDeleteDialogOpen,
    selectKpiDeleteDialogWidgetCoordinates,
    selectInsightListLastUpdateRequested,
    selectIsWidgetLoadingAdditionalDataByWidgetRef,
    selectIsFilterAttributeSelectionOpen,
    selectSelectedFilterIndex,
    selectIsDraggingWidget,
    selectActiveSectionIndex,
    selectIsCancelEditModeDialogOpen,
    selectDraggingWidgetSource,
    selectDraggingWidgetTarget,
    selectWidgetsOverlay,
    selectWidgetsOverlayState,
    selectWidgetsModification,
    selectSectionModification,
    selectIsSectionInsertedByPlugin,
    selectInvalidDrillWidgetRefs,
    selectInvalidUrlDrillParameterDrillLocalIdsByWidgetRef,
    selectInvalidUrlDrillParameterWidgetRefs,
    selectInvalidUrlDrillParameterWidgetWarnings,
    selectFilterViewsDialogMode,
    selectIsFilterViewsDialogOpen,
    selectIsAlertingDialogOpen,
    selectIsAlertsManagementDialogOpen,
    selectIsWidgetDeleteDialogOpen,
    selectWidgetDeleteDialogWidgetRef,
} from "./ui/uiSelectors.js";
export { uiActions } from "./ui/index.js";
export type { RenderModeState } from "./renderMode/renderModeState.js";
export {
    selectIsInEditMode,
    selectIsInViewMode,
    selectRenderMode,
} from "./renderMode/renderModeSelectors.js";
export { renderModeActions } from "./renderMode/index.js";
export type { LegacyDashboardsState } from "./legacyDashboards/legacyDashboardsState.js";

export { queryAndWaitFor } from "./_infra/queryAndWaitFor.js";
export { dispatchAndWaitFor } from "./_infra/dispatchAndWaitFor.js";
export type {
    IDashboardQueryService,
    QueryCache,
    QueryActions,
    QueryCacheEntry,
    QueryCacheEntryResult,
    AllQueryCacheReducers,
    QueryCacheReducer,
} from "./_infra/queryService.js";
export {
    DashboardStoreAccessor,
    DashboardStoreAccessorRepository,
    SingleDashboardStoreAccessor,
} from "./storeAccessors/index.js";
export {
    selectNotificationChannels,
    selectNotificationChannelsCount,
} from "./notificationChannels/notificationChannelsSelectors.js";
export type { NotificationChannelsState } from "./notificationChannels/notificationChannelsState.js";
export type { AutomationsState } from "./automations/automationsState.js";
export {
    selectAutomationsIsInitialized,
    selectAllAutomationsCount,
    selectDashboardUserAutomations,
    selectDashboardUserAutomationAlerts,
    selectDashboardUserAutomationSchedules,
    selectDashboardUserAutomationAlertsInContext,
    selectDashboardUserAutomationSchedulesInContext,
    selectAutomationsIsLoading,
    selectAutomationsError,
} from "./automations/automationsSelectors.js";

export type { UsersState } from "./users/usersState.js";
export { selectUsers } from "./users/usersSelectors.js";

export type { IFilterViews, FilterViewsState } from "./filterViews/index.js";
export { selectFilterViews, selectFilterViewsAreLoading } from "./filterViews/index.js";

export type { ExecutedState } from "./executed/executedState.js";
export { selectIsDashboardExecuted } from "./executed/executedSelectors.js";
