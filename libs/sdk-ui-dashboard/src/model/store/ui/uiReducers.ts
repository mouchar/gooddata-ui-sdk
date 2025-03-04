// (C) 2021-2022 GoodData Corporation
import { Action, AnyAction, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { areObjRefsEqual, ObjRef } from "@gooddata/sdk-model";
import { UiState } from "./uiState";
import { ILayoutCoordinates, IMenuButtonItemsVisibility } from "../../../types";

type UiReducer<A extends Action = AnyAction> = CaseReducer<UiState, A>;

const openScheduleEmailDialog: UiReducer = (state) => {
    state.scheduleEmailDialog.open = true;
};

const closeScheduleEmailDialog: UiReducer = (state) => {
    state.scheduleEmailDialog.open = false;
};

const setScheduleEmailDialogDefaultAttachment: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.scheduleEmailDialog.defaultAttachmentRef = action.payload;
};

const resetScheduleEmailDialogDefaultAttachment: UiReducer = (state) => {
    state.scheduleEmailDialog.defaultAttachmentRef = undefined;
};

const openScheduleEmailManagementDialog: UiReducer = (state) => {
    state.scheduleEmailManagementDialog.open = true;
};

const closeScheduleEmailManagementDialog: UiReducer = (state) => {
    state.scheduleEmailManagementDialog.open = false;
};

const openSaveAsDialog: UiReducer = (state) => {
    state.saveAsDialog.open = true;
};

const closeSaveAsDialog: UiReducer = (state) => {
    state.saveAsDialog.open = false;
};

const openShareDialog: UiReducer = (state) => {
    state.shareDialog.open = true;
};

const closeShareDialog: UiReducer = (state) => {
    state.shareDialog.open = false;
};

const openDeleteDialog: UiReducer = (state) => {
    state.deleteDialog.open = true;
};

const closeDeleteDialog: UiReducer = (state) => {
    state.deleteDialog.open = false;
};

const openKpiDeleteDialog: UiReducer<PayloadAction<ILayoutCoordinates>> = (state, action) => {
    state.kpiDeleteDialog.widgetCoordinates = action.payload;
};

const closeKpiDeleteDialog: UiReducer = (state) => {
    state.kpiDeleteDialog.widgetCoordinates = undefined;
};

const setFilterBarExpanded: UiReducer<PayloadAction<boolean>> = (state, action) => {
    state.filterBar.expanded = action.payload;
};

const openKpiAlertDialog: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.kpiAlerts.openedWidgetRef = action.payload;
};

const closeKpiAlertDialog: UiReducer = (state) => {
    state.kpiAlerts.openedWidgetRef = undefined;
};

const highlightKpiAlert: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.kpiAlerts.highlightedWidgetRef = action.payload;
};

const setMenuButtonItemsVisibility: UiReducer<PayloadAction<IMenuButtonItemsVisibility>> = (
    state,
    action,
) => {
    state.menuButton.itemsVisibility = action.payload;
};

const selectWidget: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.selectedWidgetRef = action.payload;
};

const clearWidgetSelection: UiReducer = (state) => {
    state.selectedWidgetRef = undefined;
};

const setConfigurationPanelOpened: UiReducer<PayloadAction<boolean>> = (state, action) => {
    state.configurationPanelOpened = action.payload;
};

const setKpiDateDatasetAutoOpen: UiReducer<PayloadAction<boolean>> = (state, action) => {
    state.kpiDateDatasetAutoOpen = action.payload;
};

const requestInsightListUpdate: UiReducer = (state) => {
    state.insightListLastUpdateRequested = +new Date();
};

const setWidgetLoadingAdditionalDataStarted: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.widgetsLoadingAdditionalData.push(action.payload);
};

const setWidgetLoadingAdditionalDataStopped: UiReducer<PayloadAction<ObjRef>> = (state, action) => {
    state.widgetsLoadingAdditionalData = state.widgetsLoadingAdditionalData.filter(
        (item) => !areObjRefsEqual(item, action.payload),
    );
};

const setFilterAttributeSelectionOpen: UiReducer<PayloadAction<boolean>> = (state, action) => {
    state.filterAttributeSelectionOpen = action.payload;
};

const selectFilterIndex: UiReducer<PayloadAction<number>> = (state, action) => {
    state.selectedFilterIndex = action.payload;
};

const clearFilterIndexSelection: UiReducer = (state) => {
    state.selectedFilterIndex = undefined;
};

const setIsDraggingWidget: UiReducer<PayloadAction<boolean>> = (state, action) => {
    state.isDraggingWidget = action.payload;
};

const setActiveSectionIndex: UiReducer<PayloadAction<number>> = (state, action) => {
    state.activeSectionIndex = action.payload;
};

const clearActiveSectionIndex: UiReducer = (state) => {
    state.activeSectionIndex = undefined;
};

export const uiReducers = {
    openScheduleEmailDialog,
    closeScheduleEmailDialog,
    setScheduleEmailDialogDefaultAttachment,
    resetScheduleEmailDialogDefaultAttachment,
    openScheduleEmailManagementDialog,
    closeScheduleEmailManagementDialog,
    openSaveAsDialog,
    closeSaveAsDialog,
    setFilterBarExpanded,
    closeKpiAlertDialog,
    openKpiAlertDialog,
    highlightKpiAlert,
    openShareDialog,
    closeShareDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openKpiDeleteDialog,
    closeKpiDeleteDialog,
    setMenuButtonItemsVisibility,
    selectWidget,
    clearWidgetSelection,
    setConfigurationPanelOpened,
    setKpiDateDatasetAutoOpen,
    requestInsightListUpdate,
    setWidgetLoadingAdditionalDataStarted,
    setWidgetLoadingAdditionalDataStopped,
    setFilterAttributeSelectionOpen,
    selectFilterIndex,
    clearFilterIndexSelection,
    setIsDraggingWidget,
    setActiveSectionIndex,
    clearActiveSectionIndex,
};
