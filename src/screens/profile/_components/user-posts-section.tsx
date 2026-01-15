import { Button, Text } from "@/components";
import { Post } from "@/components/common/post";
import { $styles, colors, hp } from "@/core";
import { useGetUserPosts } from "@/core/hooks/posts/use-user-posts";
import { StyleSheet, View } from "react-native";
import { goToShared } from "@/screens/navigation/shared-navigation";

export const UserPostsSection = ({ username }: { username: string }) => {
    const { posts, isLoading } = useGetUserPosts({ username });

    const firstPost = posts && posts.length > 0 ? posts[0] : null;

    if(!posts || posts.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text
                tx={`Posts by ${username} (${posts?.length})`}
                preset="titleLargeBold"
            />

            <View style={{ gap: hp(1.5) }}>
                <Post post={firstPost} />

                {posts && posts.length > 0 && <Button
                    key="see-more"
                    style={{ backgroundColor: colors.primaryDeep, ...$styles.defaultShadow }}
                    tx="See More"
                    textPreset="bodyLargeBold"
                    onPress={() => goToShared("UserPostsList", { username } as any)}
                />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: hp(1.5)
    },
});