// (C) 2021-2022 GoodData Corporation
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "./layoutState";
import { invariant } from "ts-invariant";
import { resetUndoReducer, undoReducer, withUndo } from "../_infra/undoEnhancer";
import {
    ExtendedDashboardItem,
    ExtendedDashboardLayoutSection,
    ExtendedDashboardWidget,
    RelativeIndex,
    StashedDashboardItemsId,
} from "../../types/layoutTypes";
import { addArrayElements, moveArrayElement, removeArrayElement } from "../../utils/arrayOps";
import {
    areObjRefsEqual,
    ObjRef,
    VisualizationProperties,
    IDashboardFilterReference,
    isDashboardDateFilterReference,
    InsightDrillDefinition,
    isKpiWidget,
    isInsightWidget,
    IDashboardLayout,
    IDashboardLayoutSectionHeader,
    IKpiComparisonDirection,
    IKpiComparisonTypeComparison,
    IDrillToLegacyDashboard,
} from "@gooddata/sdk-model";
import { WidgetHeader } from "../../types/widgetTypes";
import flatMap from "lodash/flatMap";
import { Draft } from "immer";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap";
import { IdentityMapping } from "../../../_staging/dashboard/dashboardLayout";

type LayoutReducer<A> = CaseReducer<LayoutState, PayloadAction<A>>;

//
//
//

const setLayout: LayoutReducer<IDashboardLayout<ExtendedDashboardWidget>> = (state, action) => {
    state.layout = action.payload;

    resetUndoReducer(state);
};

//
//
//

function recurseLayoutAndUpdateWidgetIds(
    layout: Draft<IDashboardLayout<ExtendedDashboardWidget>>,
    mapping: ObjRefMap<IdentityMapping>,
) {
    layout.sections.forEach((section) => {
        section.items.forEach((item) => {
            const widget = item.widget;

            if (!isInsightWidget(widget) && !isKpiWidget(widget)) {
                return;
            }

            const { updated: newIdentity } = mapping.get(widget.ref) ?? {};

            if (!newIdentity) {
                return;
            }

            widget.ref = newIdentity.ref;
            widget.uri = newIdentity.uri;
            widget.identifier = newIdentity.identifier;
        });
    });
}

const updateWidgetIdentities: LayoutReducer<ObjRefMap<IdentityMapping>> = (state, action) => {
    invariant(state.layout);

    recurseLayoutAndUpdateWidgetIds(state.layout, action.payload);
};

//
// Reducers that manipulate the layout itself - the sections and items
//

type AddSectionActionPayload = {
    section: ExtendedDashboardLayoutSection;
    index: RelativeIndex;
    usedStashes: StashedDashboardItemsId[];
};

const addSection: LayoutReducer<AddSectionActionPayload> = (state, action) => {
    invariant(state.layout);

    const { index, section, usedStashes } = action.payload;

    addArrayElements(state.layout.sections, index, [section]);

    usedStashes.forEach((stashIdentifier) => {
        delete state.stash[stashIdentifier];
    });
};

//
//
//

type RemoveSectionActionPayload = { index: RelativeIndex; stashIdentifier?: StashedDashboardItemsId };

const removeSection: LayoutReducer<RemoveSectionActionPayload> = (state, action) => {
    invariant(state.layout);

    const { index, stashIdentifier } = action.payload;

    if (stashIdentifier) {
        const items = state.layout.sections[index].items;

        state.stash[stashIdentifier] = items;
    }

    removeArrayElement(state.layout.sections, index);
};

//
//
//

type ChangeSectionActionPayload = { index: number; header: IDashboardLayoutSectionHeader };

const changeSectionHeader: LayoutReducer<ChangeSectionActionPayload> = (state, action) => {
    invariant(state.layout);

    const { index, header } = action.payload;

    state.layout.sections[index].header = header;
};

//
//
//

type changeItemsHeightActionPayload = { sectionIndex: number; itemIndexes: number[]; height: number };

const changeItemsHeight: LayoutReducer<changeItemsHeightActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndexes, height } = action.payload;

    const section = state.layout.sections[sectionIndex];
    itemIndexes.forEach((itemIndex) => {
        const item = section.items[itemIndex];

        const newSize = {
            ...item.size,
            xl: {
                ...item.size.xl,
                gridHeight: height,
            },
        };

        item.size = newSize;
    });
};

//
//
//

type changeItemWidthActionPayload = { sectionIndex: number; itemIndex: number; width: number };

const changeItemWidth: LayoutReducer<changeItemWidthActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndex, width } = action.payload;

    const section = state.layout.sections[sectionIndex];
    const item = section.items[itemIndex];

    const newSize = {
        ...item.size,
        xl: {
            ...item.size.xl,
            gridWidth: width,
        },
    };

    item.size = newSize;
};

//
//
//

