import type { GetNextPageParamFunction } from "@tanstack/react-query";
import qs from "qs";
import { GenericListResponse, PaginateQuery } from "../routes";

type KeyParams = {
  [key: string]: any;
};
export const DEFAULT_LIMIT = 10;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

// for infinite query pages  to flatList data
export function normalizePages<T>(pages: GenericListResponse<T[]>[]): T[] {
  return pages.reduce((prev: T[], current) => {
    const pageData = current.value?.data || [];
    return [...prev, ...pageData];
  }, []);
}
// a function that accept a url and return params as an object
export function getUrlParameters(
  url: string | null
): { [k: string]: string } | null {
  if (url === null) {
    return null;
  }
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    if (match[1] !== null) {
      //@ts-ignore
      params[match[1]] = match[2];
    }
  }
  return params;
}

export const getPreviousPageParam: GetNextPageParamFunction<
  unknown,
  PaginateQuery<unknown>
> = (page) => getUrlParameters(page.previous)?.offset ?? null;

export const getNextPageParam = (
  lastPage: GenericListResponse<unknown[]>
): number | undefined => {
  if (!lastPage?.value) return undefined;
  return lastPage.value.pageNumber < lastPage.value.totalPages
    ? lastPage.value.pageNumber + 1
    : undefined;
};

// Utility function to build a query string from an object
export const buildQueryString = (params: Record<string, any>): string => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  return qs.stringify(filteredParams, { addQueryPrefix: true });
};
