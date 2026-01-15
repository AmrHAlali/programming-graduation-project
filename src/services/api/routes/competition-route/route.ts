import { AxiosInstance } from "axios";
import { CompetitionEnumUrls } from "./enum";
import { CompetitionRoute } from "./types";

export const createCompetitionRoute = (apiClient: AxiosInstance): CompetitionRoute => ({
    getCompetitionById: (payload) => apiClient.get(CompetitionEnumUrls.getCompetitionById + payload.id),
    getCompetitionQuestions: (payload) => apiClient.get(CompetitionEnumUrls.getCompetitionQuestions + payload.id + '/questions'),
    submitCompetitionAnswers: (payload) => apiClient.post(CompetitionEnumUrls.submitCompetitionAnswers + payload.competitionId + '/submit', payload),
    enrollInCompetition: (payload) => apiClient.post(CompetitionEnumUrls.enrollInCompetition + payload.competitionId + '/enroll?username=' + payload.username),
    getCompetitionsByTrackId: (payload) => apiClient.get(CompetitionEnumUrls.getCompetitionsByTrackId + payload.trackId + '/contests'),
    getUpcomingCompetitionByTrackId: (payload) => apiClient.get(CompetitionEnumUrls.getUpcomingCompetitionsByTrackId + payload.trackId + '/next-competition'),
});
