import { SettingsItem } from "@/components/common/settings-item";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TrackType } from "@/core";
import { useQueries } from "@tanstack/react-query";
import { sendRequest } from "@/core/hooks/api/use-axios-tanstack";

export type SelectedCompetition = {
    id: number;
    label: string;
    backgroundColor?: string;
};

export const RelatedCompetitionField = ({
    selectedTracks,
    selectedCompetition,
    setSelectedCompetition,
}: {
    selectedTracks: TrackType[];
    selectedCompetition: SelectedCompetition | null;
    setSelectedCompetition: Dispatch<SetStateAction<SelectedCompetition | null>>;
}) => {
    const trackIds = useMemo(
        () => selectedTracks.map((track) => track.id),
        [selectedTracks]
    );

    const upcomingQueries = useQueries({
        queries: trackIds.map((trackId) => ({
            queryKey: ["competitionRoute-getUpcomingCompetitionByTrackId", { trackId }],
            queryFn: () =>
                sendRequest("competitionRoute", "getUpcomingCompetitionByTrackId", { trackId }),
            enabled: !!trackId,
        })),
    });

    const upcomingCompetitions = useMemo(
        () =>
            upcomingQueries
                .map((q) => q.data)
                .filter((c): c is any => Boolean(c)),
        [upcomingQueries]
    );

    const uniqueUpcomingCompetitions = useMemo(() => {
        const map = new Map<number, any>();
        upcomingCompetitions.forEach((competition: any) => {
            if (!competition) return;
            if (!map.has(competition.id)) {
                map.set(competition.id, competition);
            }
        });
        return Array.from(map.values());
    }, [upcomingCompetitions]);

    const competitionOptions = useMemo(
        () =>
            uniqueUpcomingCompetitions.map((competition: any) => ({
                label: competition.name,
                value: String(competition.id),
            })),
        [uniqueUpcomingCompetitions]
    );

    return (
        <SettingsItem
            data={competitionOptions}
            titleTx="Choose Related Competition"
            modalPlaceholderTx="Select Competition"
            selectedValue={selectedCompetition ? String(selectedCompetition.id) : undefined}
            disabled={!competitionOptions.length}
            onSelect={(item) => {
                const id = Number(item.value);
                const found = uniqueUpcomingCompetitions.find((c: any) => c.id === id);
                if (!found) return;

                setSelectedCompetition({
                    id: found.id,
                    label: found.name,
                    backgroundColor: undefined,
                });
            }}
        />
    );
};