import { Text } from "@/components";
import { hp, TrackType, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { TrackTag } from "./track-tag";
import { AddTrackToFavorite } from "../my-profile/_components/add-track-to-favorite";

export const TrackTagsList = ({ tracks, isMyProfile, hidTitle }: { tracks: TrackType[], isMyProfile?: boolean, hidTitle?: boolean }) => {
    return (
        <View style={styles.container}>
            {!hidTitle && (
                <Text
                    tx="Tracks"
                    preset="titleLargeBold"
                />
            )}

            <View style={styles.tagsContainer}>
                {tracks.map((track, idx) => (
                    track ? <TrackTag key={track?.id ?? idx} track={track} /> : null
                ))}
                {isMyProfile && <AddTrackToFavorite />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: hp(1.5)
    },
    tagsContainer: {
        flexDirection: "row",
        gap: wp(2),
        flexWrap: "wrap"
    }
});