
export type getCompetitionByIdPayload = {
    id: number;
}

export type getCompetitionQuestionsPayload = {
    id: number;
}

export type submitCompetitionAnswersPayload = {
    competitionId: number;
    username: string;
    answers: {
        questionId: number;
        selectedOptionId: number;
    }[];
}

export type enrollInCompetitionPayload = {
    competitionId: number;
    username: string;
}

export type getCompetitionsByTrackIdPayload = {
    trackId: number;
}

export type getUpcomingCompetitionByTrackIdPayload = {
    trackId: number;
}