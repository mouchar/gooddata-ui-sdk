// (C) 2022 GoodData Corporation
import React from "react";
import { ReferenceMd } from "@gooddata/reference-workspace";
import { newNegativeAttributeFilter } from "@gooddata/sdk-model";
import { AttributeFilterV2 } from "@gooddata/sdk-ui-filters";
import { IAttributeFilterDropdownButtonProps } from "@gooddata/sdk-ui-filters/dist/internal";
import { action } from "@storybook/addon-actions";

import { storiesOf } from "../../../../_infra/storyRepository";
import { FilterStories } from "../../../../_infra/storyGroups";
import { ReferenceWorkspaceId, StorybookBackend } from "../../../../_infra/backend";

import "@gooddata/sdk-ui-filters/styles/css/attributeFilterNext.css";

const wrapperStyle = { width: 400, height: 800, padding: "1em 1em" };
const backend = StorybookBackend();

const CustomDropdownButton = (props: IAttributeFilterDropdownButtonProps) => {
    const { title, onClick } = props;

    return (
        <button style={{ border: "1px solid black" }} onClick={onClick}>
            {title}
        </button>
    );
};

storiesOf(`${FilterStories}@next/Customization/DropdownButtonComponent`).add("Custom component", () => {
    return (
        <div style={wrapperStyle} className="screenshot-target">
            <AttributeFilterV2
                backend={backend}
                workspace={ReferenceWorkspaceId}
                filter={newNegativeAttributeFilter(ReferenceMd.Product.Name, [])}
                onApply={action("on-apply")}
                DropdownButtonComponent={CustomDropdownButton}
            />
        </div>
    );
});
