import { Text } from "@/components";
import { hp } from "@/core";
import { StyleSheet, View } from "react-native";
import { AnnouncementItem } from "./annoucement-item";
import { useState } from "react";
import { useGetAllAnnoucments } from "@/core/hooks/annoucments/use-all-annoucments";

export const AnnouncementsList = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { annoucments, isLoading } = useGetAllAnnoucments();

    return (
        annoucments?.length === 0 ? null : <View style={[styles.container]}>
            <Text
                tx="Announcements"
                preset="titleLargeBold"
            />

            {annoucments?.map((announcement) =>
                <AnnouncementItem
                    key={announcement.id}
                    announcement={announcement}
                    expandedId={expandedId}
                    onToggle={setExpandedId}
                />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: hp(1),
    }
});