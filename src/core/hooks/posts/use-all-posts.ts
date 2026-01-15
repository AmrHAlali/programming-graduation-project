import { useQueryWithAxios } from "../api";

export const useGetAllPosts = () => {
  const queryResult = useQueryWithAxios(
    "postRoute",
    "getAllPosts",
    undefined,
    { enabled: true }
  );

  return {
    ...queryResult,
    posts: queryResult.data,
  };
};