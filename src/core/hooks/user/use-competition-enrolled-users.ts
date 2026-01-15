import { useQueryWithAxios } from "../api";
import type { getCompetitionEnrolledUsersPayload, getCompetitionEnrolledUsersResponse } from "@api/routes/user-route";

export const useGetCompetitionEnrolledUsers = (payload: getCompetitionEnrolledUsersPayload) => {
  const queryResult = useQueryWithAxios(
    "userRoute",
    "getCompetitionEnrolledUsers",
    payload,
    { enabled: !!payload.competitionId },
  );

  return {
    ...queryResult,
    users: queryResult.data as getCompetitionEnrolledUsersResponse[],
  };
};
