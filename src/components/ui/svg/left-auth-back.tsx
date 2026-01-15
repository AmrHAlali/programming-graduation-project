import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const LeftAuthBackSVG: React.FC<Props> = ({
  width = wp(6),
  height = hp(8),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M11.0001 21.667L12.8801 19.787L5.44008 12.3337H21.6667V9.66701H5.44008L12.8801 2.21368L11.0001 0.333679L0.333415 11.0003L11.0001 21.667Z"
      fill={color}
    />
  </Svg>
);
