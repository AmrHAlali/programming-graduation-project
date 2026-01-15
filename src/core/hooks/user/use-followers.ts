import { useQueryWithAxios } from "../api";
import type { getFollowersPayload, getFollowersResponse } from "@api/routes/user-route";

export const useGetFollowers = (payload: getFollowersPayload) => {
  const queryResult = useQueryWithAxios(
    "userRoute",
    "getFollowers",
    { username: payload.username },
    { enabled: !!payload.username },
  );

  return {
    ...queryResult,
    users: queryResult.data as getFollowersResponse[],
  };
};
