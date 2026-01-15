import { colors, hp, rf, wp } from "@/core";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonHeader } from "@/components/common/common-header";
import { useGetAllPosts } from "@/core/hooks/posts/use-all-posts";
import { PostsList } from "./_components/posts-list";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { Icon } from "@/components/ui";

export const Home = () => {
    const { posts, isLoading } = useGetAllPosts();
    const insets = useSafeAreaInsets();

    return (
        <>
            <CommonHeader titleTx="Home" />

            <View style={styles.container}>
                <PostsList posts={posts ?? []} />
            </View>
            <TouchableOpacity
                style={[styles.fab, { bottom: insets.bottom + hp(10) }]}
                onPress={() => goToShared("AddPost")}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Add post"
            >
                <Icon icon="plus" size={rf(26)} color={colors.neutrals.white} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(13),
        backgroundColor: colors.background,
    },
    fab: {
        position: "absolute",
        right: wp(5),
        bottom: hp(4),
        backgroundColor: colors.primary,
        borderRadius: rf(32),
        padding: hp(2),
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: colors.neutrals.black,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

// import { Screen, Text } from "@/components";
// import { colors, hp, rf, wp } from "@/core";
// import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
// import { CommonHeader } from "@/components/common/common-header";
// import { useGetAllPosts } from "@/core/hooks/posts/use-all-posts";
// import { PostsList } from "./_components/posts-list";
// import { goToShared } from "@/screens/navigation/shared-navigation";
// import { Icon } from "@/components/ui";

// export const Home = () => {
//     const { posts, isLoading, isError } = useGetAllPosts();

//     return (
//         <View style={styles.root}>
//             <CommonHeader titleTx="Home" />

//             <Screen preset="fixed" style={styles.container}>
//                 {isLoading && (
//                     <View style={styles.loaderContainer}>
//                         <ActivityIndicator size="large" color={colors.primary} />
//                     </View>
//                 )}

//                 {!isLoading && isError && (
//                     <View style={styles.loaderContainer}>
//                         <Text preset="bodyMedium" color={colors.neutrals.gray700}>
//                             Failed to load posts. Please try again.
//                         </Text>
//                     </View>
//                 )}

//                 {!isLoading && !isError && (
//                     <PostsList posts={posts ?? []} />
//                 )}
//             </Screen>

//             <TouchableOpacity
//                 style={styles.fab}
//                 onPress={() => goToShared("AddPost")}
//                 activeOpacity={0.7}
//                 accessibilityRole="button"
//                 accessibilityLabel="Add post"
//             >
//                 <Icon icon="plus" size={rf(26)} color={colors.neutrals.white} />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     container: {
//         flex: 1,
//         paddingTop: hp(3),
//         backgroundColor: colors.background,
//     },
//     loaderContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     fab: {
//         position: "absolute",
//         right: wp(5),
//         bottom: hp(12),
//         backgroundColor: colors.primary,
//         borderRadius: rf(32),
//         padding: hp(2),
//         justifyContent: "center",
//         alignItems: "center",
//         elevation: 6,
//         shadowColor: colors.neutrals.black,
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//     },
// });
