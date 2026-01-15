import { Screen } from "@/components";
import { CommonHeader } from "@/components/common/common-header";
import { colors, hp, wp } from "@/core";
import { useGetUserPosts } from "@/core/hooks/posts/use-user-posts";
import { PostsList } from "@/screens/home/main/_components/posts-list";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";

export const UserPostsListScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<SharedStackParamList, "UserPostsList">>();
    const { username } = route.params;

    const { posts, isLoading } = useGetUserPosts({ username });

    return (
        <>
            <CommonHeader titleTx="Posts" navigation={navigation} />
            <Screen preset="fixed" style={styles.container}>
                <PostsList posts={posts ?? []} />
            </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(13),
        backgroundColor: colors.background,
    },
});
