import { GenericResponse } from "../types";
import { getFollowersPayload as getUsersListPayload, getUserProfilePayload, getTrackEnrolledUsersPayload, followUserPayload, unFollowUserPayload, getCompetitionEnrolledUsersPayload } from "./req";
import { getFollowersResponse as getUsersListResponse, getUserProfileResponse, getTrackEnrolledUsersResponse, getCompetitionEnrolledUsersResponse } from "./res";

export type UserRoute = {
    getUserProfile: (payload: getUserProfilePayload) => Promise<GenericResponse<getUserProfileResponse>>;
    getFollowing: (payload: getUsersListPayload) => Promise<GenericResponse<getUsersListResponse[]>>;
    getFollowers: (payload: getUsersListPayload) => Promise<GenericResponse<getUsersListResponse[]>>;
    getTrackEnrolledUsers: (payload: getTrackEnrolledUsersPayload) => Promise<GenericResponse<getTrackEnrolledUsersResponse[]>>;
    getCompetitionEnrolledUsers: (payload: getCompetitionEnrolledUsersPayload) => Promise<GenericResponse<getCompetitionEnrolledUsersResponse[]>>;
    followUser: (payload: followUserPayload) => Promise<GenericResponse<string>>;
    unFollowUser: (payload: unFollowUserPayload) => Promise<GenericResponse<string>>;
};
