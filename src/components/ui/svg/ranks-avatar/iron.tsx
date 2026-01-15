import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const IronRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#4A4A4A",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4 6H20V9C20 9 17 9 16 11C15 13 15 15 15 15H9C9 15 9 13 8 11C7 9 4 9 4 9V6ZM18 17H6V19H18V17Z"
      fill={color}
    />
  </Svg>
);