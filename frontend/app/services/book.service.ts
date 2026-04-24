import { apiRequest } from "@/app/lib/api";
import type { BookRow } from "@/app/components/tables/BooksTable";
import type { BookSelectOption, PaginationResponse } from "@/app/services/types";

export const listBooks = (page: number) => {
  return apiRequest<PaginationResponse<BookRow>>(`/books?page=${page}`);
};

export const getBookOptions = () => {
  return apiRequest<BookSelectOption[]>("/books/options");
};

export const createBook = (title: string, authorId: string) => {
  return apiRequest<{ id: string }>("/books", {
    method: "POST",
    body: JSON.stringify({ title, authorId })
  });
};

export const updateBook = (id: string, title: string, authorId: string) => {
  return apiRequest<{ message: string }>(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, authorId })
  });
};

export const deleteBook = (id: string) => {
  return apiRequest<{ message: string }>(`/books/${id}`, {
    method: "DELETE"
  });
};
