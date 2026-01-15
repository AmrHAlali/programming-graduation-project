import { Screen, Text } from "@/components";
import { colors, CompetitionStatus, formatDate, hp, timeFormat, wp } from "@/core";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CompetitionDescription } from "./_components/competition-description";
import { CommonHeader } from "@/components/common/common-header";
import { CompetitionsStackNavigationProp } from "@/screens/navigation/competitions-stack-navigator";
import { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";
import { CompetitionEnrollmentButton } from "./_components/competition-enrollment-button";
import { useGetCompetitionById } from "@/core/hooks/competitions/use-competition-by-id";
import { UsersSmallIcons } from "@/components/common/users-small-icons";
import { useGetCompetitionEnrolledUsers } from "@/core/hooks/user/use-competition-enrolled-users";

export const Competition = () => {
    const route = useRoute<RouteProp<SharedStackParamList, "CompetitionDetails">>();
    const params = route.params;
    const navigation = useNavigation<CompetitionsStackNavigationProp>();

    const { competition } = useGetCompetitionById({ id: params.id });
    const { users } = useGetCompetitionEnrolledUsers({ competitionId: params.id });

    return (
        <>
            <CommonHeader titleTx="Competition" navigation={navigation} />
            <Screen safeAreaEdges={["top"]} preset="scroll" style={styles.container}>
                <Text
                    color={colors.primaryDeep}
                    preset="headingSmallBold"
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {competition?.name}
                </Text>

                <Text
                    color={colors.primaryDeep}
                    preset="titleMediumBold"
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {`${formatDate(competition?.startTime!)}, ${timeFormat(competition?.startTime!)}`}
                </Text>
                <Text
                    color={colors.primaryDeep}
                    preset="titleMediumBold"
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {`${formatDate(competition?.endTime!)}, ${timeFormat(competition?.endTime!)}`}
                </Text>

                <CompetitionDescription
                    trackId={competition?.trackId!}
                    description={competition?.description!}
                />

                <CompetitionEnrollmentButton
                    status={competition?.status as "UPCOMING" | "ACTIVE" | "ENDED"}
                    competitionId={params.id}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        // @ts-ignore: navigation type may not include shared routes directly
                        (navigation as any).navigate("CompetitionEnrolledUsers", {
                            competitionId: params.id,
                            title: "Enrolled Users",
                        });
                    }}
                >
                    <UsersSmallIcons users={users?.flat() || []} />
                </TouchableOpacity>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(1.5),
        paddingTop: hp(3),
    }
});