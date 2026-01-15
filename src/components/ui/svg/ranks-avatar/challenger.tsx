import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const ChallengerRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#1ABC9C",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 3L13 5L15 7L10 12C10 12 7 11 5 13C3 15 3 19 3 19C5 18 8 18 10 16C12 18 16 18 18 16C20 14 19 10 19 10L22 7L21 3ZM15 13C14 14 12 14 11 13C10 12 10 10 11 9C12 8 14 8 15 9C16 10 16 12 15 13Z"
      fill={color}
    />
  </Svg>
);