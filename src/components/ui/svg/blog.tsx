import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const BlogSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primaryDeep,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M17 13V7C17 4.172 17 2.757 16.121 1.879C15.243 1 13.828 1 11 1H7C4.172 1 2.757 1 1.879 1.879C1 2.757 1 4.172 1 7V13C1 15.828 1 17.243 1.879 18.121C2.757 19 4.172 19 7 19H19M5 6H13M5 10H13M5 14H9"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M17 6H18C19.414 6 20.121 6 20.56 6.44C21 6.879 21 7.586 21 9V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19C18.4696 19 17.9609 18.7893 17.5858 18.4142C17.2107 18.0391 17 17.5304 17 17V6Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
