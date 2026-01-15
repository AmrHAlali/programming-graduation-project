import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const ArrowSVG: React.FC<Props> = ({
  width = wp(4),
  height = hp(4),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 14 8"
    fill="none"
    {...props}
  >
    <Path
      d="M1.25 1L7 6.75L12.75 1"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
