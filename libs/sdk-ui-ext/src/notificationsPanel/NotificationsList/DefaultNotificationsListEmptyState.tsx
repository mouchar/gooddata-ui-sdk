// (C) 2024 GoodData Corporation
import React from "react";
import { bem } from "../bem.js";
import { INotificationsPanelView } from "../types.js";
import { defineMessages, useIntl } from "react-intl";

const { b } = bem("gd-ui-ext-notifications-list-empty-state");

/**
 * @alpha
 */
export interface INotificationsListEmptyStateComponentProps {
    activeView: INotificationsPanelView;
}

const messages = defineMessages({
    emptyStateAll: {
        id: "notifications.panel.empty.all",
    },
    emptyStateUnread: {
        id: "notifications.panel.empty.unread",
    },
});

/**
 * @internal
 */
export function DefaultNotificationsListEmptyState({
    activeView,
}: INotificationsListEmptyStateComponentProps) {
    const intl = useIntl();
    return (
        <div className={b()}>
            {activeView === "all"
                ? intl.formatMessage(messages.emptyStateAll)
                : intl.formatMessage(messages.emptyStateUnread)}
        </div>
    );
}
