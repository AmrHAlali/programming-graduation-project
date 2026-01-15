import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const InfoSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    {/* Outer circle */}
    <Circle
      cx="50"
      cy="50"
      r="45"
      stroke={color}
      strokeWidth="10"
    />

    {/* Dot of the "i" */}
    <Circle
      cx="50"
      cy="32"
      r="6"
      fill={color}
    />

    {/* Vertical bar of the "i" */}
    <Rect
      x="45"
      y="45"
      width="10"
      height="30"
      rx="3"
      fill={color}
    />
  </Svg>
);
