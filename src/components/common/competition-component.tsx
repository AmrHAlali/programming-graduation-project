import { Text } from "@/components";
import { colors, getTrackById, hp, wp, Competition, $styles, CompetitionStatus, formatDate } from "@/core";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { CompetitionEnrollmentButton } from "@/screens/competitions/competition-details/_components/competition-enrollment-button";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type CompetitionComponentProps = {
    competition: Competition;
    future?: boolean;
};

export const CompetitionComponent = ({ competition, future, bannerMode }: CompetitionComponentProps & { bannerMode?: boolean }) => {
    // const trackInfo = getTrackById(competition.trackId);
    // const trackBackgroundColor = trackInfo?.backgroundColor || colors.neutrals.gray500;
    // const textColor = trackInfo?.textColor || colors.neutrals.white;

    return (
        <TouchableOpacity
            key={competition.competitionId}
            activeOpacity={.4}
            style={[styles.container, bannerMode && styles.bannerContainer]}
            onPress={() => {
                goToShared("CompetitionDetails", { id: competition.competitionId })
            }}
        >
            <View
                key={competition.competitionId}
                style={[styles.content, { backgroundColor: colorWithOpacity(colors.tracks.devops /*trackBackgroundColor*/, 0.5) }]}
            >
                <View style={[styles.trackTag, { backgroundColor: colors.tracks.devops /*trackBackgroundColor*/ }]} />

                {/* Text container with flexShrink to prevent overflow */}
                <View style={styles.textContainer}>
                    <Text
                        preset="bodyLargeBold"
                        style={styles.titleText}
                        color={/*textColor*/ colors.neutrals.white}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {competition.competitionName}
                    </Text>

                    <Text
                        style={styles.descriptionText}
                        preset="bodySmall"
                        color={/*textColor*/ colors.neutrals.white}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {competition.trackName || competition.competitionName}
                    </Text>

                    <Text
                        preset="bodySmall"
                        style={styles.dateText}
                        color={/*textColor*/ colors.neutrals.gray100}
                    >
                        {formatDate(competition.completedAt)}
                    </Text>

                    {future && <View
                        style={{
                            paddingEnd: wp(2),
                            marginTop: "auto",
                        }}
                    >
                        <CompetitionEnrollmentButton
                            status={CompetitionStatus.UPCOMING}
                            competitionId={competition.competitionId}
                            preset="secondary"
                            textPreset="bodyLargeBold"
                            style={{
                                maxWidth: "90%",
                            }}
                        />
                    </View>}
                </View>

                {competition.score && <View style={styles.scoreContainer}>
                    <Text
                        preset="bodyMediumBold"
                        style={styles.scoreText}
                        color={/*textColor*/ colors.neutrals.white}
                    >
                        {competition.score + "%"}
                    </Text>
                </View>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutrals.gray500,
        borderRadius: 12,
        ...$styles.defaultShadow,
    },
    bannerContainer: {
        minHeight: hp(27),
    },
    content: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        gap: wp(2),
        borderRadius: 12,
    },
    trackTag: {
        height: "100%",
        width: wp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    textContainer: {
        flex: 1,
        paddingVertical: hp(1.5),
        flexShrink: 1,
        gap: hp(0.5),
    },
    titleText: {
        fontSize: hp(2.2),
        lineHeight: hp(2.8),
    },
    descriptionText: {
        flexWrap: "wrap",
        flexShrink: 1,
        paddingEnd: wp(2),
        fontSize: hp(1.7),
        lineHeight: hp(2.3),
    },
    dateText: {
        fontSize: hp(1.5),
        lineHeight: hp(2),
        opacity: 0.9,
    },
    scoreContainer: {
        flexShrink: 0,
        justifyContent: "center",
        alignItems: "flex-end",
        alignSelf: "stretch",
        paddingHorizontal: wp(5),
        minWidth: 40,
        backgroundColor: colorWithOpacity(colors.neutrals.black, 0.15),
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    scoreText: {
        fontSize: hp(1.9),
        lineHeight: hp(2.3),
    },
});
