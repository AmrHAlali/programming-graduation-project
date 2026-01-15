import { TrackType } from "@/core";

export type getAllTracksResponse = TrackType[];

export interface getFavoriteTracksResponse extends getAllTracksResponse {
    
}

export interface removeFavoriteTrackResponse {
    success: boolean;
}

export interface addFavoriteTrackResponse {
    success: boolean;
}

export type getTrackByIdResponse = TrackType;