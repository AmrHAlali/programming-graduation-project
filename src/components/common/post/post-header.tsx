import { Rank } from "@/core/types/ranking";
import { RankAvatar } from "../rank-avatar";
import { colors, hp, wp } from "@/core";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui";
import { toOrdinal } from "@/core/helpers/ordinal";
import { goToShared } from "@/screens/navigation/shared-navigation";

type Props = {
    userRank: Rank,
    username?: string,
    name?: string,
    rankOrder?: number,
}

export const UserItem = ({ userRank, username = "johndoe", name = "John Doe", rankOrder }: Props) => {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.userInfo}
                onPress={() => username && goToShared("UserProfile", { username } as any)}
            >
                <RankAvatar
                    userRank={userRank}
                    size={12}
                />

                <View style={styles.userName}>
                    <Text
                        color={colors.neutrals.black}
                        preset="titleMediumBold"
                    >
                        {name}
                    </Text>

                    <Text
                        color={colors.neutrals.gray650}
                        preset="bodySmall"
                        style={{ marginTop: -hp(0.25) }}
                    >
                        {`@${username}`}
                    </Text>
                </View>
            </TouchableOpacity>

            {rankOrder && <Text preset="bodyMediumBold" color={colors.primaryDeep} style={styles.orderRank}>
                {toOrdinal(rankOrder)}
            </Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingEnd: wp(4),
        gap: wp(5),
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2),
    },
    userName: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    tracksContainer: {
        flexShrink: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: wp(1),
        flex: 1,
    },
    orderRank: {
        position: "absolute",
        left: wp(75),
    }
});
