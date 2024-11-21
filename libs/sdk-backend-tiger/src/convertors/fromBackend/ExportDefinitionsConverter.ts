// (C) 2020-2024 GoodData Corporation
import {
    JsonApiAutomationInAttributesTabularExports,
    JsonApiAutomationInAttributesVisualExports,
    JsonApiExportDefinitionOutIncludes,
    JsonApiExportDefinitionOutWithLinks,
    TabularExportRequest,
    VisualExportRequest,
} from "@gooddata/api-client-tiger";
import {
    FilterContextItem,
    idRef,
    IExportDefinitionMetadataObject,
    IExportDefinitionRequestPayload,
    IExportDefinitionVisualizationObjectSettings,
    IFilter,
} from "@gooddata/sdk-model";
import { v4 as uuid } from "uuid";
import { convertUserIdentifier } from "./UsersConverter.js";
import { cloneWithSanitizedIds } from "./IdSanitization.js";
import isEmpty from "lodash/isEmpty.js";

type MetadataObjectDefinition = {
    widget?: string;
    title?: string;
    filters?: FilterContextItem[];
};

export const convertExportDefinitionMdObject = (
    exportDefinitionOut: JsonApiExportDefinitionOutWithLinks,
    included: JsonApiExportDefinitionOutIncludes[] = [],
): IExportDefinitionMetadataObject => {
    const { id, attributes, links, relationships = {} } = exportDefinitionOut;
    const { createdBy, modifiedBy } = relationships;
    const {
        title = "",
        description = "",
        tags = [],
        requestPayload,
        createdAt,
        modifiedAt,
    } = attributes ?? {};
    const request = convertExportDefinitionRequestPayload(
        requestPayload as VisualExportRequest | TabularExportRequest,
    );

    return {
        type: "exportDefinition",
        id,
        uri: links!.self,
        ref: idRef(id, "exportDefinition"),
        title,
        description,
        tags,
        requestPayload: request,
        created: createdAt,
        updated: modifiedAt,
        createdBy: convertUserIdentifier(createdBy, included),
        updatedBy: convertUserIdentifier(modifiedBy, included),
        production: true,
        deprecated: false,
        unlisted: false,
    };
};

export const convertInlineExportDefinitionMdObject = (
    exportDefinitionOut:
        | JsonApiAutomationInAttributesTabularExports
        | JsonApiAutomationInAttributesVisualExports,
): IExportDefinitionMetadataObject => {
    const id = uuid();
    const request = convertExportDefinitionRequestPayload(
        exportDefinitionOut.requestPayload as VisualExportRequest | TabularExportRequest,
    );

    return {
        type: "exportDefinition",
        id,
        uri: id,
        ref: idRef(id, "exportDefinition"),
        title: (exportDefinitionOut.requestPayload.metadata as MetadataObjectDefinition).title ?? "",
        description: "",
        tags: [],
        requestPayload: request,
        production: true,
        deprecated: false,
        unlisted: false,
    };
};

const convertExportDefinitionRequestPayload = (
    exportRequest: VisualExportRequest | TabularExportRequest,
): IExportDefinitionRequestPayload => {
    if (isTabularRequest(exportRequest)) {
        const { widget } = (exportRequest.metadata as MetadataObjectDefinition) ?? {};

        const filters = exportRequest.visualizationObjectCustomFilters as IFilter[];
        const filtersObj = filters ? { filters: filters.map(cloneWithSanitizedIds) } : {};

        const { mergeHeaders, pdfPageSize } = exportRequest.settings ?? {};
        const orientation =
            pdfPageSize === "portrait" || pdfPageSize === "landscape" ? pdfPageSize : "portrait";
        const settings: IExportDefinitionVisualizationObjectSettings = {
            ...(exportRequest.format === "PDF" ? { orientation } : {}),
            ...(mergeHeaders ? { mergeHeaders } : {}),
        };
        const settingsObj = isEmpty(settings) ? {} : { settings };

        return {
            type: "visualizationObject",
            fileName: exportRequest.fileName,
            format: exportRequest.format,
            content: {
                visualizationObject: exportRequest.visualizationObject ?? "",
                dashboard: exportRequest.relatedDashboardId ?? "",
                widget,
                ...filtersObj,
            },
            ...settingsObj,
        };
    } else {
        const filters = (exportRequest.metadata as MetadataObjectDefinition)?.filters;
        const filtersObj = filters ? { filters } : {};

        return {
            type: "dashboard",
            fileName: exportRequest.fileName,
            format: "PDF",
            content: {
                dashboard: exportRequest.dashboardId,
                ...filtersObj,
            },
        };
    }
};

const isTabularRequest = (
    request: VisualExportRequest | TabularExportRequest,
): request is TabularExportRequest => {
    return !isEmpty(request) && typeof (request as TabularExportRequest).visualizationObject === "string";
};
