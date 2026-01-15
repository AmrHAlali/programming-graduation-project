import { getFavoriteTracksPayload } from "@/services/api/routes/track-route";
import type { TrackType } from "@/core";
import { useQueryWithAxios } from "../api";

export const useGetFavoriteTracks = (payload: getFavoriteTracksPayload) => {
    const queryResult = useQueryWithAxios(
        "trackRoute",
        "getFavoriteTracks",
        { username: payload.username },
        {
            enabled: !!payload.username,
        }
    );

    return {
        ...queryResult,
        tracks: queryResult.data as TrackType[] | undefined,
    };
};
