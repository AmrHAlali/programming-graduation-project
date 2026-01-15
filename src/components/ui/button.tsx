import React, { ComponentType, useMemo } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { rf, wp, hp, colors, ButtonAccessoryProps, TextPresetConfig, TxKeyPath } from "@/core";
import { PresetsKeys, Text, Props as TextProps } from "./text";

type Presets = keyof typeof viewPresets;

export interface ButtonProps extends PressableProps {
  text?: TextProps["text"];
  tx?: TxKeyPath | string;
  textPreset?: PresetsKeys | null;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  preset?: Presets;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  children?: React.ReactNode;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
}

export function Button(props: ButtonProps) {
  const {
    text,
    tx,
    textPreset,
    style: viewStyleOverride,
    pressedStyle: pressedViewStyleOverride,
    textStyle: textStyleOverride,
    pressedTextStyle: pressedTextStyleOverride,
    disabledTextStyle: disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: disabledViewStyleOverride,
    ...rest
  } = props;

  const preset: Presets = props.preset ?? "primary";

  // Build text presets with fallback when textPreset is null/empty
  const textPresets = useMemo(
    () => createTextPresets(textPreset),
    [textPreset]
  );

  function viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      viewPresets[preset],
      viewStyleOverride,
      !!pressed && [pressedViewPresets[preset], pressedViewStyleOverride],
      !!disabled && disabledViewStyleOverride,
    ];
  }

  function textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      textPresets[preset]?.style,
      textStyleOverride,
      !!pressed && [pressedTextPresets[preset]?.style, pressedTextStyleOverride],
      !!disabled && disabledTextStyleOverride,
    ];
  }

  // Pick the preset name to pass into <Text>
  // inside Button()
  const currentTextPreset: PresetsKeys =
    (typeof textPreset === "string" && textPreset.trim().length > 0
      ? textPreset
      : textPresets[preset]?.preset) as PresetsKeys; // TODO


  return (
    <Pressable
      style={viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text
            tx={tx ?? text as TxKeyPath}
            preset={currentTextPreset}
            style={textStyle(state)}
          />

          {children}

          {!!RightAccessory && (
            <RightAccessory
              style={rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

/** ---------- styles ---------- */

const baseViewStyle: ViewStyle = {
  minHeight: hp(5),
  borderRadius: wp(3),
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: hp(1.8),
  paddingHorizontal: hp(2),
  overflow: "hidden",
  borderWidth: wp(0.5),
  borderColor: colors.neutrals.transparent,
  backgroundColor: colors.neutrals.transparent,
  maxWidth: wp(100),
  alignSelf: "center",
};

const rightAccessoryStyle: ViewStyle = { marginStart: wp(1), zIndex: 1 };
const leftAccessoryStyle: ViewStyle = { marginEnd: wp(1), zIndex: 1 };

const viewPresets = {
  primary: [
    baseViewStyle,
    { borderRadius: 12, width: "100%", backgroundColor: colors.primary },
  ] as StyleProp<ViewStyle>,
  secondary: [
    baseViewStyle,
    { backgroundColor: colors.states.success, borderRadius: 100, width: wp(80), paddingVertical: hp(1), maxWidth: wp(80), },
  ] as StyleProp<ViewStyle>,
  reversed: [
    baseViewStyle,
    { borderRadius: 12, width: "100%", borderColor: colors.primary },
  ] as StyleProp<ViewStyle>,
  danger: [
    baseViewStyle,
    { borderRadius: 12, width: "100%", backgroundColor: colors.states.error },
  ] as StyleProp<ViewStyle>,
  medium: [
    baseViewStyle,
    { borderRadius: 100, paddingHorizontal: wp(15), paddingVertical: hp(1.3), alignSelf: "center", backgroundColor: colors.primaryDeep },
  ] as StyleProp<ViewStyle>,
  activeToggle: [
    baseViewStyle,
    { borderRadius: 100, backgroundColor: colors.backgroundAlt2, paddingHorizontal: wp(4), paddingVertical: hp(1), borderColor: colors.primary },
  ] as StyleProp<ViewStyle>,
  disActiveToggle: [
    baseViewStyle,
    { borderRadius: 100, backgroundColor: colors.neutrals.transparent, paddingHorizontal: wp(4), paddingVertical: hp(1), borderColor: colors.neutrals.gray700 },
  ] as StyleProp<ViewStyle>,
  textButton: [
    // baseViewStyle,
    { flexDirection: "row", alignContent: "center", borderWidth: 0, backgroundColor: colors.neutrals.transparent, paddingHorizontal: 0, paddingVertical: 0 },
  ] as StyleProp<ViewStyle>,
  option: [
    {
      borderColor: colors.primaryDeep,
      paddingHorizontal: wp(2),
      paddingVertical: hp(.5),
      borderWidth: 1.5,
      borderRadius: 100,
      alignContent: "center",
      flexDirection: "row",
      alignItems: "center",
    } as StyleProp<ViewStyle>,
  ]
};

const pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.primary, opacity: 0.8 },
  danger: { backgroundColor: colors.states.error, opacity: 0.8 },
  medium: { backgroundColor: colors.primaryDeep, opacity: 0.8 },
  secondary: { backgroundColor: colors.primary, opacity: 0.8 },
  reversed: { backgroundColor: colors.primary, opacity: 0.8 },
  activeToggle: { backgroundColor: colors.primary, opacity: 0.8 },
  disActiveToggle: { backgroundColor: colors.neutrals.gray700, opacity: 0.8 },
  textButton: { backgroundColor: colors.neutrals.transparent, opacity: 0.8 },
  option: [{ backgroundColor: colors.neutrals.transparent, opacity: 0.5 }]
};

/** ---------- text preset factory (fix) ---------- */

// Builds the text preset map using a prop value, defaulting to "bodyLarge" if null/empty.
function createTextPresets(tp?: PresetsKeys | null): Record<Presets, TextPresetConfig> {
  const resolved: PresetsKeys = (tp as PresetsKeys);

  return {
    primary: {
      style: { color: colors.neutrals.white },
      preset: resolved ?? "titleMedium",
    },
    danger: {
      style: { color: colors.neutrals.white },
      preset: resolved ?? "bodyLarge",
    },
    medium: {
      style: { color: colors.neutrals.white },
      preset: resolved ?? "bodySmall",
    },
    secondary: {
      style: { color: colors.neutrals.white },
      preset: resolved ?? "headingSmall",
    },
    reversed: {
      style: { color: colors.primary },
      preset: resolved ?? "bodyLarge",
    },
    activeToggle: {
      style: { color: colors.primary },
      preset: resolved ?? "titleSmall",
    },
    disActiveToggle: {
      style: { color: colors.neutrals.gray700 },
      preset: resolved ?? "titleSmall",
    },
    textButton: {
      style: { color: colors.accent.beige },
      preset: resolved ?? "titleLarge",
    },
    option: {
      style: { color: colors.primary },
      preset: resolved ?? "titleSmall",
    },
  };
}

const pressedTextPresets: Record<Presets, TextPresetConfig> = {
  primary: { style: { color: colors.neutrals.white }, preset: "bodyLarge" },
  danger: { style: { color: colors.neutrals.black }, preset: "bodyLarge" },
  medium: { style: { color: colors.neutrals.white }, preset: "bodySmall" },
  secondary: { style: { color: colors.neutrals.white }, preset: "bodyLarge" },
  reversed: { style: { color: colors.neutrals.white }, preset: "bodyLarge" },
  activeToggle: { style: { color: colors.neutrals.white }, preset: "titleSmall" },
  disActiveToggle: { style: { color: colors.neutrals.white }, preset: "titleSmall" },
  textButton: { style: { color: colors.accent.beige, opacity: 0.8 }, preset: "titleLarge" },
  option: { style: { color: colors.primary }, preset: "titleSmall" },
};
