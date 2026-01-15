import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const GrandmasterRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#E74C3C",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2C12 2 11 4 11 6C9 6 7 7 6 9C4 8 2 8 2 8C2 8 3 11 5 13C3 15 3 18 3 18C5 17 7 15 8 13C9 15 11 16 12 16C13 16 15 15 16 13C17 15 19 17 21 18C21 18 21 15 19 13C21 11 22 8 22 8C22 8 20 8 18 9C17 7 15 6 13 6C13 4 12 2 12 2Z"
      fill={color}
    />
  </Svg>
);