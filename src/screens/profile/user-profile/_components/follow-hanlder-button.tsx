import { Button } from "@/components";
import { colors, useUserStore } from "@/core";
import { useFollowUser } from "@/core/hooks/user/use-follow-user";
import { useGetFollowing } from "@/core/hooks/user/use-following";
import { useUnfollowUser } from "@/core/hooks/user/use-unfollow-user";
import { StyleSheet, View } from "react-native";

export const FollowHanlderButton = ({ followUsername }: { followUsername: string }) => {
    const username = useUserStore((state) => state.authDetails?.username);
    const { followUser, isPending: isFollowPending, isSuccess: isFollowSuccess } = useFollowUser();
    const { unfollowUser, isPending: isUnfollowPending, isSuccess: isUnfollowSuccess } = useUnfollowUser();
    const { users: followingList } = useGetFollowing({ username: username! });

    // Do not render button when viewing own profile or username is missing
    if (!username || followUsername === username) return null;

    const isFollowing = followingList?.some((user) => user.username === followUsername);

    const handleFollowPressed = () => {
        if (isFollowing) {
            unfollowUser(followUsername)
        } else {
            followUser(followUsername)
        }
    }

    return (
        <View style={styles.container}>
            <Button
                tx={isFollowing ? "Unfollow" : "Follow"}
                preset={isFollowing ? "reversed" : "primary"}
                disabled={isFollowPending || isUnfollowPending}
                onPress={handleFollowPressed}
                style={isFollowPending || isUnfollowPending ? { backgroundColor: colors.neutrals.gray300 } : undefined}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});