import { AxiosResponse } from "axios";
import { UserRoute } from "./user-route";
import { TrackRoute } from "./track-route";
import { AnnoucmentRoute } from "./annoucment-route";
import { PostRoute } from "./posts-route";
import { CompetitionRoute } from "./competition-route";
import { AuthRoute } from "./auth-route";

export type GenericListResponse<T> = {
  value: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: T;
  };
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
};

// Support both wrapped (value envelope) and unwrapped (raw payload) responses
export type GenericResponse<T> =
  | {
      value: T;
      isSuccess: boolean;
      isFailure: boolean;
      error: {
        code: string;
        message: string;
      };
    }
  | T;

// Helper to unwrap the value from GenericResponse
export type UnwrapApiResponse<T> = T extends { value: infer V }
  ? V
  : T;

export type ListPayload = {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  OrderDirection?: string;
};

export type IAxiosResponse<T, D = any> = Promise<AxiosResponse<T, D>>;

export type PaginateQuery<T> = GenericListResponse<T[]> & {
  next: string | null;
  previous: string | null;
};

export type ApiRoute = {
  authRoute: AuthRoute;
  userRoute: UserRoute;
  trackRoute: TrackRoute;
  annoucmentRoute: AnnoucmentRoute;
  postRoute: PostRoute;
  competitionRoute: CompetitionRoute;
};
