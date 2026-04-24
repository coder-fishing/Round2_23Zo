export type PaginationResponse<T> = {
  page: number;
  totalPages: number;
  total: number;
  data: T[];
};

export type SelectOption = {
  id: string;
  name: string;
};

export type BookSelectOption = {
  id: string;
  title: string;
  authorName: string | null;
};
