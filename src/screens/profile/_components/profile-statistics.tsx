import { colors, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { StatisticsField } from "./statistics-field";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "@/screens/navigation/profile-stack-navigator";

export const ProfileStatistics = ({ totalScore, followers, following, username }: { totalScore: number, followers: number, following: number, username: string }) => {
    const navigation = useNavigation<ProfileStackNavigationProp>();

    return (
        <View style={styles.container}>
            <StatisticsField
                label={"Total Score %"}
                value={totalScore}
            />

            <View style={styles.divider} />

            <StatisticsField
                label={"Followers"}
                value={followers}
                onPress={() => {
                    navigation.navigate("FollowersList", { username, title: "Followers" });
                }}
            />

            <View style={styles.divider} />

            <StatisticsField
                label={"Following"}
                value={following}
                onPress={() => {
                    navigation.navigate("FollowingList", { username, title: "Following" });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: wp(6),
        justifyContent: "center",
        flexDirection: "row",
    },
    divider: {
        alignSelf: "center",
        height: "70%",
        width: 1,
        backgroundColor: colors.neutrals.gray600
    }
});