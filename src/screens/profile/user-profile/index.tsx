import { Screen } from "@/components";
import { ProfileHeader } from "../_components/profile-header";
import { StyleSheet, View } from "react-native";
import { colors, hp, wp } from "@/core";
import { ProfileStatistics } from "../_components/profile-statistics";
import { TrackTagsList } from "../_components/track-tags-list";
import { Bio } from "../_components/bio";
import { CompetitionsListComponent } from "../_components/competitions-list-component";
import { CompetitionScoreChart } from "../_components/competition-score-chart";
import { useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import { useGetUserProfile } from "@/core/hooks/user/use-user-profile";
import { UserPostsSection } from "../_components/user-posts-section";
import { FollowHanlderButton } from "./_components/follow-hanlder-button";

type UserProfileRoute = {
    params: {
        username: string;
    };
};

export const UserProfileScreen = ({ route }: { route: UserProfileRoute }) => {
    const ref = useRef<ActionSheetRef>(null);
    const { username } = route.params;
    const { userProfile, isLoading } = useGetUserProfile(username);

    return (
        <Screen safeAreaEdges={["top"]} preset="scroll" style={styles.container}>
            <View style={[styles.content]}>
                <ProfileHeader
                    name={userProfile?.name || ""}
                    userName={userProfile?.username || ""}
                />

                <FollowHanlderButton followUsername={userProfile?.username || ""} />

                <ProfileStatistics
                    totalScore={userProfile?.overallPercentage || 0}
                    followers={userProfile?.followerCount || 0}
                    following={userProfile?.followingCount || 0}
                    username={userProfile?.username || ""}
                />

                <Bio
                    content={userProfile?.bio || ""}
                />

                {(userProfile?.favoriteTracks?.length ?? 0) > 0 && (
                    <TrackTagsList
                        tracks={
                            userProfile?.favoriteTracks?.map(({ trackId, trackName, backgroundColor }) => ({
                                id: trackId,
                                name: trackName,
                                description: "",
                                backgroundColor,
                            })) || []
                        }
                    />
                )}

                <UserPostsSection username={userProfile?.username || ""} />

                <CompetitionScoreChart competitions={userProfile?.completedCompetitions || []} />

                <CompetitionsListComponent competitions={userProfile?.completedCompetitions || []} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(4),
        paddingBottom: hp(10)
    }
});