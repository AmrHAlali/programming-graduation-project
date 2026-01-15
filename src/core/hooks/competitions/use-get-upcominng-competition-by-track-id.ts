import { getUpcomingCompetitionByTrackIdPayload } from "@/services/api/routes/competition-route";
import { useQueryWithAxios } from "../api";

export const useGetUpcomingCompetitionByTrackId = (payload: getUpcomingCompetitionByTrackIdPayload) => {
  const queryResult = useQueryWithAxios(
    "competitionRoute",
    "getUpcomingCompetitionByTrackId",
    payload,
    { enabled: !!payload.trackId }
  );

  return {
    ...queryResult,
    competition: queryResult.data,
  };
};