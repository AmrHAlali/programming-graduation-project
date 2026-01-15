import type React from "react";
import { TextInputProps } from "react-native";
import { TxKeyPath } from "../i18n";
import { TOptionsBase } from "i18next";
import { $Dictionary } from "node_modules/i18next/typescript/helpers";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { PresetsKeys } from "../../components/ui/text";

/** New: visual/text direction control */
export type TextDirection = "auto" | "ltr" | "rtl";

export interface NInputProps extends TextInputProps {
  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: (TOptionsBase & $Dictionary) | undefined;

  /** You already had a `disabled` boolean separate from RN's `editable`.
   * The component will treat `disabled` as a visual state and still pass through RN props as given. */
  disabled?: boolean;

  error?: string;
  errorTx?: TxKeyPath;
  errorTxOptions?: (TOptionsBase & $Dictionary) | undefined;

  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;

  helper?: string;
  helperTx?: TxKeyPath;
  helperTxOptions?: (TOptionsBase & $Dictionary) | undefined;

  placeholderTx?: TxKeyPath;
  placeholderTxOptions?: (TOptionsBase & $Dictionary) | undefined;

  showError?: boolean;

  /** New: force direction or follow device (default: "auto") */
  direction?: TextDirection;

  /** Optional text preset for customizing input text style */
  textPreset?: PresetsKeys;
}

export type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };

export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

export interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}
