import { CompetitionDetails } from "@/core";

export type getCompetitionByIdResponse = CompetitionDetails;

export type getCompetitionQuestionsResponse = {
	id: number;
	questionText: string;
	pointsWeight: number;
	options: {
		id: number;
		optionText: string;
	}[];
}[];

export type submitCompetitionAnswersResponse = {
	username: string | null;
	answers: {
		questionId: number;
		selectedOptionId: number;
	}[] | null;
	totalScore: number;
	correctAnswers: number;
	totalQuestions: number;
	percentage: number;
	completedAt: string;
}

export type enrollInCompetitionResponse = string

export type getCompetitionsByTrackIdResponse = CompetitionDetails[];

export type getUpcomingCompetitionsByTrackIdResponse = CompetitionDetails[];