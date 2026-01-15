import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const PlatinumRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#ADE8E6",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 3L8 11L12 21L16 11L12 3ZM7 8L3 14L7 20L10 14L7 8ZM17 8L14 14L17 20L21 14L17 8Z"
      fill={color}
    />
  </Svg>
);