
export type Competition = {
    competitionId: number;
    competitionName: string;
    trackName: string;
    score: number | null;
    percentage: number | null;
    completedAt: string;
}

export type CompetitionDetails = {
    id: number;
    trackId: number;
    trackName: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    active: boolean;
    upcoming: boolean;
    status: string;
    questionCount: number;
    totalPoints: number;
};

export type MinimizedCompetition = {
    id: number;
    title: string;
}

export enum CompetitionStatus {
    UPCOMING = "UPCOMING",
    ACTIVE = "ACTIVE",
    ENDED = "ENDED"
}