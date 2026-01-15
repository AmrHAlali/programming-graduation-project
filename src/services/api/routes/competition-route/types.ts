import { GenericResponse } from "../types";
import { enrollInCompetitionPayload, getCompetitionByIdPayload, getCompetitionQuestionsPayload, getCompetitionsByTrackIdPayload, getUpcomingCompetitionByTrackIdPayload as getUpcomingCompetitionByTrackIdPayload, submitCompetitionAnswersPayload } from "./req";
import { enrollInCompetitionResponse, getCompetitionByIdResponse, getCompetitionQuestionsResponse, getCompetitionsByTrackIdResponse, getUpcomingCompetitionsByTrackIdResponse as getUpcomingCompetitionByTrackIdResponse, submitCompetitionAnswersResponse } from "./res";

export type CompetitionRoute = {
    getCompetitionById: (payload: getCompetitionByIdPayload) => Promise<GenericResponse<getCompetitionByIdResponse>>; 
    getCompetitionQuestions: (payload: getCompetitionQuestionsPayload) => Promise<GenericResponse<getCompetitionQuestionsResponse>>;
    submitCompetitionAnswers: (payload: submitCompetitionAnswersPayload) => Promise<GenericResponse<submitCompetitionAnswersResponse>>;
    enrollInCompetition: (payload: enrollInCompetitionPayload) => Promise<GenericResponse<enrollInCompetitionResponse>>;
    getCompetitionsByTrackId: (payload: getCompetitionsByTrackIdPayload) => Promise<GenericResponse<getCompetitionsByTrackIdResponse>>;
    getUpcomingCompetitionByTrackId: (payload: getUpcomingCompetitionByTrackIdPayload) => Promise<GenericResponse<getUpcomingCompetitionByTrackIdResponse>>;
};
