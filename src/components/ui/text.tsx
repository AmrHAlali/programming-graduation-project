import React from "react";
import type { TextProps, TextStyle } from "react-native";
import { I18nManager, StyleSheet, Text as NNText } from "react-native";
import { colors, getTypography, rf, TxKeyPath } from "@/core";
import { useTranslation } from "react-i18next";
import { TOptionsBase } from "i18next";

type Dictionary<T = any> = Record<string, T>;

// ---- Presets ----
// Heading
// headingLarge → 32 Bold
// headingMedium → 28 Bold
// headingSmall → 24 (Medium / Bold)
// Title
// titleLarge → 20 (Medium / Bold)
// titleMedium → 16 (Light / Medium / Bold)
// titleSmall → 14 (Light / Medium / Bold)
// Body
// bodyLarge → 16 (Light / Medium / Bold) (نفس عنوان medium)
// bodyMedium → 14 (Light / Medium / Bold) (نفس titleSmall)
// bodySmall → 12 (Light / Medium / Bold)
// Label
// labelSmall → 10 (Light / Medium)

// ---- Roboto Presets ---- 
// roboto22 -> 22 Bold
// roboto18 -> 18 Bold
// roboto16 -> 16 Bold
// roboto10 -> 10 SemiBold

export interface Props extends TextProps {
  preset?: PresetsKeys;
  tx?: TxKeyPath|string;
  txOptions?: (TOptionsBase & Dictionary) | undefined;
  text?: string;
  color?: string;
}

/**
 * ✅ Base dynamic style
 */
const BASE = () => ({
  fontFamily: getTypography().primary.medium,
  fontSize: rf(16),
  color: colors.neutrals.black,
});

/**
 * ✅ Dynamic presets (converted to functions)
 */
const dynamicPresets = {
  headingLarge: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(32),
  }),

  headingMedium: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(28),
  }),

  headingSmall: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(24),
  }),

  headingSmallBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(24),
  }),

  titleLarge: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(20),
  }),

  titleLargeBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(20),
  }),

  titleMediumLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(16),
    lineHeight: rf(25),
  }),

  titleMedium: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(16),
  }),

  titleMediumBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(16),
  }),

  titleSmallLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(14),
  }),

  titleSmall: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(14),
  }),

  titleSmallBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(14),
  }),

  bodyLargeLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(16),
  }),

  bodyLarge: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(16),
  }),

  bodyLargeBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(16),
  }),

  bodyMediumLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(14),
  }),

  bodyMedium: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(14),
  }),

  bodyMediumBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(14),
  }),

  bodySmall: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(12),
  }),

  bodySmallBold: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.bold,
    fontSize: rf(12),
  }),

  bodySmallLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(12),
  }),

  labelSmallLight: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.light,
    fontSize: rf(10),
  }),

  labelSmall: () => ({
    ...BASE(),
    fontFamily: getTypography().primary.medium,
    fontSize: rf(10),
  }),

  // ---- Roboto ----
  roboto22: () => ({
    ...BASE(),
    fontFamily: getTypography().secondary.bold,
    fontSize: rf(22),
  }),

  roboto18: () => ({
    ...BASE(),
    fontFamily: getTypography().secondary.bold,
    fontSize: rf(18),
  }),

  roboto16: () => ({
    ...BASE(),
    fontFamily: getTypography().secondary.bold,
    fontSize: rf(16),
  }),

  roboto10: () => ({
    ...BASE(),
    fontFamily: getTypography().secondary.semiBold,
    fontSize: rf(10),
  }),

  default: () => BASE(),
};

export type PresetsKeys = keyof typeof dynamicPresets;

export const Text = ({
  preset = "default",
  style,
  color,
  children,
  text,
  tx,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const baseStyle = dynamicPresets[preset]();

  const finalStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        baseStyle,
        {
          writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
          color: color ?? baseStyle.color,
        },
        style,
      ]) as TextStyle,
    [preset, style, color, I18nManager.isRTL]
  );

  return (
    <NNText style={finalStyle} {...props}>
      {tx ? t(tx) : children}
    </NNText>
  );
};
