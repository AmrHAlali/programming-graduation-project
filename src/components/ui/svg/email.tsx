import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const EmailSVG: React.FC<Props> = ({
  width = wp(6),
  height = hp(6),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 16"
    fill="none"
    {...props}
  >
    <Path
      d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
      fill={color}
    />
  </Svg>
);
