import { Icon, Screen } from "@/components";
import { ProfileHeader } from "../_components/profile-header";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, hp, rf, useUserStore, wp } from "@/core";
import { ProfileStatistics } from "../_components/profile-statistics";
import { TrackTagsList } from "../_components/track-tags-list";
import { Bio } from "../_components/bio";
import { CompetitionsListComponent } from "../_components/competitions-list-component";
import { CompetitionScoreChart } from "../_components/competition-score-chart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetUserProfile } from "@/core/hooks/user/use-user-profile";
import { UserPostsSection } from "../_components/user-posts-section";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "@/screens/navigation/profile-stack-navigator";

export const Profile = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ProfileStackNavigationProp>();
    const username = useUserStore((state) => state.authDetails?.username);
    const { userProfile, isLoading } = useGetUserProfile(username!);

    return (
        <Screen safeAreaEdges={["top"]} preset="scroll" style={styles.container}>
            <View style={[styles.content]}>
                <ProfileHeader
                    name={userProfile?.name || ""}
                    userName={userProfile?.username || ""}
                />

                <ProfileStatistics
                    totalScore={userProfile?.overallPercentage || 0}
                    followers={userProfile?.followerCount || 0}
                    following={userProfile?.followingCount || 0}
                    username={userProfile?.username || ""}
                />

                <Bio
                    content={userProfile?.bio || ""}
                />

                <TrackTagsList
                    tracks={
                        userProfile?.favoriteTracks?.map(({ trackId, trackName, backgroundColor }) => ({
                            id: trackId,
                            name: trackName,
                            description: "",
                            backgroundColor,
                        })) || []
                    }
                    isMyProfile={true}
                />

                <UserPostsSection username={userProfile?.username || ""} />

                <CompetitionScoreChart competitions={userProfile?.completedCompetitions || []} />

                <CompetitionsListComponent competitions={userProfile?.completedCompetitions || []} />

                <Pressable
                    style={{ position: "absolute", top: insets.top + hp(1), end: wp(5) }}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Icon
                        icon="settings"
                        size={rf(30)}
                    />
                </Pressable>
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