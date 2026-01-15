import { Screen, Text } from "@/components";
import { CommonHeader } from "@/components/common/common-header";
import { colors, hp, lottieRegistry, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Divider } from "@/components/ui/divider";
import { UserItem } from "@/components/common/post/post-header";
import { Rank } from "@/core/types/ranking";
import type { getFollowersResponse } from "@api/routes/user-route";

type UsersListProps = {
    title: string;
    users?: getFollowersResponse[];
    isLoading?: boolean;
};

export const UsersList = ({ title, users, isLoading }: UsersListProps) => {
    return (
        <Screen style={styles.container} preset="scroll">
            <CommonHeader titleTx={title} />

            <View style={styles.content}>
                {!isLoading && (users?.length ?? 0) === 0 && (
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: hp(20) }}>
                        <Text
                            color={colors.primaryDark}
                            preset="bodyMedium"
                            style={{ textAlign: "center", marginBottom: hp(2) }}
                        >
                            No users found
                        </Text>

                        <LottieView
                            source={lottieRegistry.noDataFound}
                            style={{ width: wp(100), height: wp(20) }}
                            autoPlay
                            loop
                        />
                    </View>
                )}

                {users?.map((user, index) => (
                    <View key={user.username + index}>
                        <UserItem
                            userRank={Rank.Challenger}
                            username={user.username}
                            name={user.name}
                        />
                        {index < (users?.length ?? 0) - 1 && <Divider />}
                    </View>
                ))}
            </View>
        </Screen>
    );
};

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