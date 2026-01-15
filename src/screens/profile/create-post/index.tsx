import { useState } from "react";
import { Button, ControlledInput, Screen } from "@/components";
import { CommonHeader } from "@/components/common/common-header";
import { colors, getCreatePostSchema, hp, useUserStore, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { useCreatePost } from "@/core/hooks/posts/use-create-post";
import { useNavigation } from "@react-navigation/native";
import { SharedStackNavigationProp } from "@/screens/navigation/shared-stack-navigator";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RelatedTracksField } from "./_components/related-tracks-field";
import { RelatedCompetitionField, SelectedCompetition } from "./_components/related-competition";
import { TrackType } from "@/core";

type FormType = z.infer<ReturnType<typeof getCreatePostSchema>>;

export const CreatePostScreen = () => {
    const { createPost, isPending } = useCreatePost();
    const navigation = useNavigation<SharedStackNavigationProp>();
    const username = useUserStore((state) => state.authDetails?.username);

    const [selectedTracks, setSelectedTracks] = useState<TrackType[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<SelectedCompetition | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormType>({
        resolver: zodResolver(getCreatePostSchema()),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (values: FormType) => {
        if (isPending || isSubmitting) return;

        console.log("Creating post with values:", values, "Selected Tracks:", selectedTracks, "Selected Competition:", selectedCompetition);
        await createPost({
            content: values.content.trim(),
            username: username!,
            trackIds: selectedTracks.map((t) => t.id),
            competitionId: selectedCompetition ? selectedCompetition.id : undefined,
        })
    };

    return (
        <>
            <CommonHeader titleTx="Create Post" navigation={navigation} />
            <Screen style={styles.container}>
                <View style={{ gap: hp(1.5) }}>
                    <ControlledInput
                        name="content"
                        control={control}
                        placeholder="What's on your mind?"
                        multiline
                        numberOfLines={6}
                        blurOnSubmit={false}
                        addUnitStyle
                        inputStyle={{ textAlignVertical: "top" }}
                        inputContainerStyle={styles.inputContainer}
                    />

                    <RelatedTracksField
                        selectedTracks={selectedTracks}
                        setSelectedTracks={setSelectedTracks}
                    />

                    <RelatedCompetitionField
                        selectedTracks={selectedTracks}
                        selectedCompetition={selectedCompetition}
                        setSelectedCompetition={setSelectedCompetition}
                    />

                    <View style={styles.buttonWrapper}>
                        <Button
                            tx="Post"
                            onPress={handleSubmit(onSubmit)}
                            disabled={isPending || isSubmitting}
                        />
                    </View>
                </View>
            </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(14),
        backgroundColor: colors.background,
        paddingHorizontal: wp(5),
    },
    inputContainer: {
        minHeight: hp(25),
        alignItems: "flex-start",
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
    },
    buttonWrapper: {
        marginTop: hp(1),
    },
});
