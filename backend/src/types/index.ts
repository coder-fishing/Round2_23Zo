export const PAGE_LIMIT = 5;

export type PaginationResponse<T> = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	data: T[];
};

export type Author = {
	name: string;
	createdAt: number;
};

export type Book = {
	title: string;
	authorId: string;
	createdAt: number;
};

export type Review = {
	content: string;
	bookId: string;
	createdAt: number;
};

export type AuthorListItem = {
	id: string;
	name: string;
	booksCount: number;
};

export type BookListItem = {
	id: string;
	title: string;
	authorId: string;
	authorName: string | null;
};

export type ReviewListItem = {
	id: string;
	content: string;
	bookId: string;
	bookTitle: string | null;
	authorName: string | null;
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