type MoveSectionActionPayload = { sectionIndex: number; toIndex: RelativeIndex };

const moveSection: LayoutReducer<MoveSectionActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, toIndex } = action.payload;

    moveArrayElement(state.layout.sections, sectionIndex, toIndex);
};

//
//
//

type AddSectionItemsActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    items: ExtendedDashboardItem[];
    usedStashes: StashedDashboardItemsId[];
};

const addSectionItems: LayoutReducer<AddSectionItemsActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndex, items, usedStashes } = action.payload;
    const section = state.layout.sections[sectionIndex];

    invariant(section);

    addArrayElements(section.items, itemIndex, items);

    usedStashes.forEach((stashIdentifier) => {
        delete state.stash[stashIdentifier];
    });
};

//
//
//

type MoveSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    toSectionIndex: number;
    toItemIndex: RelativeIndex;
};

const moveSectionItem: LayoutReducer<MoveSectionItemActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndex, toSectionIndex, toItemIndex } = action.payload;
    const fromSection = state.layout.sections[sectionIndex];
    const toSection = state.layout.sections[toSectionIndex];

    invariant(fromSection);
    invariant(toSection);

    const item = removeArrayElement(fromSection.items, itemIndex);

    invariant(item);

    addArrayElements(toSection.items, toItemIndex, [item]);
};

//
//
//

type RemoveSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    stashIdentifier?: StashedDashboardItemsId;
};

const removeSectionItem: LayoutReducer<RemoveSectionItemActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndex, stashIdentifier } = action.payload;
    const section = state.layout.sections[sectionIndex];

    invariant(section);

    const item = removeArrayElement(section.items, itemIndex);

    invariant(item);

    if (stashIdentifier) {
        state.stash[stashIdentifier] = [item];
    }
};

//
//
//

type ReplaceSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    newItems: ExtendedDashboardItem[];
    stashIdentifier?: StashedDashboardItemsId;
    usedStashes: StashedDashboardItemsId[];
};

const replaceSectionItem: LayoutReducer<ReplaceSectionItemActionPayload> = (state, action) => {
    invariant(state.layout);

    const { sectionIndex, itemIndex, newItems, stashIdentifier, usedStashes } = action.payload;
    const section = state.layout.sections[sectionIndex];

    invariant(section);

    const item = removeArrayElement(section.items, itemIndex);

    invariant(item);

    if (stashIdentifier) {
        state.stash[stashIdentifier] = [item];
    }

    addArrayElements(section.items, itemIndex, newItems);

    usedStashes.forEach((usedStash) => {
        /*
         * It is a valid case that the new item is taken from a stash and the replaced item is then
         * used to replace the same stash.
         */
        if (stashIdentifier !== undefined && usedStash === stashIdentifier) {
            return;
        }

        delete state.stash[usedStash];
    });
};

//
// Layout-widget specific reducers
//

const getWidgetByRef = (state: Draft<LayoutState>, widgetRef: ObjRef) => {
    const allWidgets = flatMap(state?.layout?.sections, (section) =>
        section.items.map((item) => item.widget),
    );

    return allWidgets.find((w) => {
        // defer type checks until the actual widget is found
        const ref: ObjRef | undefined = w && (w as any).ref;

        return ref && areObjRefsEqual(ref, widgetRef);
    });
};

//
//
//

type ReplaceWidgetHeader = {
    ref: ObjRef;
    header: WidgetHeader;
};

const replaceWidgetHeader: LayoutReducer<ReplaceWidgetHeader> = (state, action) => {
    invariant(state.layout);

    const { header, ref } = action.payload;

    const widget = getWidgetByRef(state, ref);

    // this means command handler did not correctly validate that the widget exists before dispatching the
    // reducer action
    invariant(widget && (isKpiWidget(widget) || isInsightWidget(widget)));

    widget.title = header.title ?? "";
};

//
//
//

type ReplaceWidgetDrillDefinitions = {
    ref: ObjRef;
    drillDefinitions: InsightDrillDefinition[];
};

const replaceWidgetDrill: LayoutReducer<ReplaceWidgetDrillDefinitions> = (state, action) => {
    invariant(state.layout);

    const { drillDefinitions, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);

    // this means command handler did not correctly validate that the widget exists before dispatching the
    // reducer action
    invariant(widget && (isKpiWidget(widget) || isInsightWidget(widget)));

    widget.drills = drillDefinitions ?? [];
};

//
//
//

type ReplaceWidgetVisProperties = {
    ref: ObjRef;
    properties: VisualizationProperties | undefined;
};

const replaceInsightWidgetVisProperties: LayoutReducer<ReplaceWidgetVisProperties> = (state, action) => {
    invariant(state.layout);

    const { properties, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && isInsightWidget(widget));

    widget.properties = properties;
};

