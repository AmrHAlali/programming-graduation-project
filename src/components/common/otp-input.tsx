import React from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import { colors, rf, hp, wp, isRTL, getTypography } from "@/core";
import { Text } from "../ui";
import { RuleType } from "@/core/types/input-types";

const CELL_COUNT = 4;

const createStyles = (hasError: boolean, isDisabled: boolean) => {
  const typography = getTypography();

  return StyleSheet.create({
    container: {
      marginBottom: hp(4),
      alignItems: "flex-start",
    },
    label: {
      fontFamily: typography.primary.medium,
      fontSize: rf(18),
      marginBottom: hp(1.2),
      color: colors.neutrals.black,
      textAlign: isRTL() ? "right" : "left",
    },
    codeFieldRoot: {
      justifyContent: "center",
      gap: wp(3),
      width: "100%",
      writingDirection: "ltr",
      direction: "ltr",
      flexDirection: "row",
    },
    cell: {
      flex: 1,
      aspectRatio: 79 / 64,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: hasError ? colors.states.error : colors.neutrals.gray700,
      borderRadius: 8,
      backgroundColor: colors.neutrals.gray300,
      writingDirection: "ltr",
      direction: "ltr",
    },
    cellText: {
      fontSize: rf(28),
      textAlign: "center",
      color: colors.neutrals.black,
      textAlignVertical: "center",
    },
    focusCell: {
      borderColor: colors.primaryDeep,
      backgroundColor: colors.neutrals.gray400,
    },
    error: {
      fontFamily: typography.primary.light,
      fontSize: rf(14),
      color: colors.states.error,
      marginTop: hp(1),
    },
  });
};

interface OTPInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
  label?: string;
  disabled?: boolean;
  onComplete?: (data: any) => void;
}

export function ControlledOTPInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  disabled = false,
  onComplete,
}: OTPInputProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name, rules });

  const [focusedValue, setFocusedValue] = React.useState<string | undefined>();
  const ref = useBlurOnFulfill({ value: value || "", cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: focusedValue,
    setValue: setFocusedValue,
  });

  const styles = React.useMemo(
    () => createStyles(Boolean(error), disabled),
    [error, disabled]
  );

  const handleChange = (text: string) => {
    onChange(text);
    setFocusedValue(text);

    if (text.length === CELL_COUNT) {
      Keyboard.dismiss();
      if (onComplete) onComplete(text);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <CodeField
        ref={ref}
        {...props}
        value={value || ""}
        onChangeText={handleChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
        editable={!disabled}
      />
      {error?.message && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}
