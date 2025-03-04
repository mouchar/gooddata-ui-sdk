// (C) 2021-2022 GoodData Corporation

import {
    IOrganization,
    IOrganizations,
    IOrganizationStylingService,
    ISecuritySettingsService,
} from "@gooddata/sdk-backend-spi";
import { IOrganizationDescriptor } from "@gooddata/sdk-model";

import { SecuritySettingsService } from "./securitySettings";
import { TigerAuthenticatedCallGuard } from "../../types";
import { OrganizationStylingService } from "./styling";

export class TigerOrganization implements IOrganization {
    constructor(
        private readonly authCall: TigerAuthenticatedCallGuard,
        public readonly organizationId: string,
        public readonly organizationName?: string,
    ) {}

    public async getDescriptor(): Promise<IOrganizationDescriptor> {
        // if we already have the data, no reason to download them again
        if (this.organizationName) {
            return {
                id: this.organizationId,
                title: this.organizationName,
            };
        }

        const { organizationName, organizationId } = await this.authCall((client) =>
            client.profile.getCurrent(),
        );
        return {
            id: organizationId,
            title: organizationName,
        };
    }

    public securitySettings(): ISecuritySettingsService {
        return new SecuritySettingsService(this.organizationId);
    }

    public styling(): IOrganizationStylingService {
        return new OrganizationStylingService(this.authCall);
    }
}

export class TigerOrganizations implements IOrganizations {
    constructor(private readonly authCall: TigerAuthenticatedCallGuard) {}

    public async getCurrentOrganization(): Promise<IOrganization> {
        const { organizationName, organizationId } = await this.authCall((client) =>
            client.profile.getCurrent(),
        );
        return new TigerOrganization(this.authCall, organizationId, organizationName);
    }
}
