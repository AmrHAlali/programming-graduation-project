import { Post } from "@/components/common/post";
import { hp, wp } from "@/core";
import { PostType } from "@/core/types/post";
import { FlatList, StyleSheet } from "react-native";

export const PostsList = ({ posts }: { posts: PostType[] }) => {
    return (
        <FlatList
            style={{ paddingHorizontal: wp(5) }}
            data={posts ?? []}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        gap: hp(1),
		paddingBottom: hp(30),
        // marginTop: hp(10),
    }
});