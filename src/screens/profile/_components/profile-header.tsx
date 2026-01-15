import { Text } from "@/components";
import { RankAvatar } from "@/components/common/rank-avatar";
import { colors, hp, useRankingStore, } from "@/core";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProfileHeader = ({ name, userName }: { name: string, userName: string }) => {
    const userRank = useRankingStore(state => state.currentRank);

    return (
        <View style={[styles.container, {
            paddingTop: useSafeAreaInsets().top
        }]}>
            <RankAvatar size={20} userRank={userRank} />

            <View>
                <Text
                    color={colors.neutrals.black}
                    preset="headingSmallBold"
                >
                    {name}
                </Text>

                <Text
                    color={colors.neutrals.black}
                    preset="titleMediumBold"
                >
                    {`@${userName}`}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: hp(1.5),
        flexDirection: "row",
    }
});