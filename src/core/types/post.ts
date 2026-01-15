
export type PostType = {
    id: number;
    username: string;
    authorName: string;
    content: string;
    competitionId: number | null;
    competitionName: string | null;
    trackIds: number[] | null;
    tracks: { id: number; name: string; description: string; backgroundColor: string | null }[];
    likesCount: number;
    dislikesCount: number;
    userReaction: string | null;
    authorCompetitionsCompleted: number;
    authorPercentage: number | null;
}