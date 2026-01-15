import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const LogoutSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M16 13L19 10M19 10L16 7M19 10H5M12 14V16.6C12 16.9152 11.9379 17.2273 11.8173 17.5184C11.6967 17.8096 11.5199 18.0742 11.2971 18.2971C11.0742 18.5199 10.8096 18.6967 10.5184 18.8173C10.2273 18.9379 9.91517 19 9.6 19H3.4C2.76348 19 2.15303 18.7471 1.70294 18.2971C1.25286 17.847 1 17.2365 1 16.6V3.4C1 3.08483 1.06208 2.77274 1.18269 2.48156C1.3033 2.19038 1.48008 1.9258 1.70294 1.70294C2.15303 1.25286 2.76348 1 3.4 1H9.6C9.91517 1 10.2273 1.06208 10.5184 1.18269C10.8096 1.3033 11.0742 1.48008 11.2971 1.70294C11.5199 1.9258 11.6967 2.19038 11.8173 2.48156C11.9379 2.77274 12 3.08483 12 3.4V6"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
