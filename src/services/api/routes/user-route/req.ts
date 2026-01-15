
export type getUserProfilePayload = {
    userId: string;
}

export type getFollowersPayload = {
    username: string;
}

export type getTrackEnrolledUsersPayload = {
    trackId: number;
}

export type getCompetitionEnrolledUsersPayload = {
    competitionId: number;
}

export type followUserPayload = {
    username: string;
    followUsername: string;
}

export type unFollowUserPayload = {
    username: string;
    followUsername: string;
}