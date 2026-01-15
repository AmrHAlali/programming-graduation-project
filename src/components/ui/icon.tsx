import * as React from "react";
import {
  Image,
  ImageStyle,
  I18nManager,
  Pressable,
  PressableProps,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { ArrowSVG, BackLeftArrowSVG, BackRightArrowSVG, CheckedSVG, GlobeSVG, SettingsSVG, StarSVG } from "./svg";
import { OutlinedStarSVG } from "./svg/outlined-star";
import { PlusSvg } from "./svg/plus";

type Direction = "auto" | "rtl" | "ltr";

/** SVG component type */
type SVGComponent = React.FC<{ width?: number; height?: number; color?: string } & Record<string, any>>;

/** Icon entry type — can be PNG or SVG, directional or static */
type DirectionalIcon =
  | ImageSourcePropType
  | { rtl: ImageSourcePropType; ltr: ImageSourcePropType }
  | SVGComponent
  | { rtl: SVGComponent; ltr: SVGComponent };

export const iconRegistry = {
  // Example of SVG registration:
  // lock: LockSvg,
  // menu: MenuSvg,
  // or even directional SVGs:
  // commonBack: { rtl: BackRightSvg, ltr: BackLeftSvg },
  check: CheckedSVG,
  arrow: ArrowSVG,
  globe: GlobeSVG,
  commonBack: {
    rtl: BackRightArrowSVG,
    ltr: BackLeftArrowSVG,
  },
  star: StarSVG,
  outlinedStar: OutlinedStarSVG,
  plus: PlusSvg,
  settings: SettingsSVG,
} satisfies Record<string, DirectionalIcon>;

export type IconTypes = keyof typeof iconRegistry;

interface BaseProps {
  /** Icon name in the registry */
  icon: IconTypes;
  /** Optional color (tint or fill) */
  color?: string;
  /** Optional size */
  size?: number;
  /** Style for the icon itself */
  style?: StyleProp<ImageStyle>;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Forced direction */
  dir?: Direction;
}

type PressableOrViewProps =
  | ({ onPress: NonNullable<PressableProps["onPress"]> } & Omit<
    PressableProps,
    "style" | "onPress"
  >)
  | ({ onPress?: undefined } & Omit<ViewProps, "style">);

export type IconProps = BaseProps & PressableOrViewProps;

const imageStyleBase: ImageStyle = { resizeMode: "contain" };

function resolveDir(dir: Direction): "rtl" | "ltr" {
  if (dir === "auto") return I18nManager.isRTL ? "rtl" : "ltr";
  return dir;
}

function getIconSource(icon: IconTypes, dir: "rtl" | "ltr") {
  const entry = iconRegistry[icon];
  if (!entry) return null;

  if (typeof entry === "number") return entry; // PNG
  if (typeof entry === "function") return entry; // SVG component

  // Directional
  return entry[dir];
}

export const Icon = React.forwardRef<View, IconProps>(function Icon(props, ref) {
  const {
    icon,
    color,
    size = 20,
    style: imageStyleOverride,
    containerStyle,
    dir = "auto",
    onPress,
    ...rest
  } = props as IconProps & { onPress?: PressableProps["onPress"] };

  const resolvedDir = resolveDir(dir);
  const source = getIconSource(icon, resolvedDir);

  if (!source) {
    if (__DEV__) {
      console.warn(`[Icon] Unknown icon "${icon}". Check iconRegistry.`);
    }
    return null;
  }

  const isSvg = typeof source === "function";

  const imageStyle: StyleProp<ImageStyle> = [
    imageStyleBase,
    { width: size, height: size },
    color != null && { tintColor: color },
    imageStyleOverride,
  ];

  const accessibilityRole = onPress ? "button" : "image";
  const mergedContainerStyle = containerStyle;

  const content = isSvg ? (
    // Render SVG component
    React.createElement(source as SVGComponent, {
      width: size,
      height: size,
      color,
    })
  ) : (
    // Render PNG
    <Image style={imageStyle} source={source as ImageSourcePropType} />
  );

  if (onPress) {
    return (
      <Pressable
        ref={ref as any}
        accessibilityRole={accessibilityRole}
        hitSlop={8}
        onPress={onPress}
        style={mergedContainerStyle}
        {...(rest as PressableProps)}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      style={mergedContainerStyle}
      {...(rest as ViewProps)}
    >
      {content}
    </View>
  );
});
