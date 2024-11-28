// (C) 2022-2024 GoodData Corporation
import { useCallback } from "react";

import {
    addNestedLayoutSectionItem,
    uiActions,
    useDashboardCommandProcessing,
    useDashboardDispatch,
} from "../../../../model/index.js";

import { idRef } from "@gooddata/sdk-model";
import { v4 as uuidv4 } from "uuid";
import { ILayoutItemPath } from "../../../../types.js";
import { BaseDraggableLayoutItemSize } from "../../../dragAndDrop/index.js";

export function useRichTextPlaceholderDropHandler(layoutPath: ILayoutItemPath) {
    const dispatch = useDashboardDispatch();

    const { run: createRichText } = useDashboardCommandProcessing({
        commandCreator: addNestedLayoutSectionItem,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED",
        onSuccess: (event) => {
            const ref = event.payload.itemsAdded[0].widget!.ref;
            dispatch(uiActions.selectWidget(ref));
        },
    });

    return useCallback(
        (itemSize: BaseDraggableLayoutItemSize) => {
            const id = uuidv4();

            createRichText(layoutPath, {
                type: "IDashboardLayoutItem",
                size: {
                    xl: {
                        gridHeight: itemSize.gridHeight,
                        gridWidth: itemSize.gridWidth,
                    },
                },
                widget: {
                    type: "richText",
                    description: "",
                    content: "",
                    drills: [],
                    ignoreDashboardFilters: [],
                    title: "",
                    identifier: id,
                    ref: idRef(id),
                    uri: `/${id}`,
                },
            });
        },
        [createRichText, layoutPath],
    );
}
