import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const GoldRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#FFD700",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5 19H19V17H5V19ZM19 15L22 7L17 11L12 4L7 11L2 7L5 15H19Z"
      fill={color}
    />
  </Svg>
);