import { AxiosInstance } from "axios";
import { TrackEnumUrls } from "./enum";
import { TrackRoute } from "./types";

export const createTrackRoute = (apiClient: AxiosInstance): TrackRoute => ({
    getAllTracks: () => {
        return apiClient.get(TrackEnumUrls.getAllTracks);
    },
    getFavoriteTracks: (payload) => {
        return apiClient.get(TrackEnumUrls.getFavoriteTracks + payload.username);
    },
    removeFavoriteTrack: (payload) => {
        return apiClient.delete(TrackEnumUrls.removeFavoriteTrack + payload.trackId + '/favorite?username=' + payload.userId);
    },
    addFavoriteTrack: (payload) => {
        return apiClient.post(TrackEnumUrls.addFavoriteTrack + payload.trackId + '/favorite?username=' + payload.userId);
    },

    getTrackById: (payload) => {
        return apiClient.get(TrackEnumUrls.getTrackById + payload.trackId);
    }
});
