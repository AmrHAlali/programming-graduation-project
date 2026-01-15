
export type getUserProfileResponse = {
    username: string;
    name: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    totalScore: number;
    competitionsCompleted: number;
    tracksAttempted: number;
    favoriteTracksCount: number;
    completedCompetitions: {
        competitionId: number;
        competitionName: string;
        trackName: string;
        score: number;
        percentage: number;
        completedAt: string;
    }[];
    attemptedTracks: unknown[];
    favoriteTracks: {
        trackId: number;
        trackName: string;
        backgroundColor: string | null;
        competitionsCompleted: number;
    }[];
    overallPercentage: number;
}

export type getFollowersResponse = getUserProfileResponse;

export type getTrackEnrolledUsersResponse = getUserProfileResponse[];

export type getCompetitionEnrolledUsersResponse = getUserProfileResponse[];