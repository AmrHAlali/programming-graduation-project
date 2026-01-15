import { Screen, Text } from "@/components";
import { colors, getReadableTextColor, hp, useUserStore, wp } from "@/core";
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
import { TrackItem } from "./_components/track-item";
import { useGetAllTracks } from "@/core/hooks/tracks/use-all-tracks";
import { useGetFavoriteTracks } from "@/core/hooks/tracks/use-favorite-tracks";
import { useCallback, useMemo } from "react";
import { TrackInfo } from "@/core";
import { IconButton } from "@/components/common/icon-button";
import { useNavigation } from "@react-navigation/native";

export const TracksListScreen = () => {
    const navigation = useNavigation();

    const { tracks } = useGetAllTracks();
    const username = useUserStore((state) => state.authDetails?.username);
    const { tracks: favoriteTracks } = useGetFavoriteTracks({ username: username! });

    const data = useMemo(() => tracks ?? [], [tracks]);

    const favoriteIds = useMemo(
        () => new Set((favoriteTracks ?? []).map((track) => track.id)),
        [favoriteTracks]
    );

    const renderItem: ListRenderItem<TrackInfo> = useCallback(
        ({ item }) => (
            <TrackItem
                label={item.name || ""}
                id={item.id}
                backgroundColor={item.backgroundColor || colors.neutrals.gray700}
                textColor={getReadableTextColor(item.backgroundColor || colors.neutrals.gray700)}
                isFavourite={favoriteIds.has(item.id)}
            />
        ),
        [favoriteIds],
    );

    const keyExtractor = useCallback((item: TrackInfo) => String(item.id), []);

    return (
        <Screen safeAreaEdges={["top", "bottom"]} preset="fixed" style={styles.container}>
            <View style={styles.headerRow}>
                <IconButton
                    preset="commonBack"
                    onPress={() => {
                        // Fallback-safe back navigation
                        // @ts-ignore - navigation may be untyped here
                        if ((navigation as any)?.canGoBack?.()) {
                            (navigation as any).goBack();
                        }
                    }}
                />

                <Text
                    color={colors.primaryDeep}
                    preset="headingSmallBold"
                    style={styles.headerTitle}
                >
                    {`Tracks List`}
                </Text>

                {/* Spacer to balance header layout */}
                <View style={styles.headerSpacer} />
            </View>
            <FlatList
                contentContainerStyle={styles.content}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                initialNumToRender={12}
                maxToRenderPerBatch={12}
                windowSize={5}
                removeClippedSubviews
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
    },
    headerSpacer: {
        width: wp(10),
    },
    content: {
        gap: hp(1),
        paddingTop: hp(3),
        paddingBottom: hp(8),
    }
});