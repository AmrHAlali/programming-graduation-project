import { useQueryWithAxios } from "../api";
import type { getFollowersPayload, getFollowersResponse } from "@api/routes/user-route";

export const useGetFollowing = (payload: getFollowersPayload) => {
  const queryResult = useQueryWithAxios(
    "userRoute",
    "getFollowing",
    { username: payload.username },
    { enabled: !!payload.username },
  );

  return {
    ...queryResult,
    users: queryResult.data as getFollowersResponse[],
  };
};
