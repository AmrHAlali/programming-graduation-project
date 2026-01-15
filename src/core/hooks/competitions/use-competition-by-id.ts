import { getCompetitionByIdPayload } from "@/services/api/routes/competition-route";
import { useQueryWithAxios } from "../api";

export const useGetCompetitionById = (payload: getCompetitionByIdPayload) => {
  const queryResult = useQueryWithAxios(
    "competitionRoute",
    "getCompetitionById",
    payload,
    { enabled: !!payload.id }
  );

  return {
    ...queryResult,
    competition: queryResult.data,
  };
};