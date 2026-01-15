import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const WhoWeAreSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    {/* Outer circle */}
    <Circle
      cx="10"
      cy="10"
      r="9"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
    {/* Head */}
    <Circle
      cx="10"
      cy="6"
      r="1.25"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
    {/* Body (vertical line) */}
    <Path
      d="M9 9H11V15H9V9Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
