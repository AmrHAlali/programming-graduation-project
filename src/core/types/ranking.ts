export enum Rank {
    Iron = 'Iron',
    Bronze = 'Bronze',
    Silver = 'Silver',
    Gold = 'Gold',
    Platinum = 'Platinum',
    Emerald = 'Emerald',
    Diamond = 'Diamond',
    Master = 'Master',
    Grandmaster = 'Grandmaster',
    Challenger = 'Challenger',
}

export const rankHierarchy: Record<Rank, number> = {
    [Rank.Iron]: 1,
    [Rank.Bronze]: 2,
    [Rank.Silver]: 3,
    [Rank.Gold]: 4,
    [Rank.Platinum]: 5,
    [Rank.Emerald]: 6,
    [Rank.Diamond]: 7,
    [Rank.Master]: 8,
    [Rank.Grandmaster]: 9,
    [Rank.Challenger]: 10,
};

export enum RankStatus {
    BEGINNER = 'BEGINNER',
    SAME = 'SAME',
    UPGRADE = 'UPGRADE',
    DOWNGRADE = 'DOWNGRADE',
}

export interface RankData {
    minCompetitions: number;
    minPercentage: number;
    demoteThreshold: number;
}