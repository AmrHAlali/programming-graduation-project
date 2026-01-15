import { CommonHeader } from "@/components/common/common-header";
import { Screen } from "@/components";
import { StyleSheet, View } from "react-native";
import { colors, hp, wp } from "@/core";
import { dummyCompetitions } from "@/core/constants/dummy-competitions";
import { CompetitionsListComponent } from "@/screens/profile/_components/competitions-list-component";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CompetitionsStackParamList } from "@/screens/navigation/competitions-stack-navigator";
import { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";

export const CompetitionsListScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<SharedStackParamList, "CompetitionsList">>();
    const params = route.params;

    return (
        <>
            <CommonHeader titleTx="Competitions" navigation={navigation} />
            <Screen preset="scroll" style={styles.container}>
                <View style={[styles.content]}>
                    <CompetitionsListComponent competitions={params.competitions || dummyCompetitions} showFullList />
                </View>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(4),
        paddingBottom: hp(10),
        marginTop: hp(10),
    }
});
