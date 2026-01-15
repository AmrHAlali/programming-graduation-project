import { SettingsItem } from "@/components/common/settings-item";
import { useGetFavoriteTracks } from "@/core/hooks/tracks/use-favorite-tracks";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TrackTagsList } from "../../_components/track-tags-list";
import { TrackType, useUserStore } from "@/core";

export const RelatedTracksField = ({ selectedTracks, setSelectedTracks }: { selectedTracks: TrackType[]; setSelectedTracks: Dispatch<SetStateAction<TrackType[]>> }) => {
    const username = useUserStore((state) => state.authDetails?.username);
    const { tracks: allTracks } = useGetFavoriteTracks({ username: username! });

    const trackOptions = useMemo(
        () =>
            (allTracks ?? []).map((track) => ({
                label: track.name,
                value: String(track.id),
            })),
        [allTracks]
    );

    return (
        <>
            <SettingsItem
                data={trackOptions}
                titleTx="Choose Related Track/s"
                modalPlaceholderTx="Select Track/s"
                multiple
                selectedValues={selectedTracks.map((t) => String(t.id))}
                onSelect={(item) => {
                    const id = Number(item.value);
                    const found = (allTracks ?? []).find((t) => t.id === id);
                    if (!found) return;

                    setSelectedTracks((prev) =>
                        prev.some((t) => t.id === id)
                            ? prev.filter((t) => t.id !== id)
                            : [...prev, found]
                    );
                }}
            />

            <TrackTagsList hidTitle tracks={selectedTracks} />
        </>
    );
}