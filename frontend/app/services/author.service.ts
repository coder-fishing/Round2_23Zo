import { apiRequest } from "@/app/lib/api";
import type { AuthorRow } from "@/app/components/tables/AuthorsTable";
import type { PaginationResponse, SelectOption } from "@/app/services/types";

export const listAuthors = (page: number) => {
  return apiRequest<PaginationResponse<AuthorRow>>(`/authors?page=${page}`);
};

export const getAuthorOptions = () => {
  return apiRequest<SelectOption[]>("/authors/options");
};

export const createAuthor = (name: string) => {
  return apiRequest<{ id: string }>("/authors", {
    method: "POST",
    body: JSON.stringify({ name })
  });
};

export const updateAuthor = (id: string, name: string) => {
  return apiRequest<{ message: string }>(`/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name })
  });
};

export const deleteAuthor = (id: string) => {
  return apiRequest<{ message: string }>(`/authors/${id}`, {
    method: "DELETE"
  });
};
