import { hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
};

export const BronzeRankSVG: React.FC<Props> = ({
    width = wp(8),
    height = hp(8),
    color = "#964B00",
    ...props
}) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
        <Path
            d="M12 2L4 5V11C4 16.5 12 22 12 22C12 22 20 16.5 20 11V5L12 2ZM12 4.2L18 6.5V11C18 15.3 12 19.8 12 19.8C12 19.8 6 15.3 6 11V6.5L12 4.2Z"
            fill={color}
        />
    </Svg>
);