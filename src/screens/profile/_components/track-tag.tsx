import { Text } from "@/components";
import { colors, getReadableTextColor, hp, TrackType, TxKeyPath, wp } from "@/core";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { StyleSheet, TouchableOpacity } from "react-native";

export const TrackTag = ({ track, size="regular" }: { track: TrackType, size?: "small" | "regular" }) => {
    const {textPreset, horizentalPadding, verticalPadding} = (() => {
        if (size === "small") {
            return { textPreset: "bodySmallBold", horizentalPadding: wp(1), verticalPadding: hp(.25) };
        } else if (size === "regular") {
            return { textPreset: "bodyMediumBold" as TxKeyPath, horizentalPadding: wp(2), verticalPadding: hp(.5) };
        }
        return { textPreset: "bodyMediumBold" as TxKeyPath };
    })()

    return (
        <TouchableOpacity
            activeOpacity={.4}
            style={[styles.container, {
                backgroundColor: track?.backgroundColor || colorWithOpacity(colors.neutrals.gray700, 0.7),
                paddingHorizontal: horizentalPadding,
                paddingVertical: verticalPadding,
            }]}
            onPress={() => {
                if (track?.id != null) {
                    goToShared("TrackDetails", { id: track.id } as any);
                }
            }}
        >
            <Text
                color={getReadableTextColor(track?.backgroundColor || colors.neutrals.black)}
                preset={textPreset as any}
            >
                {`#${track?.name}`}
            </Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    }
});