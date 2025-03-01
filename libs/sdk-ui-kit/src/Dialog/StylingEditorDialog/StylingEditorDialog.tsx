// (C) 2022 GoodData Corporation
import React, { useMemo, useState } from "react";
import { Dialog } from "../Dialog";
import { Typography } from "../../Typography";
import cx from "classnames";
import { StylingExample } from "./StylingExample";
import { IColorPalette, ITheme, ObjRef } from "@gooddata/sdk-model";
import { BubbleHeaderSeparator } from "./BubbleHeaderSeparator";
import { StylingEditorDialogFooter, IStylingEditorDialogFooterProps } from "./StylingEditorDialogFooter";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { useIntl } from "react-intl";

/**
 * @internal
 */
export type StylingPickerItemContent = ITheme | IColorPalette;

/**
 * @internal
 */
export interface IStylingPickerItem<T extends StylingPickerItemContent> {
    name?: string;
    ref?: ObjRef;
    content: T;
}

/**
 * @internal
 */
export interface IStylingEditorDialogProps<T> extends IStylingEditorDialogFooterProps {
    title: string;
    tooltip?: string;
    stylingItem?: IStylingPickerItem<T>;
    examples?: IStylingPickerItem<T>[];
    exampleToColorPreview?: (example: T) => string[];
    locale?: string;
}

/**
 * @internal
 */
export const StylingEditorDialog = <T extends StylingPickerItemContent>(
    props: IStylingEditorDialogProps<T>,
) => {
    return (
        <IntlWrapper locale={props.locale}>
            <StylingEditorDialogCore<T> {...props} />
        </IntlWrapper>
    );
};

const StylingEditorDialogCore = <T extends StylingPickerItemContent>(props: IStylingEditorDialogProps<T>) => {
    const {
        title,
        tooltip,
        link,
        stylingItem,
        examples,
        exampleToColorPreview,
        onClose,
        onSubmit,
        onCancel,
        disableSubmit,
        showProgressIndicator,
    } = props;
    const intl = useIntl();
    const providedExamples = !!examples && examples.length !== 0 && !!exampleToColorPreview;
    const initialNameField = stylingItem?.name ?? "";
    const initialDefinitionField = stylingItem?.content ? JSON.stringify(stylingItem?.content, null, 4) : "";
    const [nameField, setNameField] = useState(initialNameField);
    const [definitionField, setDefinitionField] = useState(initialDefinitionField);

    const fieldsChanged = useMemo(() => {
        try {
            const parsedDefinition = JSON.parse(definitionField);
            const formattedDefinition = JSON.stringify(parsedDefinition, null, 4);
            return nameField !== initialNameField || formattedDefinition !== initialDefinitionField;
        } catch (e) {
            // initial state of the fields is presumed to be valid,
            // so if JSON throws error, definition was changed
            return true;
        }
    }, [nameField, initialNameField, definitionField, initialDefinitionField]);

    const validName = useMemo(() => nameField !== "", [nameField]);

    const validDefinition = useMemo(() => {
        try {
            JSON.parse(definitionField);
            return true;
        } catch (e) {
            return false;
        }
    }, [definitionField]);

    const validFields = useMemo(() => validName && validDefinition, [validName, validDefinition]);

    const isSubmitDisabled = useMemo(
        () => !validFields || !fieldsChanged || disableSubmit,
        [validFields, fieldsChanged, disableSubmit],
    );

    const errorMessage = useMemo((): string | undefined => {
        if (!validName) {
            return intl.formatMessage({ id: "stylingEditor.dialog.name.required" });
        }
        if (definitionField === "") {
            return intl.formatMessage({ id: "stylingEditor.dialog.definition.required" });
        }
        if (!validDefinition) {
            return intl.formatMessage({ id: "stylingEditor.dialog.definition.invalid" });
        }
        return undefined;
    }, [validName, validDefinition, definitionField]);

    const getFinalStylingItem = (
        original: IStylingPickerItem<T>,
        definition: string,
        name: string,
    ): IStylingPickerItem<T> => {
        return {
            ...(original ? original : {}),
            content: JSON.parse(definition),
            name,
        };
    };

    return (
        <Dialog
            className={cx("gd-styling-editor-dialog", {
                "gd-styling-editor-dialog-create": providedExamples,
            })}
            onClose={onClose}
            displayCloseButton={true}
            submitOnEnterKey={false}
        >
            <Typography tagName="h2" className="gd-styling-editor-dialog-header">
                {title}
            </Typography>
            <div className="gd-styling-editor-dialog-content">
                <form className="gd-styling-editor-dialog-content-form" onSubmit={(e) => e.preventDefault()}>
                    <label className="gd-styling-editor-dialog-content-form-input">
                        {intl.formatMessage({ id: "stylingEditor.dialog.name" })}
                        <input
                            className="gd-input-field s-input-field"
                            type="text"
                            value={nameField}
                            onChange={(e) => setNameField(e.target.value)}
                        />
                    </label>
                    <label className="gd-styling-editor-dialog-content-form-textarea">
                        {intl.formatMessage({ id: "stylingEditor.dialog.definition" })}
                        <textarea
                            className="gd-input-field s-textarea-field"
                            wrap={"off"}
                            value={definitionField}
                            onChange={(e) => setDefinitionField(e.target.value)}
                        />
                    </label>
                </form>
                {providedExamples && (
                    <div
                        className={cx(
                            "gd-styling-editor-dialog-content-examples",
                            "s-gd-styling-editor-dialog-content-examples",
                        )}
                    >
                        <BubbleHeaderSeparator
                            title={intl.formatMessage({ id: "stylingEditor.dialog.examples" })}
                            message={tooltip}
                        />
                        <div className="gd-styling-editor-dialog-content-examples-list">
                            {examples.map((example, index) => (
                                <StylingExample
                                    key={index}
                                    name={example.name}
                                    colors={exampleToColorPreview(example.content)}
                                    onClick={() => {
                                        setNameField(example.name);
                                        setDefinitionField(JSON.stringify(example.content, null, 4));
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <StylingEditorDialogFooter
                disableSubmit={isSubmitDisabled}
                showProgressIndicator={showProgressIndicator}
                link={link}
                errorMessage={errorMessage}
                onSubmit={() => onSubmit(getFinalStylingItem(stylingItem, definitionField, nameField))}
                onCancel={onCancel}
            />
        </Dialog>
    );
};
