import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const PrivacyPolicySVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <Path
      d="M8.83797 6.48649C10.353 6.48649 11.5812 5.25829 11.5812 3.74324C11.5812 2.22819 10.353 1 8.83797 1C7.32292 1 6.09473 2.22819 6.09473 3.74324C6.09473 5.25829 7.32292 6.48649 8.83797 6.48649Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 15.4998C1 12.0366 4.15826 9.22949 8.05405 9.22949M13.9324 11.5808V10.4052C13.9324 10.0934 13.8086 9.79432 13.5881 9.57384C13.3676 9.35336 13.0686 9.22949 12.7568 9.22949C12.4449 9.22949 12.1459 9.35336 11.9254 9.57384C11.7049 9.79432 11.5811 10.0934 11.5811 10.4052V11.5808M10.0135 11.5808H15.5V15.4998H10.0135V11.5808Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
