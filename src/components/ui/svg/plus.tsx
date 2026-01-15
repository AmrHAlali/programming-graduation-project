import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const PlusSvg: React.FC<Props> = ({
  width = wp(6),
  height = hp(6),
  color = colors.neutrals.black,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      d="M8 18V10H0V8H8V0H10V8H18V10H10V18H8Z"
      fill={color}
    />
  </Svg>
);
