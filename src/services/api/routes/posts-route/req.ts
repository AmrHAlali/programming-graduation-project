
export type likePostPayload = {
    postId: number;
    username: string;
}

export type getUserPostsPayload = {
    username: string;
}

export type createPostPayload = {
    username: string;
    content: string;
    trackIds?: number[];
    competitionId?: number;
}