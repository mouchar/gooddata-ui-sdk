// (C) 2020-2022 GoodData Corporation
import { call } from "redux-saga/effects";
import {
    IDrillEvent,
    IDrillIntersectionAttributeItem,
    isDrillIntersectionAttributeItem,
} from "@gooddata/sdk-ui";
import { areObjRefsEqual, IDrillToAttributeUrl } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { getElementTitle } from "./getElementTitle";
import { DashboardContext } from "../../types/commonTypes";
import { PromiseFnReturnType } from "../../types/sagas";

function getDrillToAttributeUrlIntersectionAttributeItemHeader(
    drillConfig: IDrillToAttributeUrl,
    event: IDrillEvent,
): IDrillIntersectionAttributeItem {
    return event.drillContext.intersection!.find(
        (item) =>
            isDrillIntersectionAttributeItem(item.header) &&
            areObjRefsEqual(item.header.attributeHeader.ref, drillConfig.target.displayForm),
    )?.header as IDrillIntersectionAttributeItem;
}

export function* resolveDrillToAttributeUrl(
    drillConfig: IDrillToAttributeUrl,
    event: IDrillEvent,
    ctx: DashboardContext,
): SagaIterator<string | undefined> {
    const header = getDrillToAttributeUrlIntersectionAttributeItemHeader(drillConfig, event);
    if (!header) {
        return;
    }

    const url: PromiseFnReturnType<typeof getElementTitle> = yield call(
        getElementTitle,
        ctx.workspace,
        drillConfig.target.hyperlinkDisplayForm,
        header.attributeHeaderItem.uri,
        ctx,
    );

    return url;
}
