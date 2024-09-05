// (C) 2019-2024 GoodData Corporation
import { MessageDescriptor, defineMessages } from "react-intl";

export const messages: Record<string, MessageDescriptor> = defineMessages({
    messagesDashboardSaveSuccess: { id: "messages.dashboardSaveSuccess" },
    messagesDashboardSaveFailed: { id: "messages.dashboardSaveFailed" },
    messagesExportResultStart: { id: "messages.exportResultStart" },
    messagesExportResultSuccess: { id: "messages.exportResultSuccess" },
    messagesExportResultRestrictedError: { id: "messages.exportResultRestrictedError" },
    messagesExportResultError: { id: "messages.exportResultError" },
    messagesSharingChangedSuccess: { id: "messages.sharingChangedSuccess" },
    messagesSharingChangedError: { id: "messages.sharingChangedError.general" },
    messagesSharingDialogError: { id: "messages.sharingDialogError.general" },
    scheduleEmailSubmitError: { id: "dialogs.schedule.email.submit.error" },
    scheduleEmailSubmitSuccess: { id: "dialogs.schedule.email.submit.success" },
    scheduleEmailSaveError: { id: "dialogs.schedule.email.save.error" },
    scheduleEmailSaveSuccess: { id: "dialogs.schedule.email.save.success" },
    scheduleEmailDeleteSuccess: { id: "dialogs.schedule.email.delete.success" },
    scheduleManagementLoadError: { id: "dialogs.schedule.management.load.error" },
    scheduleManagementDeleteError: { id: "dialogs.schedule.management.delete.error" },
    scheduleManagementNoSchedules: { id: "dialogs.schedule.management.noSchedules" },
    scheduleManagementCreate: { id: "dialogs.schedule.management.create" },
    scheduleManagementCreateTooMany: { id: "dialogs.schedule.management.create.tooManyMessage" },
    scheduleManagementListTitle: { id: "dialogs.schedule.management.list.title" },

    alertingManagementLoadError: { id: "dialogs.alerting.management.load.error" },
    alertingManagementDeleteError: { id: "dialogs.alerting.management.delete.error" },
    alertingManagementPauseError: { id: "dialogs.alerting.management.pause.error" },
    alertingManagementActivateError: { id: "dialogs.alerting.management.activate.error" },
    alertingManagementPauseSuccess: { id: "dialogs.alerting.management.pause.success" },
    alertingManagementActivateSuccess: { id: "dialogs.alerting.management.activate.success" },
    alertingManagementListTitle: { id: "dialogs.alerting.management.list.title" },
    alertingManagementNoAlerts: { id: "dialogs.alerting.management.noAlerts" },
    alertingDeleteSuccess: { id: "dialogs.alerting.delete.success" },

    saveAsNewAlertsAndEmailsMessage: { id: "dialogs.save.as.new.alertsAndEmailsMessage" },
    saveAsNewAlertsMessage: { id: "dialogs.save.as.new.alertsMessage" },
    saveAsNewEmailsMessage: { id: "dialogs.save.as.new.emailsMessage" },
    alertMessageRelativePresetInPeriod: { id: "filters.alertMessage.relativePreset.inPeriod" },
    alertMessageRelativePreset: { id: "filters.alertMessage.relativePreset" },
    tabsMy: { id: "gs.visualizationsList.tabs.my" },
    tabsAll: { id: "gs.visualizationsList.tabs.all" },
    controlButtonsSaveValue: { id: "controlButtons.save.value" },
    controlButtonsSaveAndPublishValue: { id: "controlButtons.saveAndPublish.value" },
    controlButtonsSaveAndPublishTitle: { id: "controlButtons.saveAndPublish.title" },
    controlButtonsSaveAsPrivateTitle: { id: "controlButtons.saveAsPrivate.title" },
    controlButtonsSaveAndPublishNoChanges: { id: "controlButtons.saveAndPublish.disable.noChanges.title" },
    controlButtonsSaveAndPublishEmpty: { id: "controlButtons.saveAndPublish.disable.empty.title" },

    filterHiddenTooltip: { id: "filter.visibilityMode.tooltip.hidden" },
    filterReadonlyInEditModeTooltip: { id: "filter.visibilityMode.tooltip.readonly.editMode" },
    filterReadonlyInViewModeTooltip: { id: "filter.visibilityMode.tooltip.readonly.viewMode" },
    filterConfigurationModeActiveTitle: { id: "filter.configuration.mode.interactive.title" },
    filterConfigurationModeHiddenTitle: { id: "filter.configuration.mode.hidden.title" },
    filterConfigurationModeReadOnlyTitle: { id: "filter.configuration.mode.locked.title" },
    filterConfigurationModeActiveTooltip: { id: "filter.configuration.mode.interactive.tooltip" },
    filterConfigurationModeHiddenTooltip: { id: "filter.configuration.mode.hidden.tooltip" },
    filterConfigurationModeReadOnlyTooltip: { id: "filter.configuration.mode.locked.tooltip" },
    filterConfigurationModeTitle: { id: "filter.configuration.mode.title" },
    filterConfigurationTitleTitle: { id: "attributesDropdown.title" },
    filterConfigurationTitleReset: { id: "attributesDropdown.title.reset" },
    dateFilterDropdownConfigurationHeader: { id: "dateFilterDropdown.configuration" },
    dateFilterDropdownConfigurationSaveText: { id: "dateFilterDropdown.save" },
    dateFilterDropdownConfigurationCancelText: { id: "gs.list.cancel" },
    filterResetButtonTooltip: { id: "filter.resetButton.tooltip" },
    crossFilterResetButtonTooltip: { id: "filter.crossFilterResetButton.tooltip" },
    filterAddValuesLimit: { id: "attributesDropdown.valuesLimiting.addLink" },
    filterAddValuesLimitPopupSearchPlaceholder: { id: "attributesDropdown.valuesLimiting.searchPlaceholder" },
    filterAddValuesLimitPopupSearchNoMatch: { id: "attributesDropdown.valuesLimiting.searchNoMatch" },
    filterAddValuesLimitPopupNoMetrics: { id: "attributesDropdown.valuesLimiting.metricsEmpty" },
    filterAddValuesLimitPopupNoFilters: { id: "attributesDropdown.valuesLimiting.filtersEmpty" },
    filterAddValuesLimitNoData: { id: "attributesDropdown.valuesLimiting.empty" },
    filterAddMetricTitle: { id: "attributesDropdown.valuesLimiting.addMetricTitle" },
    filterAddFilterTitle: { id: "attributesDropdown.valuesLimiting.addFilterTitle" },
    filterAddDateTitle: { id: "attributesDropdown.valuesLimiting.addDateTitle" },
    filterAddItemTitle: { id: "attributesDropdown.valuesLimiting.addItemTitle" },
    filterCountMetricTitle: { id: "attributesDropdown.valuesLimiting.countAttribute" },
    filterSumMetricTitle: { id: "attributesDropdown.valuesLimiting.sumFact" },
    filterUnknownItemTitle: { id: "attributesDropdown.valuesLimiting.unknownItem" },
    filterCommonDateFilterTitle: { id: "attributesDropdown.valuesLimiting.commonDateFilterTitle" },

    drillToDashboardConfig: { id: "configurationPanel.drillConfig.drillIntoDashboard" },
    drillIntoInsight: { id: "configurationPanel.drillConfig.drillIntoInsight" },
    drillDownConfig: { id: "configurationPanel.drillConfig.drillDown" },
    drillToUrlConfig: { id: "configurationPanel.drillConfig.drillIntoUrl" },
    disableDrillDownToolTip: { id: "configurationPanel.drillConfig.disableDrillDownTooltip" },
    disableUsedDrillDownTooltip: { id: "configurationPanel.drillConfig.alreadyUsedTooltip" },
    respectCrossFilteringConfig: { id: "configurationPanel.respectCrossFiltering" },
    respectCrossFilteringTooltip: { id: "configurationPanel.respectCrossFiltering.tooltip" },
    filterDropzoneTooltip: { id: "filterBar.filter.dropzone.tooltip" },
    filterDropzoneTooltipGeneric: { id: "filterBar.filter.dropzone.tooltip.generic" },
});
