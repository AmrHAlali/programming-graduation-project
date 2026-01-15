import { colors } from "@/core/theme";
import { View, StyleSheet } from "react-native";

export function Circles({ length, active }: { length: number, active: number }) {
    return (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
            {Array.from({ length: length }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.circle,
                        index === active
                            ? { backgroundColor: colors.states.success }
                            : { backgroundColor: colors.neutrals.gray600 },
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginVertical: 12,
        marginHorizontal: 5,
    }
});
