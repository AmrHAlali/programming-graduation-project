import { getTrackByIdPayload } from "@/services/api/routes/track-route";
import { useQueryWithAxios } from "../api";

export const useGetTrackById = (payload: getTrackByIdPayload) => {
  const queryResult = useQueryWithAxios(
    "trackRoute",
    "getTrackById",
    payload,
    { enabled: !!payload.trackId },
  );

  return {
    ...queryResult,
    tracks: queryResult.data,
  };
}