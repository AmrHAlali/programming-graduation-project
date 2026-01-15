import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const SilverRankSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = "#C0C0C0",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2ZM12 4.5L5.5 8.2V15.8L12 19.5L18.5 15.8V8.2L12 4.5ZM12 7.5L15.9 9.7V14.3L12 16.5L8.1 14.3V9.7L12 7.5Z"
      fill={color}
    />
  </Svg>
);