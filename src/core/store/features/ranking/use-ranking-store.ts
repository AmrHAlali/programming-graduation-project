import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { Rank, RankStatus } from '@/core/types/ranking';
import { selectRankForStats } from '@/core/helpers/ranking-utils';

interface RankingState {
    currentRank: Rank;
    lastProcessedFriday: string | null;
    rankUpdateStatus: RankStatus | null;
    previousRank: Rank | null;

    // numberOfCompetitions: how many valid competitions
    // percentageScore: average score (e.g., 85 for 85%)
    checkRankUpdate: (numberOfCompetitions: number, percentageScore: number) => void;
    acknowledgeUpdate: () => void;
}

export const useRankingStore = create<RankingState>()(
    persist(
        (set, get) => ({
            currentRank: Rank.Iron,
            lastProcessedFriday: null,
            rankUpdateStatus: null,
            previousRank: null,

            checkRankUpdate: (numberOfCompetitions: number, percentageScore: number) => {
                const { lastProcessedFriday, currentRank } = get();
                console.log("--- Checking Rank Update ---");
                console.log("Current Rank:", currentRank);
                console.log("Last Processed Friday:", lastProcessedFriday);

                const now = dayjs();

                // precise Friday calculation:
                // If today is Friday, we consider it "the Friday".
                // If today is after Friday (Sat), we consider the past Friday.
                // If today is before Friday (Thu), we consider *last week's* Friday.
                // Essentially: Most recent Friday at or before today.
                let relevantFriday = now;
                if (now.day() >= 5) {
                    relevantFriday = now.day(5).startOf('day');
                } else {
                    relevantFriday = now.subtract(1, 'week').day(5).startOf('day');
                }

                const relevantFridayIso = relevantFriday.toISOString();
                console.log("Relevant Friday (Calculated):", relevantFridayIso);


                // If we already processed this Friday, skip
                if (lastProcessedFriday && dayjs(lastProcessedFriday).isSame(relevantFriday, 'day')) {
                    console.log("Skipping: Already processed this Friday.");
                    return;
                }


                // Also if lastProcessedFriday is somehow in the future relative to relevant (shouldn't happen), skip
                if (lastProcessedFriday && dayjs(lastProcessedFriday).isAfter(relevantFriday)) {
                    return;
                }

                // --- Execute Rank Update Logic ---

                // The caller provides the stats to avoid passing the full competitions array.
                // numberOfCompetitions: count of competitions with valid scores
                // percentageScore: average score (e.g., 85 for 85%)
                console.log(`Stats (from caller): ${numberOfCompetitions} comps, ${percentageScore}% score`);

                // If the user hasn't started any competitions, set BEGINNER status and record this Friday
                if (numberOfCompetitions === 0) {
                    console.log("User has no competitions yet — setting status to BEGINNER.");
                    set({
                        currentRank: currentRank,
                        lastProcessedFriday: relevantFridayIso,
                        rankUpdateStatus: RankStatus.BEGINNER,
                        previousRank: null,
                    });
                    return;
                }


                // Delegate rank selection logic to helper
                const { newRank, status } = selectRankForStats(numberOfCompetitions, percentageScore, currentRank);

                // Even if status is SAME, we mark it as checked for this Friday
                console.log(`Result: New Rank: ${newRank}, Status: ${status}`);

                set({
                    currentRank: newRank,
                    lastProcessedFriday: relevantFridayIso,
                    rankUpdateStatus: status,
                    previousRank: currentRank,
                });
            },

            acknowledgeUpdate: () => {
                set({ rankUpdateStatus: null, previousRank: null });
            },
        }),
        {
            name: 'ranking-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
