"use client";
import { ListParams, SelectOption } from "@/types";
import { useInfiniteList } from "./useInfiniteList";
import { useMemo } from "react";

type ServiceFetcher = (
  params: ListParams & Record<string, any>,
) => Promise<any>;

interface UseInfiniteSelectDataProps<T> {
  queryKey: string;
  extraParams?: Record<string, any>;
  service: ServiceFetcher;
  mapToOption: (item: T) => SelectOption;
}

export function useInfiniteSelectData<T>({
  queryKey,
  extraParams,
  service,
  mapToOption,
}: UseInfiniteSelectDataProps<T>) {
  const fetchPage = useMemo(() => {
    return async ({ page, pageSize, search }: ListParams) => {
      const response = await service({
        page,
        pageSize,
        search,
        ...extraParams,
      });

      const payload = response.data;

      if (Array.isArray(payload)) {
        return {
          data: payload,
          meta: {
            current_page: page,
            per_page: pageSize,
            total: payload.length,
            last_page: 1,
          },
        };
      }

      return payload;
    };
  }, [service, extraParams]);

  const infinite = useInfiniteList<T>({
    queryKey,
    fetchPage,
    mapToOption,
  });

  return infinite;
}
