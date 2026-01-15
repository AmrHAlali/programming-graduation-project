import { getUserPostsPayload } from "@/services/api/routes/posts-route";
import { useQueryWithAxios } from "../api";

export const useGetUserPosts = (payload: getUserPostsPayload) => {
  const queryResult = useQueryWithAxios(
    "postRoute",
    "getUserPosts",
    payload,
    { enabled: !!payload.username }
  );

  return {
    ...queryResult,
    posts: queryResult.data,
  };
};