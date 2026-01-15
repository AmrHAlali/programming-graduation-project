import { useQueryWithAxios } from "../api";
import type { getTrackEnrolledUsersPayload, getTrackEnrolledUsersResponse } from "@api/routes/user-route";

export const useGetTrackEnrolledUsers = (payload: getTrackEnrolledUsersPayload) => {
  const queryResult = useQueryWithAxios(
    "userRoute",
    "getTrackEnrolledUsers",
    payload,
    { enabled: !!payload.trackId },
  );

  return {
    ...queryResult,
    users: queryResult.data as getTrackEnrolledUsersResponse[],
  };
};
