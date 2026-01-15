import { likePostPayload } from "@/services/api/routes/posts-route";
import { useQueryWithAxios } from "../api";

export const useLikePost = (payload: likePostPayload) => {
  const queryResult = useQueryWithAxios(
    "postRoute",
    "likePost",
    payload,
    { enabled: !!payload.postId && !!payload.username },
  );

  return {
    ...queryResult,
    posts: queryResult.data,
  };
};