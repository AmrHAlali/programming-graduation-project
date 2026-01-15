import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const KebabMenu1SVG: React.FC<Props> = ({
  width = wp(6),
  height = hp(5),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 23 15"
    fill="none"
    {...props}
  >
    <Path
      d="M1 1H22M1 7.5H22M1 14H22"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </Svg>
);
