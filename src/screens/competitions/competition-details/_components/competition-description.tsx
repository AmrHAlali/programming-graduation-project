import { Text } from "@/components";
import { colors, hp, TrackType, wp } from "@/core";
import { useGetTrackById } from "@/core/hooks/tracks/use-track-by-id";
import { TrackTag } from "@/screens/profile/_components/track-tag";
import { StyleSheet, View } from "react-native";

export const CompetitionDescription = ({ description, trackId }: { description: string, trackId: number }) => {
    const { data: track } = useGetTrackById({ trackId });

    return (
        <View style={styles.content}>
            <View
                style={{ flexDirection: "row", gap: wp(2), alignItems: "center" }}
            >
                <Text
                    tx="Description"
                    preset="titleLargeBold"
                />

                {track && <TrackTag size="small" track={track as TrackType} />}
            </View>

            <View>
                <Text
                    preset="bodyMediumBold"
                    color={colors.neutrals.gray650}
                >
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(1),
        paddingTop: hp(3),
    }
});