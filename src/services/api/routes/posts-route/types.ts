import { GenericResponse } from "../types";
import { createPostPayload, getUserPostsPayload, likePostPayload } from "./req";
import { createPostResponse, getAllPostsResponse, getUserPostsResponse, likePostResponse } from "./res";

export type PostRoute = {
    getAllPosts: () => Promise<GenericResponse<getAllPostsResponse[]>>;
    getUserPosts: (payload: getUserPostsPayload) => Promise<GenericResponse<getUserPostsResponse[]>>;
    likePost: (payload: likePostPayload) => Promise<GenericResponse<likePostResponse>>;
    createPost: (payload: createPostPayload) => Promise<GenericResponse<createPostResponse>>;
};
