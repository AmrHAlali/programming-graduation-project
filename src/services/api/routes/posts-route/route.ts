import { AxiosInstance } from "axios";
import { PostsEnumUrls } from "./enum";
import { PostRoute } from "./types";

export const createPostsRoute = (apiClient: AxiosInstance): PostRoute => ({
    getAllPosts: () => {
        return apiClient.get(PostsEnumUrls.getAllPosts);
    },
    getUserPosts: (payload) => {
        return apiClient.get(PostsEnumUrls.getUserPosts + payload.username);
    },
    likePost: (payload) => {
        return apiClient.post(PostsEnumUrls.likePost + payload.postId + '/like?username=' + payload.username);
    },
    createPost: (payload) => {
        return apiClient.post(PostsEnumUrls.createPost, payload);
    }
});
