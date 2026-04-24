import { apiRequest } from "@/app/lib/api";
import type { ReviewRow } from "@/app/components/tables/ReviewsTable";
import type { PaginationResponse } from "@/app/services/types";

export const listReviews = (page: number) => {
  return apiRequest<PaginationResponse<ReviewRow>>(`/reviews?page=${page}`);
};

export const createReview = (content: string, bookId: string) => {
  return apiRequest<{ id: string }>("/reviews", {
    method: "POST",
    body: JSON.stringify({ content, bookId })
  });
};

export const updateReview = (id: string, content: string, bookId: string) => {
  return apiRequest<{ message: string }>(`/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify({ content, bookId })
  });
};

export const deleteReview = (id: string) => {
  return apiRequest<{ message: string }>(`/reviews/${id}`, {
    method: "DELETE"
  });
};
