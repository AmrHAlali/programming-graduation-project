import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const LeftDetailsArrowSVG: React.FC<Props> = ({
  width = wp(4),
  height = hp(4),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 8 14"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.843063 6.28935L6.50006 0.632351L7.91406 2.04635L2.96406 6.99635L7.91406 11.9464L6.50006 13.3604L0.843063 7.70335C0.655592 7.51582 0.550277 7.26152 0.550277 6.99635C0.550277 6.73119 0.655593 6.47688 0.843063 6.28935Z"
      fill={color}
    />
  </Svg>
);