//
//
//

type ReplaceWidgetFilterSettings = {
    ref: ObjRef;
    ignoreDashboardFilters?: IDashboardFilterReference[];
    dateDataSet?: ObjRef;
};

const replaceWidgetFilterSettings: LayoutReducer<ReplaceWidgetFilterSettings> = (state, action) => {
    invariant(state.layout);

    const { ignoreDashboardFilters, dateDataSet, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && (isInsightWidget(widget) || isKpiWidget(widget)));

    widget.dateDataSet = dateDataSet;
    widget.ignoreDashboardFilters = ignoreDashboardFilters ?? [];
};

//
//
//

type RemoveIgnoredAttributeFilter = {
    displayFormRefs: ObjRef[];
};

const removeIgnoredAttributeFilter: LayoutReducer<RemoveIgnoredAttributeFilter> = (state, action) => {
    invariant(state.layout);

    const { displayFormRefs } = action.payload;

    state.layout.sections.forEach((section) => {
        section.items.forEach((item) => {
            const widget = item.widget;

            if (isInsightWidget(widget) || isKpiWidget(widget)) {
                const updatedFilters = widget.ignoreDashboardFilters.filter((filter) => {
                    if (isDashboardDateFilterReference(filter)) {
                        return true;
                    }

                    return (
                        displayFormRefs.find((removed) => areObjRefsEqual(removed, filter.displayForm)) ===
                        undefined
                    );
                });

                widget.ignoreDashboardFilters = updatedFilters;
            }
        });
    });
};

//
//
//

type ReplaceWidgetDateDataset = {
    ref: ObjRef;
    dateDataSet?: ObjRef;
};

const replaceWidgetDateDataset: LayoutReducer<ReplaceWidgetDateDataset> = (state, action) => {
    invariant(state.layout);

    const { dateDataSet, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && (isInsightWidget(widget) || isKpiWidget(widget)));

    widget.dateDataSet = dateDataSet;
};

//
//
//

type ReplaceKpiWidgetMeasure = {
    ref: ObjRef;
    measureRef: ObjRef;
};

const replaceKpiWidgetMeasure: LayoutReducer<ReplaceKpiWidgetMeasure> = (state, action) => {
    invariant(state.layout);

    const { ref, measureRef } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && isKpiWidget(widget));

    widget.kpi.metric = measureRef;
};

//
//
//

type ReplaceKpiWidgetComparison = {
    ref: ObjRef;
    comparisonType: IKpiComparisonTypeComparison;
    comparisonDirection?: IKpiComparisonDirection;
};

const replaceKpiWidgetComparison: LayoutReducer<ReplaceKpiWidgetComparison> = (state, action) => {
    invariant(state.layout);

    const { ref, comparisonType, comparisonDirection } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && isKpiWidget(widget));

    widget.kpi.comparisonType = comparisonType;
    widget.kpi.comparisonDirection = comparisonDirection;
};

//
//
//

type ReplaceKpiWidgetDrill = {
    ref: ObjRef;
    drill: IDrillToLegacyDashboard | undefined;
};

const replaceKpiWidgetDrill: LayoutReducer<ReplaceKpiWidgetDrill> = (state, action) => {
    invariant(state.layout);

    const { ref, drill } = action.payload;
    const widget = getWidgetByRef(state, ref);

    invariant(widget && isKpiWidget(widget));

    widget.drills = drill ? [drill] : [];
};

export const layoutReducers = {
    setLayout,
    updateWidgetIdentities,
    removeIgnoredAttributeFilter,
    addSection: withUndo(addSection),
    removeSection: withUndo(removeSection),
    moveSection: withUndo(moveSection),
    changeSectionHeader: withUndo(changeSectionHeader),
    addSectionItems: withUndo(addSectionItems),
    moveSectionItem: withUndo(moveSectionItem),
    removeSectionItem: withUndo(removeSectionItem),
    replaceSectionItem: withUndo(replaceSectionItem),
    replaceWidgetHeader: withUndo(replaceWidgetHeader),
    replaceWidgetDrills: withUndo(replaceWidgetDrill),
    replaceInsightWidgetVisProperties: withUndo(replaceInsightWidgetVisProperties),
    replaceWidgetFilterSettings: withUndo(replaceWidgetFilterSettings),
    replaceWidgetDateDataset: withUndo(replaceWidgetDateDataset),
    replaceKpiWidgetMeasure: withUndo(replaceKpiWidgetMeasure),
    replaceKpiWidgetComparison: withUndo(replaceKpiWidgetComparison),
    replaceKpiWidgetDrill: withUndo(replaceKpiWidgetDrill),
    undoLayout: undoReducer,
    clearLayoutHistory: resetUndoReducer,
    changeItemsHeight: changeItemsHeight,
    changeItemWidth: changeItemWidth,
};
