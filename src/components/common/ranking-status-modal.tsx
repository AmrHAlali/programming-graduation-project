import { Modal, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text } from "../ui";
import { useState, useEffect } from "react";
import { Rank, RankStatus } from "@/core/types/ranking";
import { colors, hp, imgRegistry, wp } from "@/core";
import { getRankColors } from "@/core/helpers/ranks-info";

interface Props {
    currentRank: Rank;
    previousRank: Rank | null;
    rankUpdateStatus: RankStatus;
    onClose?: () => void;
}

export const RankingStatusModal = ({ currentRank, previousRank, rankUpdateStatus, onClose }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const currentRankColors = getRankColors(currentRank);

    useEffect(() => {
        setIsVisible(!!rankUpdateStatus);
    }, [rankUpdateStatus]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const { title, subtitle } = (() => {
        switch (rankUpdateStatus) {
            case RankStatus.BEGINNER:
                return { title: 'Welcome!', subtitle: 'You have not started competing yet — join your first competition to earn a rank' };
            case RankStatus.UPGRADE:
                return { title: 'Congratulations!', subtitle: 'You have a new achievement' };
            case RankStatus.DOWNGRADE:
                return { title: "Don't worry", subtitle: 'Your rank decreased — keep competing to improve' };
            case RankStatus.SAME:
            default:
                return { title: 'Status Unchanged', subtitle: 'Your rank remains the same — keep up the good work' };
        }
    })();

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={[styles.backgroundOpacity, {

            }]}>
                <View
                    style={[styles.container, {
                        backgroundColor: currentRankColors.bg
                    }]}>
                    <Image
                        source={imgRegistry.profileDummy}
                        style={[styles.image, {
                            borderColor: currentRankColors.bg,
                        }]}
                    />
                    <Text
                        color={currentRankColors.text}
                        preset="headingMedium"
                        style={{ textAlign: 'center', marginTop: hp(1) }}
                    >
                        {title}
                    </Text>
                    <Text
                        color={currentRankColors.text}
                        preset="titleSmall"
                        style={{ textAlign: 'center' }}
                    >
                        {subtitle}
                    </Text>

                    <View style={styles.grayNoteContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: wp(2), marginBottom: hp(2) }}>
                            <View style={[styles.graySwatch, { backgroundColor: colors.neutrals.gray300 }]} />
                            <View style={[styles.graySwatch, { backgroundColor: colors.neutrals.gray400 }]} />
                            <View style={[styles.graySwatch, { backgroundColor: colors.neutrals.gray600 }]} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Text
                            preset="titleLargeBold"
                            color={currentRankColors.text}
                            style={{ marginTop: hp(1) }}
                        >
                            New Rank
                        </Text>
                        <Text
                            preset="headingLarge"
                            color={currentRankColors.bg}
                            style={{
                                backgroundColor: currentRankColors.text,
                                paddingHorizontal: wp(2),
                                paddingVertical: hp(0.5),
                                borderRadius: 8,
                                minWidth: wp(12),
                                textAlign: 'center'
                            }}
                        >
                            {currentRank}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={handleClose} accessibilityRole="button" accessibilityLabel="Close ranking modal" style={{ marginTop: hp(5), alignSelf: "flex-end", backgroundColor: currentRankColors.text, paddingHorizontal: wp(4), paddingVertical: hp(1), borderRadius: 8 }}>
                        <Text
                            color={currentRankColors.bg}
                            preset="titleSmallBold"
                        >
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        minWidth: 300,
        width: "90%",
        alignItems: 'center',
        shadowColor: colors.neutrals.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    backgroundOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    image: {
        width: wp(30),
        height: wp(30),
        borderRadius: wp(15),
        borderWidth: 7,
        alignSelf: 'center',
        marginTop: -hp(12),
        shadowColor: colors.neutrals.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    grayNoteContainer: {
        width: '100%',
        marginTop: hp(2),
        alignItems: 'center'
    },
    graySwatch: {
        width: wp(6),
        height: hp(1),
        borderRadius: 4,
        marginHorizontal: wp(1)
    },
    grayNoteText: {
        marginTop: hp(1),
        textAlign: 'center'
    }
});