import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from "react-native";
import { rf, hp, colors, isRTL } from "@/core";
import { Icon, IconTypes } from "../ui/icon";

export type IconButtonPreset = "authBack" | "commonBack";

interface IconButtonProps {
  icon?: IconTypes;
  onPress?: () => void;
  disabled?: boolean;
  preset?: IconButtonPreset;
  size?: number;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  testID?: string;
  accessibilityLabel?: string;
  commonContainer?: StyleProp<ViewStyle>;
}

const AuthBack = ({
  icon,
  size,
  disabled,
  iconStyle,
}: {
  icon?: IconTypes;
  size: number;
  disabled: boolean;
  iconStyle?: StyleProp<ImageStyle>;
}) => (
  <Icon
    icon={icon || "commonBack"}
    size={size}
    style={[styles.authPadding, disabled && styles.dim, iconStyle]}
  />
);

const CommonBack = ({
  icon,
  size,
  disabled,
  iconStyle,
  commonContainer,
}: {
  icon?: IconTypes;
  size: number;
  disabled: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  commonContainer?: StyleProp<ViewStyle>;
}) => (
  <View style={[styles.commonContainer, disabled && styles.slightDim, commonContainer]}>
    <Icon
      icon={icon || "commonBack"}
      size={size}
      style={[
        disabled && styles.dim,
        isRTL() ? { marginRight: 2 } : { marginLeft: 2 },
        iconStyle,
      ]}
    />
  </View>
);

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  disabled = false,
  preset = "commonBack",
  size,
  style,
  iconStyle,
  testID,
  accessibilityLabel,
  commonContainer,
  ...props
}) => {
  const content = useMemo(() => {
    return preset === "authBack" ? (
      <AuthBack
        icon={icon || "commonBack"}
        size={size ?? rf(24)}
        disabled={disabled}
        iconStyle={iconStyle}
      />
    ) : (
      <CommonBack
        icon={icon}
        size={size ?? rf(24)}
        disabled={disabled}
        iconStyle={iconStyle}
        commonContainer={commonContainer}
      />
    );
  }, [preset, icon, size, disabled, iconStyle]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[styles.container, style]}
      hitSlop={styles.hitSlop}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel || "Icon button"}
      testID={testID}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  authPadding: {
    paddingVertical: hp(4),
  },
  dim: {
    opacity: 0.5,
  },
  slightDim: {
    opacity: 0.9,
  },
  commonContainer: {
    backgroundColor: colors.neutrals.white,
    borderRadius: rf(100),
    padding: hp(1.5),
    justifyContent: "center",
    alignItems: "center",
  },
  hitSlop: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
  } as const,
});
