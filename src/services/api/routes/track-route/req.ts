
export type getFavoriteTracksPayload = {
    username: string;
}

export type removeFavoriteTrackPayload = {
    trackId: number;
    userId: string;
}

export type addFavoriteTrackPayload = {
    trackId: number;
    userId: string;
}

export type getTrackByIdPayload = {
    trackId: number;
}