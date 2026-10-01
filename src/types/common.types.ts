export type StatusFilter = "all" | "active" | "inactive";

export type OptionItem<T extends string = string> = {
  label: string;
  value: T;
  color?: string;
};

export interface ListParams {
  search?: string;
  page?: number;
  pageSize?: number;
};

export interface PaginationInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_count: number;
  last_page?: number;
};

export interface SelectOption {
  id: number;
  label: string;
  value: string | number;
};