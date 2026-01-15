import { colors, hp, wp } from "@/core";
import { selectRankByStats } from "@/core/helpers/ranking-utils";
import { StyleSheet, View } from "react-native";
import { UserItem } from "./post-header";
import { MinimizeedCompetitionComponent } from "../minimized-competition-component";
import { Postcontent } from "./content";
import { TrackTag } from "@/screens/profile/_components/track-tag";
import { PostType } from "@/core/types/post";

export const Post = ({ post }: { post: PostType | null }) => {
    const userRank = selectRankByStats(post?.authorCompetitionsCompleted ?? 0, post?.authorPercentage ?? 0).newRank;

    // const { posts } = useLikePost({
    //     postId: post.id,
    //     username: post.username,
    // });

    return (
        post && <View style={styles.container}>
            <UserItem
                userRank={userRank}
                username={post.username}
                name={post.authorName}
            />

            <Postcontent
                text={post.content}
            />

            <View style={styles.metaRow}>
                {post.competitionId && post.competitionName && (
                    <MinimizeedCompetitionComponent
                        id={post.competitionId}
                        title={post.competitionName}
                    />
                )}

                <View style={styles.tracksContainer}>
                    {post.tracks?.map((track) => (
                        <TrackTag
                            key={track.id}
                            size="small"
                            track={track}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: colors.neutrals.gray200,
        backgroundColor: colors.neutrals.gray200,

        paddingVertical: hp(1),
        paddingHorizontal: wp(4),

        gap: hp(1.5),
    },
    metaRow: {
        gap: wp(1.5),
    },
    tracksContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: wp(1.5),
        flex: 1,
    }
});