import { useQueryWithAxios } from "../api";

export const useGetAllTracks = () => {
  const queryResult = useQueryWithAxios(
    "trackRoute",
    "getAllTracks",
    { enabled: true }
  );

  return {
    ...queryResult,
    tracks: queryResult.data,
  };
};