import { getCompetitionQuestionsPayload } from "@/services/api/routes/competition-route";
import { useQueryWithAxios } from "../api";

export const useGetCompetitionQuestions = (payload: getCompetitionQuestionsPayload) => {
  const queryResult = useQueryWithAxios(
    "competitionRoute",
    "getCompetitionQuestions",
    payload,
    { enabled: !!payload.id }
  );

  return {
    ...queryResult,
    competitionQuestions: queryResult.data,
  };
};