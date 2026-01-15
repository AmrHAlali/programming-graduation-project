import { Button, ButtonProps } from "@/components";
import { colors, CompetitionStatus, hp, useUserStore } from "@/core";
import { useEnrollInCompetition } from "@/core/hooks/competitions/use-enroll-in-competition";
import { useGetCompetitionEnrolledUsers } from "@/core/hooks/user/use-competition-enrolled-users";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { View } from "react-native";

interface CompetitionEnrollmentButtonProps extends ButtonProps {
    status?: "UPCOMING" | "ACTIVE" | "ENDED";
    competitionId: number;
}

export const CompetitionEnrollmentButton = ({ status, competitionId, ...props }: CompetitionEnrollmentButtonProps) => {
    const { enrollInCompetition, isPending } = useEnrollInCompetition();
    const username = useUserStore((state) => state.authDetails?.username);
    const { users } = useGetCompetitionEnrolledUsers({ competitionId });

    const flatUsers = users?.flat() ?? [];
    const isEnrolled = !!(username && flatUsers.some((user) => user.username === username));

    const buttonInfo = {
        [CompetitionStatus.UPCOMING]: {
            label: "Coming Soon",
            backgroundColor: colors.neutrals.gray700,
            pressedBackgroundColor: colors.neutrals.gray700,
            disabled: true,
            onPress: () => {},
        },
        [CompetitionStatus.ACTIVE]: isEnrolled
            ? {
                label: "Join Competition",
                backgroundColor: colors.primary,
                pressedBackgroundColor: colors.primary,
                disabled: false,
                onPress: () => {
                    goToShared("AttemptingCompetition", { id: competitionId });
                },
            }
            : {
                label: "Enroll",
                backgroundColor: colors.primary,
                pressedBackgroundColor: colors.primary,
                disabled: isPending,
                onPress: async () => {
                    if (!username || isEnrolled) {
                        return;
                    }

                    await enrollInCompetition({
                        competitionId,
                        username,
                    });
                },
            },
        [CompetitionStatus.ENDED]: {
            label: "No Longer Available",
            backgroundColor: colors.neutrals.gray700,
            pressedBackgroundColor: colors.neutrals.gray700,
            disabled: true,
            onPress: () => { },
        },
    }

    const config =
        (status && buttonInfo[status as CompetitionStatus])
            ? buttonInfo[status as CompetitionStatus]
            : buttonInfo[CompetitionStatus.UPCOMING];

    return (
        <View
            style={{
                marginTop: hp(2),
            }}
        >
            <Button
                {...props}
                tx={config.label}
                style={[
                    { backgroundColor: config.backgroundColor },
                    props.style
                ]}
                pressedStyle={[
                    { backgroundColor: config.pressedBackgroundColor },
                    props.pressedStyle
                ]}
                disabled={config.disabled}
                onPress={async () => {
                    await config.onPress();
                    props.onPress?.({} as any); // Call passed onPress if any
                }}
            />
        </View>
    );
}
