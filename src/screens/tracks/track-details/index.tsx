import { Screen } from "@/components";
import { colors, hp, wp } from "@/core";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TrackDescription } from "./_components/description";
import { dummyCompetitions } from "@/core/constants/dummy-competitions";
import { CommonHeader } from "@/components/common/common-header";
import { CompetitionsListComponent } from "@/screens/profile/_components/competitions-list-component";
import { UsersSmallIcons } from "@/components/common/users-small-icons";
import { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";
import { useGetTrackById } from "@/core/hooks/tracks/use-track-by-id";
import { useGetTrackEnrolledUsers } from "@/core/hooks/user/use-track-enrolled-users";
import { useGetCompetitionsByTrackId } from "@/core/hooks/competitions/use-competitions-by-track-id";

export const Track = () => {
    const route = useRoute<RouteProp<SharedStackParamList, "TrackDetails">>();
    const params = route.params;
    const track = useGetTrackById({ trackId: params.id }).data;
    const navigation = useNavigation();

    const { users } = useGetTrackEnrolledUsers({ trackId: params.id });
    const { competitions } = useGetCompetitionsByTrackId({ trackId: params.id });

    return (
        <>
            <CommonHeader titleTx={track?.name} navigation={navigation} />
            <Screen safeAreaEdges={["top"]} preset="scroll" style={[styles.container, { paddingTop: hp(8) }]}>

                <TrackDescription description={track?.description!} />

                <View style={{ paddingTop: hp(3), }}>
                    <CompetitionsListComponent
                        competitions={competitions?.map((comp) => ({
                            competitionId: comp.id,
                            competitionName: comp.name,
                            percentage: null, 
                            score: null,
                            completedAt: comp.endTime,
                            trackName: comp.trackName,
                        })) || []}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        // @ts-ignore: navigation type may not include shared routes directly
                        (navigation as any).navigate("TrackEnrolledUsers", {
                            trackId: params.id,
                            title: "Enrolled Users",
                        });
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            // @ts-ignore: navigation type may not include shared routes directly
                            (navigation as any).navigate("TrackEnrolledUsers", {
                                trackId: params.id,
                                title: "Enrolled Users",
                            });
                        }}
                    >
                        <UsersSmallIcons users={users?.flat() || []} />
                    </TouchableOpacity>
                </TouchableOpacity>
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
        gap: hp(1.5),
        paddingTop: hp(3),
    }
});