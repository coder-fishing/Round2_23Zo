import { authorsCollection, booksCollection } from "../models";
import { Author, Book, BookListItem, BookSelectOption, PAGE_LIMIT, PaginationResponse } from "../types";

export const getBookList = async (page: number): Promise<PaginationResponse<BookListItem>> => {
  const offset = (page - 1) * PAGE_LIMIT;

  const totalSnap = await booksCollection().count().get();
  const total = totalSnap.data().count;

  const snap = await booksCollection()
    .orderBy("title")
    .offset(offset)
    .limit(PAGE_LIMIT)
    .get();

  const data: BookListItem[] = await Promise.all(
    snap.docs.map(async (doc) => {
      const book = doc.data() as Book;
      const authorSnap = await authorsCollection().doc(book.authorId).get();
      const author = authorSnap.exists ? (authorSnap.data() as Author) : null;

      return {
        id: doc.id,
        title: book.title,
        authorId: book.authorId,
        authorName: author?.name ?? null
      };
    })
  );

  return {
    page,
    limit: PAGE_LIMIT,
    total,
    totalPages: Math.ceil(total / PAGE_LIMIT),
    data
  };
};

export const getBookSelectOptions = async (): Promise<BookSelectOption[]> => {
  const snap = await booksCollection().orderBy("title").get();

  return Promise.all(
    snap.docs.map(async (doc) => {
      const book = doc.data() as Book;
      const authorSnap = await authorsCollection().doc(book.authorId).get();
      const author = authorSnap.exists ? (authorSnap.data() as Author) : null;

      return {
        id: doc.id,
        title: book.title,
        authorName: author?.name ?? null
      };
    })
  );
};

export const createBookRecord = async (title: string, authorId: string) => {
  const author = await authorsCollection().doc(authorId).get();
  if (!author.exists) {
    return { authorNotFound: true as const };
  }

  const payload: Book = {
    title,
    authorId,
    createdAt: Date.now()
  };

  const doc = await booksCollection().add(payload);
  return { authorNotFound: false as const, id: doc.id };
};

export const updateBookRecord = async (id: string, title: string, authorId: string) => {
  const bookRef = booksCollection().doc(id);
  const bookDoc = await bookRef.get();

  if (!bookDoc.exists) {
    return { bookNotFound: true as const, authorNotFound: false as const };
  }

  const author = await authorsCollection().doc(authorId).get();
  if (!author.exists) {
    return { bookNotFound: false as const, authorNotFound: true as const };
  }

  await bookRef.update({ title, authorId });
  return { bookNotFound: false as const, authorNotFound: false as const };
};

export const deleteBookRecord = async (id: string) => {
  const bookRef = booksCollection().doc(id);
  const bookDoc = await bookRef.get();

  if (!bookDoc.exists) {
    return false;
  }

  await bookRef.delete();
  return true;
};
