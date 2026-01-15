import { getCompetitionsByTrackIdPayload } from "@/services/api/routes/competition-route";
import { useQueryWithAxios } from "../api";

export const useGetCompetitionsByTrackId = (payload: getCompetitionsByTrackIdPayload) => {
  const queryResult = useQueryWithAxios(
    "competitionRoute",
    "getCompetitionsByTrackId",
    payload,
    { enabled: !!payload.trackId }
  );

  return {
    ...queryResult,
    competitions: queryResult.data,
  };
};