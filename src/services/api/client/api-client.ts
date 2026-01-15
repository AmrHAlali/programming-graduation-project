import {
  ApiRoute,
  createAuthRoute,
} from "../routes";
import { createAnnoucmentRoute } from "../routes/annoucment-route";
import { createCompetitionRoute } from "../routes/competition-route";
import { createPostsRoute } from "../routes/posts-route";
import { createTrackRoute } from "../routes/track-route";
import { createUserRoute } from "../routes/user-route";
import { createApiClient } from "./client-config";

export const baseApi = createApiClient({
  baseURL: process.env.API_URL,
  apiName: "",
});


export const apiRoutes: ApiRoute = {
  authRoute: createAuthRoute(baseApi),
  userRoute: createUserRoute(baseApi),
  trackRoute: createTrackRoute(baseApi),
  annoucmentRoute: createAnnoucmentRoute(baseApi),
  postRoute: createPostsRoute(baseApi),
  competitionRoute: createCompetitionRoute(baseApi),
}; 