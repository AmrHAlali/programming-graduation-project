import { Text } from "@/components";
import { CompetitionComponent } from "@/components/common/competition-component";
import { colors, Competition, getTrackById, hp, useUserStore, wp } from "@/core";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";
import { BannerDotsIndicator } from "./banner-dots-indicator";
import { useGetFavoriteTracks } from "@/core/hooks/tracks/use-favorite-tracks";
import { useQueries } from "@tanstack/react-query";
import { sendRequest } from "@/core/hooks/api/use-axios-tanstack";

export const NextCompetitionBanner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const username = useUserStore((state) => state.authDetails?.username);

    const { tracks: favoriteTracks } = useGetFavoriteTracks({ username: username! });

    const favoriteTrackIds = useMemo(
        () => (favoriteTracks ?? []).map((track) => track.id),
        [favoriteTracks]
    );

    const upcomingQueries = useQueries({
        queries: favoriteTrackIds.map((trackId) => ({
            queryKey: ["competitionRoute-getUpcomingCompetitionByTrackId", { trackId }],
            queryFn: () =>
                sendRequest("competitionRoute", "getUpcomingCompetitionByTrackId", { trackId }),
            enabled: !!trackId && !!username,
        })),
    });

    const upcomingCompetitions = useMemo(
        () =>
            upcomingQueries
                .map((q) => q.data)
                .filter((c): c is any => Boolean(c)),
        [upcomingQueries]
    );

    const data: Competition[] = useMemo(
        () =>
            upcomingCompetitions.map((c: any) => ({
                competitionId: c.id,
                competitionName: c.name,
                trackName: c.trackName,
                score: null,
                percentage: null,
                completedAt: c.startTime,
            })),
        [upcomingCompetitions]
    );

    if (!data.length) return null;

    const firstCompetition = upcomingCompetitions[0] as any;
    const track = getTrackById(firstCompetition.trackId)!;

    return (
        <View style={[styles.container]}>
            <Text
                tx="Upcoming Competitions"
                preset="titleLargeBold"
                color={colors.neutrals.black}
                style={{ marginHorizontal: wp(5) }}
            />

            <FlatList
                data={data}
                keyExtractor={(item) => String(item.competitionId)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentContainerStyle={styles.listContent}
                onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                    const { contentOffset, layoutMeasurement } = event.nativeEvent;
                    const index = Math.round(contentOffset.x / layoutMeasurement.width);
                    setActiveIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.card}>
                            <CompetitionComponent
                                competition={item}
                                future
                                bannerMode
                            />
                        </View>
                    </View>
                )}
            />

            <BannerDotsIndicator
                count={data.length}
                activeIndex={activeIndex}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: hp(1),
        marginBottom: hp(2),
    },
    listContent: {
        paddingVertical: hp(0.5),
        paddingHorizontal: 0,
    },
    item: {
        width: wp(100),
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: wp(90),
    },
});