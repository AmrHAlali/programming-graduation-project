import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const MasterRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#9B59B6",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2L14.5 9H22L16 14L18.5 21L12 17L5.5 21L8 14L2 9H9.5L12 2ZM12 5.5L10.5 10.5H5.5L9.5 13.5L8 18.5L12 16L16 18.5L14.5 13.5L18.5 10.5H13.5L12 5.5Z"
      fill={color}
    />
  </Svg>
);