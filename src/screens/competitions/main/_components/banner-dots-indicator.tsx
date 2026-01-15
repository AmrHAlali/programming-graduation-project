import { colors } from "@/core";
import { View } from "react-native";

export const BannerDotsIndicator = ({ count, activeIndex }: { count: number; activeIndex: number }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
            {Array.from({ length: count }).map((_, index) => (
                <View
                    key={`dot-${index}`}
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: index === activeIndex ? colors.neutrals.gray600 : colors.neutrals.gray300,
                    }}
                />
            ))}
        </View>
    );
};