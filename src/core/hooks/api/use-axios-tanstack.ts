import { ApiRoute, apiRoutes, UnwrapApiResponse } from "@/services";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  DefinedUseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseQueryOptionsAxios<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, "queryKey"> {
  page?: number;
  searchText?: string;
}

interface UseInfiniteQueryOptionsAxios<TData>
  extends Omit<
    UseInfiniteQueryOptions<TData, AxiosError>,
    "queryKey" | "queryFn"
  > {
  page?: number;
  searchText?: string;
}

type ReturnTypeAsync<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : unknown;

type ApiFnReturn<T extends keyof ApiRoute, R extends keyof ApiRoute[T]> =
  ReturnTypeAsync<ApiRoute[T][R]>;

type UnwrappedReturn<T extends keyof ApiRoute, R extends keyof ApiRoute[T]> =
  UnwrapApiResponse<ApiFnReturn<T, R>>;

export const sendRequest = async <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  TResult extends UnwrappedReturn<T, R> = UnwrappedReturn<T, R>
>(
  route: T,
  routeMethod: R,
  payload?: TPayload
): Promise<TResult> => {
  const query = apiRoutes[route][routeMethod] as ApiRoute[T][R] extends (
    data: infer P
  ) => unknown
    ? (data: P) => Promise<ApiFnReturn<T, R>>
    : never;

  const response = (await query(payload as any))?.data;
  const unwrapped =
    response && typeof response === "object" && "value" in (response as any)
      ? (response as any).value
      : response;

  return unwrapped as TResult;
};

const useQueryWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  TResult extends UnwrappedReturn<T, R> = UnwrappedReturn<T, R>
>(
  route: T,
  routeMethod: R,
  payload?: TPayload,
  options?: UseQueryOptionsAxios<TResult>
): QueryObserverResult<TResult, AxiosError> => {
  return useQuery<TResult, AxiosError>({
    ...options,
    queryKey: [`${route}-${routeMethod}`, { ...payload }],
    queryFn: () =>
      sendRequest<T, R, TPayload, TResult>(route, routeMethod, payload),
  });
};

const useInfiniteQueryWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload,
  TResult = UnwrappedReturn<T, R>
>(
  route: T,
  routeMethod: R,
  payload?: TPayload,
  options?: UseInfiniteQueryOptionsAxios<TResult>
) => {
  return useInfiniteQuery<TResult, AxiosError>({
    ...options,
    queryKey: [`${route}-${routeMethod}`, payload],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await sendRequest<
        T,
        R,
        TPayload & { pageNumber: number },
        TResult
      >(route, routeMethod, {
        ...(payload ?? {}),
        pageNumber: pageParam,
      });
      return response as TResult;
    },
  });
};

const useMutationWithAxios = <
  T extends keyof ApiRoute,
  R extends keyof ApiRoute[T],
  TPayload extends ApiRoute[T][R] extends (data: infer P) => unknown
    ? P
    : never,
  TResult extends UnwrappedReturn<T, R> = UnwrappedReturn<T, R>
>(
  route: T,
  routeMethod: R,
  options?: Omit<
    UseMutationOptions<TResult, AxiosError, TPayload>,
    "mutationKey"
  >
) => {
  return useMutation<TResult, AxiosError, TPayload>({
    mutationKey: [route, routeMethod],
    mutationFn: (payload: TPayload) =>
      sendRequest<T, R, TPayload, TResult>(route, routeMethod, payload),
    ...options,
  });
};

export { useQueryWithAxios, useMutationWithAxios, useInfiniteQueryWithAxios };
