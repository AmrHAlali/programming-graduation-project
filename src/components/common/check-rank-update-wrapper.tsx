import { useRankingStore } from "@/core";
import { useEffect } from "react";
import { RankingStatusModal } from "./ranking-status-modal";
import { StyleSheet } from 'react-native';
import { useGetUserProfile } from "@/core/hooks/user/use-user-profile";
import { useUserStore } from "@/core";

export const CheckRankUpdateWrapper = ({ children }: { children: React.ReactNode }) => {
    const previousRank = useRankingStore((state) => state.previousRank);
    const checkRankUpdate = useRankingStore((state) => state.checkRankUpdate);
    const rankUpdateStatus = useRankingStore((state) => state.rankUpdateStatus);
    const currentRank = useRankingStore((state) => state.currentRank);
    const acknowledgeUpdate = useRankingStore((state) => state.acknowledgeUpdate);
    const username = useUserStore((state) => state.authDetails?.username);
    const { userProfile } = useGetUserProfile(username);

    useEffect(() => {
        if (!userProfile) return;

        // Use real backend stats from the user profile
        const numberOfCompetitions = userProfile.competitionsCompleted ?? 0;
        const percentageScore = userProfile.overallPercentage ?? 0;

        checkRankUpdate(numberOfCompetitions, percentageScore);
    }, [userProfile, checkRankUpdate]);
    // Modal is rendered in the component JSX below; we should not call acknowledgeUpdate here (it would clear the update before the user sees it).
    useEffect(() => {
        // no-op: kept to observe changes if needed later
    }, [rankUpdateStatus, currentRank]);

    return (
        <>
            {children}
            {rankUpdateStatus && (
                <RankingStatusModal
                    currentRank={currentRank}
                    previousRank={previousRank}
                    rankUpdateStatus={rankUpdateStatus}
                    onClose={acknowledgeUpdate}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
});