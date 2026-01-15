import { Rank, RankData } from "@/core/types/ranking";

export const RANK_RULES: Record<Rank, RankData> = {
    [Rank.Challenger]: {
        minCompetitions: 100,
        minPercentage: 95,
        demoteThreshold: 90,
    },
    [Rank.Grandmaster]: {
        minCompetitions: 80,
        minPercentage: 90,
        demoteThreshold: 85,
    },
    [Rank.Master]: {
        minCompetitions: 60,
        minPercentage: 85,
        demoteThreshold: 80,
    },
    [Rank.Diamond]: {
        minCompetitions: 50,
        minPercentage: 80,
        demoteThreshold: 75,
    },
    [Rank.Emerald]: {
        minCompetitions: 40,
        minPercentage: 75,
        demoteThreshold: 70,
    },
    [Rank.Platinum]: {
        minCompetitions: 30,
        minPercentage: 70,
        demoteThreshold: 65,
    },
    [Rank.Gold]: {
        minCompetitions: 20,
        minPercentage: 60,
        demoteThreshold: 55,
    },
    [Rank.Silver]: {
        minCompetitions: 10,
        minPercentage: 50,
        demoteThreshold: 45,
    },
    [Rank.Bronze]: {
        minCompetitions: 5,
        minPercentage: 40,
        demoteThreshold: 35,
    },
    [Rank.Iron]: {
        minCompetitions: 0,
        minPercentage: 0,
        demoteThreshold: 0,
    },
};

// Ordered from highest to lowest for evaluation
export const RANK_ORDER = [
    Rank.Challenger,
    Rank.Grandmaster,
    Rank.Master,
    Rank.Diamond,
    Rank.Emerald,
    Rank.Platinum,
    Rank.Gold,
    Rank.Silver,
    Rank.Bronze,
    Rank.Iron,
];
