import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps } from './app-stack-navigator';
import { FollowersListScreen } from '../profile/users-list/followers-list';
import { FollowingListScreen } from '../profile/users-list/following-list';
import { UserProfileScreen } from '../profile/user-profile';
import { UserPostsListScreen } from '../profile/user-posts-list';
import { CompetitionsListScreen } from '../competitions/competitions-list';
import { Competition } from '../competitions/competition-details';
import { TracksListScreen } from '../tracks/tracks-list';
import { Track } from '../tracks/track-details';
import { TrackEnrolledUsersScreen } from '../tracks/track-enrolled-users';
import { CreatePostScreen } from "../profile/create-post";
import { Competition as CompetitionType, useUserStore } from '@/core';
import { AuthNavigator } from '.';
import { AttemptingCompetitionScreen } from '../competitions/attempting-competition';

export type SharedStackParamList = {
    UserProfile: { username: string };
    UserPostsList: { username: string };
    FollowersList: { username: string; title?: string };
    FollowingList: { username: string; title?: string };
    CompetitionDetails: { id: number };
    CompetitionsList: { competitions: CompetitionType[] };
    TracksList: undefined;
    TrackDetails: { id: number };
    TrackEnrolledUsers: { trackId: number; title?: string };
    CompetitionEnrolledUsers: { competitionId: number; title?: string };
    AddPost: undefined;
    AttemptingCompetition: { id: number };
};

export type SharedStackNavigationProp =
    NativeStackNavigationProp<SharedStackParamList>;

export type SharedStackScreenProps<T extends keyof SharedStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<SharedStackParamList, T>,
        AppStackScreenProps<keyof AppStackParamList>
    >;

const Stack = createNativeStackNavigator<SharedStackParamList>();

export const SharedNavigator = ({ initialRouteName = "TracksList" }: { initialRouteName?: keyof SharedStackParamList }) => {
    // const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    // if(!isAuthenticated) {
    //     return <AuthNavigator />;
    // }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRouteName}
        >
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="UserPostsList" component={UserPostsListScreen} />
            <Stack.Screen name="FollowersList" component={FollowersListScreen} />
            <Stack.Screen name="FollowingList" component={FollowingListScreen} />

            <Stack.Screen name="CompetitionDetails" component={Competition} />
            <Stack.Screen name="CompetitionsList" component={CompetitionsListScreen} />

            <Stack.Screen name="TracksList" component={TracksListScreen} />
            <Stack.Screen name="TrackDetails" component={Track} />
            <Stack.Screen name="TrackEnrolledUsers" component={TrackEnrolledUsersScreen} />
            {/* Competition enrolled users list */}
            <Stack.Screen name="CompetitionEnrolledUsers" component={require("../competitions/competition-enrolled-users").CompetitionEnrolledUsersScreen} />
            <Stack.Screen name="AddPost" component={CreatePostScreen} />
            <Stack.Screen name="AttemptingCompetition" component={AttemptingCompetitionScreen} />
        </Stack.Navigator>
    );
};
