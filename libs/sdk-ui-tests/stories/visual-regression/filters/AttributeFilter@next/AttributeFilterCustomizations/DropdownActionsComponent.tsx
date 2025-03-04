// (C) 2022 GoodData Corporation
import React from "react";
import { ReferenceMd } from "@gooddata/reference-workspace";
import { newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { AttributeFilterV2, IAttributeFilterDropdownActionsProps } from "@gooddata/sdk-ui-filters";
import { action } from "@storybook/addon-actions";

import { storiesOf } from "../../../../_infra/storyRepository";
import { FilterStories } from "../../../../_infra/storyGroups";
import { ReferenceWorkspaceId, StorybookBackend } from "../../../../_infra/backend";

import "@gooddata/sdk-ui-filters/styles/css/attributeFilterNext.css";

const wrapperStyle = { width: 400, height: 800, padding: "1em 1em" };
const backend = StorybookBackend();

const CustomDropdownActions = (props: IAttributeFilterDropdownActionsProps) => {
    const { onApplyButtonClick, onCloseButtonClick } = props;

    return (
        <div
            style={{
                borderTop: "1px solid black",
                display: "flex",
                padding: 10,
                margin: 0,
                justifyContent: "right",
                background: "cyan",
            }}
        >
            <button style={{ border: "1px solid black" }} onClick={onCloseButtonClick}>
                Close
            </button>
            <button style={{ border: "1px solid black" }} onClick={onApplyButtonClick}>
                Apply
            </button>
        </div>
    );
};

storiesOf(`${FilterStories}@next/Customization/DropdownActionsComponent`).add("Custom component", () => {
    return (
        <div style={wrapperStyle} className="screenshot-target">
            <AttributeFilterV2
                backend={backend}
                workspace={ReferenceWorkspaceId}
                filter={newNegativeAttributeFilter(ReferenceMd.Product.Name, [])}
                onApply={action("onApply")}
                DropdownActionsComponent={CustomDropdownActions}
            />
        </div>
    );
});
