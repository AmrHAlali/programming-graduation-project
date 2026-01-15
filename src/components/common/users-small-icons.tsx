import { colors, hp, wp, imgRegistry } from "@/core";
import { getUserProfileResponse } from "@/services/api/routes/user-route";
import { View, Image, StyleSheet, Text } from "react-native";

export const UsersSmallIcons = ({ users }: { users?: getUserProfileResponse[] }) => {
    const dummyImage = imgRegistry.profileDummy;
    const numOfUsers = users?.length ?? 0;

    const avatarSize = wp(10);
    const overlap = wp(6);

    const maxVisibleSlots = 3;
    const hasExtraUsers = numOfUsers > maxVisibleSlots;

    const visibleSlots = numOfUsers === 0 ? 1 : Math.min(numOfUsers, maxVisibleSlots);
    const realAvatarsCount = hasExtraUsers ? maxVisibleSlots - 1 : visibleSlots;
    const extraCount = hasExtraUsers ? numOfUsers - realAvatarsCount : 0;

    const containerWidth =
        visibleSlots > 0 ? avatarSize + overlap * (visibleSlots - 1) : avatarSize;

    return (
        <View style={[styles.container, { width: containerWidth }]}>
            {Array.from({ length: realAvatarsCount }).map((_, index) => (
                <Image
                    key={index}
                    source={dummyImage}
                    style={[
                        styles.avatar,
                        {
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                            left: index * overlap,
                        },
                    ]}
                />
            ))}

            {hasExtraUsers && (
                <View
                    style={[
                        styles.avatar,
                        styles.extraAvatar,
                        {
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                            left: (maxVisibleSlots - 1) * overlap,
                        },
                    ]}
                >
                    <Text style={styles.extraText}>{`+${extraCount}`}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(6),
        alignSelf: "center",
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(3),
    },
    avatar: {
        position: "absolute",
        borderWidth: wp(0.5),
        borderColor: colors.primaryDeep,
    },
    extraAvatar: {
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    extraText: {
        color: colors.neutrals.white,
        fontWeight: "600",
        fontSize: wp(3.2),
    },
});
