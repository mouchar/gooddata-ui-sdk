// (C) 2022 GoodData Corporation

import React from "react";
import { StylingPickerListItem } from "./StylingPickerListItem";
import { areObjRefsEqual, ObjRef, objRefToString } from "@gooddata/sdk-model";
import { DialogListEmpty } from "../Dialog/DialogList/DialogListEmpty";
import { IStylingPickerItem, StylingPickerItemContent } from "../Dialog";

interface IStylingPickerListProps<T> {
    items: IStylingPickerItem<T>[];
    itemToColorPreview: (itemContent: T) => string[];
    emptyMessageElement: JSX.Element;
    onItemClick: (ref: ObjRef) => void;
    initiallySelectedItemRef?: ObjRef;
    selectedItemRef?: ObjRef;
    onItemEdit?: (item: IStylingPickerItem<T>) => void;
    onItemDelete?: (ref: ObjRef) => void;
}

export const StylingPickerList = <T extends StylingPickerItemContent>({
    items,
    itemToColorPreview,
    emptyMessageElement,
    onItemClick,
    onItemEdit,
    onItemDelete,
    initiallySelectedItemRef,
    selectedItemRef,
}: IStylingPickerListProps<T>): JSX.Element => {
    if (items.length === 0) {
        return <DialogListEmpty message={emptyMessageElement} className="gd-styling-picker-list-empty" />;
    }

    return (
        <div className="gd-styling-picker-list s-styling-picker-list">
            {items.map((item) => (
                <StylingPickerListItem<T>
                    key={objRefToString(item.ref)}
                    item={item}
                    itemToColorPreview={itemToColorPreview}
                    isSelected={areObjRefsEqual(item.ref, selectedItemRef)}
                    isDeletable={!areObjRefsEqual(item.ref, initiallySelectedItemRef)}
                    onClick={onItemClick}
                    onDelete={onItemDelete}
                    onEdit={onItemEdit}
                />
            ))}
        </div>
    );
};
