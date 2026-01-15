import { useQueryWithAxios } from "../api";
import type {
    getFollowersResponse as UsersListResponse,
    getTrackEnrolledUsersResponse,
} from "@api/routes/user-route";

type UsersListKind = "getFollowers" | "getFollowing" | "getTrackEnrolledUsers";

/**
 * Generic users-list hook whose `users` type & payload depend on `listType`.
 * - `getFollowers` / `getFollowing` → payload { username }, users: UsersListResponse[]
 * - `getTrackEnrolledUsers`        → payload { trackId }, users: getTrackEnrolledUsersResponse[number][]
 */
type UsersListItem<T extends UsersListKind> =
    T extends "getTrackEnrolledUsers"
        ? getTrackEnrolledUsersResponse[number]
        : UsersListResponse;

type UsersListPayload<T extends UsersListKind> =
    T extends "getTrackEnrolledUsers"
        ? { trackId: string }
        : { username: string };

export const useGetUsersList = <T extends UsersListKind>(
    args: { listType: T } & UsersListPayload<T>,
) => {
    const { listType, ...payload } = args;

    const enabled =
        "username" in payload
            ? !!payload.username
            : !!payload.trackId;

    const queryResult = useQueryWithAxios(
        "userRoute",
        listType as any,
        payload as any,
        { enabled },
    );

    return {
        ...queryResult,
        users: queryResult.data as UsersListItem<T>[],
    };
};
