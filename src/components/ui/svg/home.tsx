import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const HomeSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={wp(8)}
    height={wp(8)}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    <Path
      d="M32 12 L12 32 H18 V52 H28 V40 H36 V52 H46 V32 H52 L32 12 Z"
      fill={color}
    />
  </Svg>
);
