import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const ContestSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={wp(10)}
    height={wp(10)}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    {/* Trophy cup */}
    <Path
      d="M20 12h24v20a12 12 0 01-24 0V12z"
      stroke={color}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Trophy base */}
    <Rect
      x={22}
      y={44}
      width={20}
      height={8}
      fill={color}
      rx={2}
      ry={2}
    />
    {/* Handles */}
    <Path
      d="M20 14c-4 4-6 10-4 16"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
    <Path
      d="M44 14c4 4 6 10 4 16"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
    {/* Star on cup */}
    <Path
      d="M32 22l3 6 7 1-5 4 1 7-6-3-6 3 1-7-5-4 7-1 3-6z"
      fill={color}
    />
  </Svg>
);
