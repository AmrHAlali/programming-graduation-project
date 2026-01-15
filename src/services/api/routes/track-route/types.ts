import { GenericResponse } from "../types";
import { addFavoriteTrackPayload, getFavoriteTracksPayload, getTrackByIdPayload, removeFavoriteTrackPayload } from "./req";
import { addFavoriteTrackResponse, getAllTracksResponse, getFavoriteTracksResponse, getTrackByIdResponse, removeFavoriteTrackResponse } from "./res";

export type TrackRoute = {
    getAllTracks: () => Promise<GenericResponse<getAllTracksResponse[]>>;
    getFavoriteTracks: (paylood: getFavoriteTracksPayload) => Promise<GenericResponse<getFavoriteTracksResponse[]>>;
    removeFavoriteTrack: (paylood: removeFavoriteTrackPayload) => Promise<GenericResponse<removeFavoriteTrackResponse>>;
    addFavoriteTrack: (paylood: addFavoriteTrackPayload) => Promise<GenericResponse<addFavoriteTrackResponse>>;
    getTrackById: (paylood: getTrackByIdPayload) => Promise<GenericResponse<getTrackByIdResponse>>;
};
