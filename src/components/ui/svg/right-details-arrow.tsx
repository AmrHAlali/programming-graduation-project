import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const RightDetailsArrowSVG: React.FC<Props> = ({
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
      d="M7.15694 6.28935L1.49994 0.632351L0.0859375 2.04635L5.03594 6.99635L0.0859375 11.9464L1.49994 13.3604L7.15694 7.70335C7.34441 7.51582 7.44972 7.26152 7.44972 6.99635C7.44972 6.73119 7.34441 6.47688 7.15694 6.28935Z"
      fill={color}
    />
  </Svg>
);
