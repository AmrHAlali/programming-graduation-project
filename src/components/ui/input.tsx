import * as React from "react";
import { FieldValues, useController } from "react-hook-form";
import {
  I18nManager,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput as NTextInput,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import {
  rf,
  hp,
  wp,
  colors,
  ControlledInputProps,
  NInputProps,
  getTypography,
} from "@/core";
import { Text } from "./text";
import { useTranslation } from "react-i18next";

/**
 * Extended props for Input
 */
export interface InputProps extends NInputProps {
  addUnitStyle?: boolean;
  cancelDesign?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
}

/**
 * ✅ Dynamic text styles
 */
const dynamicStyles = {
  label: (hasError: boolean) => ({
    fontFamily: getTypography().primary.medium,
    fontSize: rf(16),
    color: hasError ? colors.states.error : colors.neutrals.black,
  }),

  placeholderText: () => ({
    fontFamily: getTypography().primary.medium,
    fontSize: rf(14),
    color: colors.neutrals.gray700,
  }),

  input: (isRTL: boolean) => ({
    flex: 1,
    fontFamily: getTypography().primary.medium,
    fontSize: rf(20),
    paddingVertical: hp(2),
    marginHorizontal: wp(2),
    color: colors.neutrals.gray700,
    textAlign: isRTL ? "right" : "left",
  }),

  helper: () => ({
    fontFamily: getTypography().primary.medium,
    fontSize: rf(14),
    color: colors.neutrals.gray700,
    marginTop: hp(1),
  }),

  error: () => ({
    fontFamily: getTypography().primary.medium,
    fontSize: rf(13),
    color: colors.states.error,
    marginVertical: hp(0.5),
  }),
};

/**
 * ✅ Static styles remain static
 */
const baseStyles = StyleSheet.create({
  container: {
    minHeight: hp(5),
  },
  error: {
    color: colors.states.error,
    marginVertical: hp(0.5),
  },
  helper: {
    marginTop: hp(1),
  },
  rightAccessory: {
    marginHorizontal: wp(4),
  },
  leftAccessory: {
    marginHorizontal: wp(4),
  },
});

/**
 * ✅ Dynamic input container (kept inside a function)
 */
const createInputContainerStyle = (
  isFocused: boolean,
  hasError: boolean,
  isDisabled: boolean,
  isRTL: boolean,
  addUnitStyle?: boolean,
  multiline?: boolean
) =>
  StyleSheet.create({
    inputContainer: {
      ...(addUnitStyle
        ? {
            minHeight: multiline ? hp(25) : hp(5),
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: hp(1),
            overflow: "hidden",
            borderWidth: wp(0.3),
            borderColor: hasError
              ? colors.states.error
              : isFocused
              ? colors.primaryDeep
              : colors.neutrals.transparent,
            backgroundColor: isDisabled
              ? colors.neutrals.gray300
              : colors.neutrals.gray200,
            maxWidth: wp(100),
            alignSelf: "center",
            width: "100%",
          }
        : {
            minHeight: multiline ? hp(25) : hp(5),
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            borderWidth: 1.5,
            borderRadius: 12,
            backgroundColor: isDisabled
              ? colors.neutrals.gray300
              : colors.neutrals.gray400,
            borderColor: hasError
              ? colors.states.error
              : isFocused
              ? colors.primaryDeep
              : colors.neutrals.gray700,
          }),
    },
  });

/**
 * ✅ Input Component
 */
export const Input = React.forwardRef<NTextInput, InputProps>((props, ref) => {
  const {
    label,
    labelTx,
    labelTxOptions,
    error,
    errorTx,
    errorTxOptions,
    testID,
    leftAccessory,
    rightAccessory,
    helper,
    helperTx,
    helperTxOptions,
    placeholder,
    placeholderTx,
    placeholderTxOptions,
    showError = true,
    direction = "auto",
    addUnitStyle = false,
    multiline = false,
    containerStyle,
    inputContainerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    helperStyle,
    ...inputProps
  } = props;

  const { t } = useTranslation();

  const isRTL = React.useMemo(() => {
    if (direction === "ltr") return false;
    if (direction === "rtl") return true;
    return I18nManager.isRTL;
  }, [direction]);

  const [isFocused, setIsFocused] = React.useState(false);
  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);

  const styles = React.useMemo(() => {
    if (props.cancelDesign) {
      return StyleSheet.create({
        container: {},
        inputContainer: {},
      });
    }

    return createInputContainerStyle(
      isFocused,
      Boolean(error),
      Boolean(props.disabled),
      isRTL,
      addUnitStyle,
      multiline
    );
  }, [
    isFocused,
    error,
    props.disabled,
    isRTL,
    addUnitStyle,
    props.cancelDesign,
    multiline,
  ]);

  const inputRef = React.useRef<NTextInput>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  const labelContent = labelTx ? t(labelTx, labelTxOptions) : label;
  const placeholderContent = placeholderTx
    ? t(placeholderTx, placeholderTxOptions)
    : placeholder;
  const errorContent = errorTx ? t(errorTx, errorTxOptions) : error;
  const helperContent = helperTx ? t(helperTx, helperTxOptions) : helper;

  const startAccessory = rightAccessory;
  const endAccessory = leftAccessory;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[baseStyles.container, containerStyle]}
      accessibilityState={{ disabled: !!props.disabled }}
    >
      {labelContent && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          style={[
            dynamicStyles.label(!!error),
            labelStyle,
          ]}
        >
          {labelContent}
        </Text>
      )}

      <View style={[styles.inputContainer, inputContainerStyle]}>
        {startAccessory && (
          <View style={baseStyles.rightAccessory}>{startAccessory}</View>
        )}

        <NTextInput
          testID={testID}
          ref={inputRef}
          placeholder={placeholderContent}
          placeholderTextColor={
            props.placeholderTextColor ?? colors.neutrals.gray700
          }
          multiline={multiline}
          style={[
            dynamicStyles.input(isRTL),
            dynamicStyles.placeholderText(),
            inputStyle,
            inputProps.style,
          ]}
          onBlur={onBlur}
          onFocus={onFocus}
          editable={!props.disabled}
          textAlign={isRTL ? "right" : "left"}
          {...inputProps}
        />

        {endAccessory && (
          <View style={baseStyles.leftAccessory}>{endAccessory}</View>
        )}
      </View>

      {showError && errorContent ? (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          style={[dynamicStyles.error(), errorStyle]}
          preset="bodySmall"
        >
          {errorContent}
        </Text>
      ) : null}

      {helperContent ? (
        <Text
          testID={testID ? `${testID}-helper` : undefined}
          style={[dynamicStyles.helper(), helperStyle]}
        >
          {helperContent}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
});

Input.displayName = "Input";

/**
 * ✅ ControlledInput
 */
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T> & InputProps
) {
  const { name, control, rules, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ""}
      {...inputProps}
      error={fieldState.error?.message}
      placeholderTextColor={
        inputProps.placeholderTextColor ?? colors.neutrals.gray700
      }
    />
  );
}
