import { wp } from "@/core";
import { getRankColors, rankAvatars } from "@/core/helpers/ranks-info";
import { Rank } from "@/core/types/ranking";
import { StyleSheet, View } from "react-native"

export const RankAvatar = ({ userRank, style, size }: { userRank: Rank, style?: any, size?: number }) => {
    const Avatar = rankAvatars[userRank];
    const userRankColors = getRankColors(userRank);

    return (
        <View
            style={[styles.avatar, {
                borderColor: userRankColors.text,
                backgroundColor: userRankColors.bg,
                width: size ? wp(size) : wp(25),
                height: size ? wp(size) : wp(25),
            }, style]}
        >
            <Avatar height={size ? wp(size-5) : wp(20)} width={ size ? wp(size-5) : wp(20)} color={userRankColors.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: wp(15),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
    }
});