import { useQueryWithAxios } from "../api";

export const useGetAllAnnoucments = () => {
  const queryResult = useQueryWithAxios(
    "annoucmentRoute",
    "getAllAnnoucments",
    { enabled: true }
  );

  return {
    ...queryResult,
    annoucments: queryResult.data,
  };
};