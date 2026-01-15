import { AxiosInstance } from "axios";
import { UserRoute } from "./types";
import { UserEnumUrls } from "./enum";

export const createUserRoute = (apiClient: AxiosInstance): UserRoute => ({
    getUserProfile: ({ userId }) => {
        return apiClient.get(`${UserEnumUrls.getUserProfile}${userId}`);
    },
    getFollowers: ({ username }) => {
        return apiClient.get(`${UserEnumUrls.getUsersList}${username}/followers`);
    },
    getFollowing: ({ username }) => {
        return apiClient.get(`${UserEnumUrls.getUsersList}${username}/following`);
    },
    getTrackEnrolledUsers: ({ trackId }) => {
        return apiClient.get(`${UserEnumUrls.getTrackEnrolledUsers}${trackId}/enrolled-users`);
    },
    getCompetitionEnrolledUsers: ({ competitionId }) => {
        return apiClient.get(`${UserEnumUrls.getCompetitionEnrolledUsers}${competitionId}/enrolled-users`);
    },
    followUser: ({ username, followUsername }) => {
        return apiClient.post(`${UserEnumUrls.followUser}${followUsername}/follow?follower=${username}`);
    },
    unFollowUser: ({ username, followUsername }) => {
        return apiClient.delete(`${UserEnumUrls.unFollowUser}${followUsername}/follow?follower=${username}`);
    }
});
