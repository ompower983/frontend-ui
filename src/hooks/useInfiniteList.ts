"use client";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_PER_PAGE, SEARCH_DEBOUNCE_MS } from "@/constants";
import { ListParams, PaginationInfo, SelectOption } from "@/types";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

interface PaginatedResponse<T> {
  data: {
    items: T[];
    page_info: PaginationInfo;
  };
};

interface InfiniteQueryPage<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

interface UseInfiniteListProps<T> {
  queryKey: string;
  enabled?: boolean;
  perPage?: number;
  fetchPage: (params: ListParams) => Promise<PaginatedResponse<T>>;
  mapToOption: (item: T) => SelectOption;
}

const normalizePageMeta = (meta?: PaginationInfo) => {
  const page = meta?.current_page ?? DEFAULT_PAGE;
  const perPage = meta?.page_size ?? DEFAULT_PAGE_SIZE;
  const total = meta?.total_count ?? 0;
  const lastPage = meta?.last_page ?? Math.max(1, Math.ceil(total / perPage));

  return {
    current_page: page,
    per_page: perPage,
    total,
    last_page: lastPage,
  };
};

const flattenOptions = <T>(
  data: InfiniteData<InfiniteQueryPage<T>> | undefined,
  mapToOption: (item: T) => SelectOption,
): SelectOption[] => {
  if (!data?.pages?.length) return [];

  const seen = new Set<SelectOption["id"]>();
  const options: SelectOption[] = [];

  for (const page of data.pages) {
    for (const item of page.data) {
      const option = mapToOption(item);
      if (seen.has(option.id)) continue;
      seen.add(option.id);
      options.push(option);
    }
  }

  return options;
};

export const useInfiniteList = <T>({
  queryKey,
  enabled = true,
  perPage = DEFAULT_PER_PAGE,
  fetchPage,
  mapToOption,
}: UseInfiniteListProps<T>) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  const searchTerm = useMemo(() => {
    const value = debouncedSearch.trim();
    return value.length >= 2 ? value : undefined;
  }, [debouncedSearch]);

  const query = useInfiniteQuery({
    queryKey: [queryKey, searchTerm, perPage],
    enabled,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const result = await fetchPage({
        page: pageParam,
        pageSize: perPage,
        search: searchTerm,
      });
      return {
        data: result.data?.items,
        meta: normalizePageMeta(result.data?.page_info),
      };
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });

  const options = useMemo(
    () => flattenOptions(query.data, mapToOption),
    [query.data, mapToOption],
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const loadMore = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;
    void query.fetchNextPage();
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  return {
    options,
    search,
    hasMore: query.hasNextPage ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingMore: query.isFetchingNextPage,
    error: query.error,
    refetch: query.refetch,
    handleSearch,
    loadMore
  };
};
