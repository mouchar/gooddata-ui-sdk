// (C) 2019-2021 GoodData Corporation
import { AxiosInstance } from "axios";
import { ActionsApi, ActionsApiInterface } from "./generated/afm-rest-api";

/**
 * Tiger execution result client factory
 *
 */
export const tigerExecutionResultClientFactory = (
    axios: AxiosInstance,
): Pick<ActionsApiInterface, "retrieveResult"> => new ActionsApi({}, "", axios);
