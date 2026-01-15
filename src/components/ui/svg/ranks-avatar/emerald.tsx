import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const EmeraldRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#2ECC71",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5 5V14L12 20L19 14V5H5ZM12 17.5L7.5 13.5V7H16.5V13.5L12 17.5Z"
      fill={color}
    />
  </Svg>
);