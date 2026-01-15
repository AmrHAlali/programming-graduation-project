import { Rank, RankStatus } from '@/core/types/ranking';
import { RANK_RULES, RANK_ORDER } from '@/core/constants/ranking';

export interface RankDecision {
    newRank: Rank;
    status: RankStatus;
}

/**
 * Determine the appropriate new rank and status for a user given their
 * number of competitions and average percentage score.
 *
 * - numberOfCompetitions: count of competitions with valid scores
 * - percentageScore: average percentage (e.g., 85 for 85%)
 * - currentRank: current rank of the user (used to compute upgrade/downgrade)
 */
export function selectRankForStats(
    numberOfCompetitions: number,
    percentageScore: number,
    currentRank: Rank
): RankDecision {
    // If the user hasn't started any competitions, mark as BEGINNER and keep current rank
    if (numberOfCompetitions === 0) {
        return { newRank: currentRank, status: RankStatus.BEGINNER };
    }

    // Find highest eligible rank (RANK_ORDER is sorted from highest to lowest)
    let bestEligibleRank = Rank.Iron;
    for (const rank of RANK_ORDER) {
        const rules = RANK_RULES[rank];
        if (numberOfCompetitions >= rules.minCompetitions && percentageScore >= rules.minPercentage) {
            bestEligibleRank = rank;
            break;
        }
    }

    const currentRankIndex = RANK_ORDER.indexOf(currentRank);
    const bestEligibleIndex = RANK_ORDER.indexOf(bestEligibleRank);

    // If user qualifies for a higher rank
    if (bestEligibleIndex < currentRankIndex) {
        return { newRank: bestEligibleRank, status: RankStatus.UPGRADE };
    }

    // Check for demotion: demote by one level if below demoteThreshold and not Iron
    if (currentRank !== Rank.Iron) {
        const currentRules = RANK_RULES[currentRank];
        if (percentageScore < currentRules.demoteThreshold) {
            const nextLowerIndex = currentRankIndex + 1;
            if (nextLowerIndex < RANK_ORDER.length) {
                return { newRank: RANK_ORDER[nextLowerIndex], status: RankStatus.DOWNGRADE };
            }
        }
    }

    // Otherwise, same
    return { newRank: currentRank, status: RankStatus.SAME };
}

/**
 * Select a user's rank based only on their stats (ignores previous/current rank).
 * - numberOfCompetitions: count of competitions with valid scores
 * - percentageScore: average percentage (e.g., 85 for 85%)
 *
 * Returns the best matching rank. If numberOfCompetitions === 0, returns BEGINNER
 * with `Rank.Iron` as the default displayed rank.
 */
export function selectRankByStats(numberOfCompetitions: number, percentageScore: number): RankDecision {
    if (numberOfCompetitions === 0) {
        return { newRank: Rank.Iron, status: RankStatus.BEGINNER };
    }

    let bestEligibleRank = Rank.Iron;
    for (const rank of RANK_ORDER) {
        const rules = RANK_RULES[rank];
        if (numberOfCompetitions >= rules.minCompetitions && percentageScore >= rules.minPercentage) {
            bestEligibleRank = rank;
            break;
        }
    }

    return { newRank: bestEligibleRank, status: RankStatus.SAME };
}
