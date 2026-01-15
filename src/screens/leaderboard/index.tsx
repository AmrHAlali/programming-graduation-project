import { useMemo } from "react";
import { Screen, Text } from "@/components";
import { CommonHeader } from "@/components/common/common-header";
import { UserItem } from "@/components/common/post/post-header";
import { colors, hp, lottieRegistry, useUserStore, wp } from "@/core";
import { selectRankForStats } from "@/core/helpers/ranking-utils";
import { Rank, rankHierarchy } from "@/core/types/ranking";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Divider } from "@/components/ui/divider";
import { useGetFollowing } from "@/core/hooks/user/use-following";

export interface UserWithRank {
    username: string;
    name: string;
    numberOfCompetitions: number;
    percentageScore: number;
    rank: Rank;
}

const getUserRank = (numberOfCompetitions: number, percentageScore: number): Rank => {
    return selectRankForStats(numberOfCompetitions, percentageScore, Rank.Iron).newRank;
};

const sortUsersByRank = (users: any[]): UserWithRank[] => {
    return users
        .map(user => ({
            ...user,
            rank: getUserRank(user.numberOfCompetitions, user.percentageScore),
        }))
        .sort((a, b) => rankHierarchy[b.rank] - rankHierarchy[a.rank]);
};

const UserRowItem = ({ user, index }: { user: UserWithRank; index: number }) => (
    <UserItem
        rankOrder={index + 1}
        userRank={user.rank}
        {...user}
    />
);

export const LeaderboardScreen = () => {
    const username = useUserStore((state) => state.authDetails?.username);
    const { users = [], isLoading } = useGetFollowing({ username: username! });

    const mappedUsers = useMemo(
        () =>
            users.map((user) => ({
                username: user.username,
                name: user.name,
                // Use backend stats for ranking
                numberOfCompetitions: user.competitionsCompleted ?? 0,
                percentageScore: user.overallPercentage ?? 0,
                // temporary rank, will be recalculated in sortUsersByRank
                rank: Rank.Iron,
            })),
        [users]
    );

    const sortedUsers = useMemo(() => sortUsersByRank(mappedUsers), [mappedUsers]);

    return (
        <Screen style={styles.container} preset="scroll">
            <CommonHeader titleTx="Scoreboard Screen" />

            <View style={styles.content}>
                {!isLoading && sortedUsers.length === 0 && <View style={{ alignItems: "center", justifyContent: "center", marginTop: hp(20) }}>
                    <Text
                        color={colors.primaryDark}
                        preset="bodyMedium"
                        style={{ textAlign: "center", marginBottom: hp(2) }}
                    >
                        No users found
                    </Text>

                    <LottieView source={lottieRegistry.noDataFound} style={{ width: wp(100), height: wp(20), }} autoPlay loop />
                </View>}
                {sortedUsers.map((user, index) => (
                    <>
                        <UserRowItem key={user.username} user={user} index={index} />
                        {index < sortedUsers.length - 1 && <Divider />}
                    </>
                ))}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutrals.white,
        flexGrow: 1,
    },
    content: {
        marginTop: hp(14),
        alignContent: "center",
        gap: hp(0.5),
        paddingBottom: hp(5),
        paddingHorizontal: wp(5),
    },
});


// import { Fragment, useMemo } from "react";
// import { Screen, Text } from "@/components";
// import { CommonHeader } from "@/components/common/common-header";
// import { UserItem } from "@/components/common/post/post-header";
// import { colors, hp, lottieRegistry, useUserStore, wp } from "@/core";
// import { selectRankForStats } from "@/core/helpers/ranking-utils";
// import { Rank, rankHierarchy } from "@/core/types/ranking";
// import { StyleSheet, View } from "react-native";
// import LottieView from "lottie-react-native";
// import { Divider } from "@/components/ui/divider";
// import { useGetFollowing } from "@/core/hooks/user/use-following";

// export interface UserWithRank {
//     username: string;
//     name: string;
//     numberOfCompetitions: number;
//     percentageScore: number;
//     rank: Rank;
// }

// const getUserRank = (numberOfCompetitions: number, percentageScore: number): Rank => {
//     return selectRankForStats(numberOfCompetitions, percentageScore, Rank.Iron).newRank;
// };

// const sortUsersByRank = (users: any[]): UserWithRank[] => {
//     return users
//         .map((user): UserWithRank => ({
//             ...user,
//             rank: getUserRank(user.numberOfCompetitions, user.percentageScore),
//         }))
//         .sort((a, b) => rankHierarchy[b.rank] - rankHierarchy[a.rank]);
// };

// const UserRowItem = ({ user, index }: { user: UserWithRank; index: number }) => (
//     <UserItem
//         rankOrder={index + 1}
//         userRank={user.rank}
//         {...user}
//     />
// );

// export const LeaderboardScreen = () => {
//     const username = useUserStore((state) => state.authDetails?.username);
//     const { users = [], isLoading } = useGetFollowing({ username: username! });

//     const mappedUsers = useMemo(
//         () =>
//             users.map((user) => ({
//                 username: user.username,
//                 name: user.name,
//                 // Fallbacks until backend provides real stats
//                 numberOfCompetitions: 0, // TODO user.numberOfCompetitions ?? 0,
//                 percentageScore: user.totalScore ?? 0,
//                 // temporary rank, will be recalculated in sortUsersByRank
//                 rank: Rank.Iron,
//             })),
//         [users]
//     );

//     const sortedUsers = useMemo(() => sortUsersByRank(mappedUsers), [mappedUsers]);

//     return (
//         <Screen style={styles.container} preset="scroll">
//             <CommonHeader titleTx="Scoreboard Screen" />

//             <View style={styles.content}>
//                 {!isLoading && sortedUsers.length === 0 && <View style={{ alignItems: "center", justifyContent: "center", marginTop: hp(20) }}>
//                     <Text
//                         color={colors.primaryDark}
//                         preset="bodyMedium"
//                         style={{ textAlign: "center", marginBottom: hp(2) }}
//                     >
//                         No users found
//                     </Text>

//                     <LottieView source={lottieRegistry.noDataFound} style={{ width: wp(100), height: wp(20), }} autoPlay loop />
//                 </View>}
//                 {sortedUsers.map((user, index) => (
//                     <Fragment key={user.username}>
//                         <UserRowItem user={user} index={index} />
//                         {index < sortedUsers.length - 1 && <Divider />}
//                     </Fragment>
//                 ))}
//             </View>
//         </Screen>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: colors.neutrals.white,
//         flexGrow: 1,
//     },
//     content: {
//         marginTop: hp(14),
//         alignContent: "center",
//         gap: hp(0.5),
//         paddingBottom: hp(5),
//         paddingHorizontal: wp(5),
//     },
// });