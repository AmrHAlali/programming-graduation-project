import { Screen } from "@/components";
import { colors, hp, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { NextCompetitionBanner } from "../../competitions/main/_components/next-competition-banner";
import { CommonHeader } from "@/components/common/common-header";
import { AnnouncementsList } from "./_components/announcements-list";
import { MasterNewSkills } from "./_components/master-new-skills";

export const Main = () => {
    return (
        <>
            <CommonHeader titleTx="Competitions" />
            <Screen preset="scroll" style={styles.container}>
                <NextCompetitionBanner />
                
                <View style={[styles.content]}>
                    <MasterNewSkills />

                    <AnnouncementsList />
                </View>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(13),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(2),
        paddingBottom: hp(30),
        
        paddingHorizontal: wp(5),
    }
});