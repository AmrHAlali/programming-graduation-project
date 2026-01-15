import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const DiamondRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#3498DB",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M6 3L3 8L12 21L21 8L18 3H6ZM17 5L19 8H14.5L12.5 5H17ZM11.5 5L13.5 8H10.5L11.5 5ZM7 5H11.5L9.5 8H5L7 5ZM12 18L6.5 9H17.5L12 18Z"
      fill={color}
    />
  </Svg>
);