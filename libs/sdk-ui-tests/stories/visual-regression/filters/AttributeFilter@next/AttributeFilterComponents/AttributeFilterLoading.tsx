// (C) 2022 GoodData Corporation
import React from "react";

import { FilterStories } from "../../../../_infra/storyGroups";
import { storiesOf } from "../../../../_infra/storyRepository";
import { wrapWithTheme } from "../../../themeWrapper";

import { IntlWrapper } from "@gooddata/sdk-ui";
import { AttributeFilterLoading } from "@gooddata/sdk-ui-filters/dist/internal";

import "@gooddata/sdk-ui-filters/styles/css/attributeFilterNext.css";

const AttributeFilterLoadingExamples = (): JSX.Element => {
    return (
        <div style={{ width: 300 }}>
            <IntlWrapper>
                <div className="library-component screenshot-target">
                    <h4>AttributeFilterLoading</h4>
                    <AttributeFilterLoading />
                </div>
            </IntlWrapper>
        </div>
    );
};

storiesOf(`${FilterStories}@next/Components/AttributeFilterLoading`)
    .add("full-featured", () => <AttributeFilterLoadingExamples />, {})
    .add("themed", () => wrapWithTheme(<AttributeFilterLoadingExamples />), {});
