import { authorsCollection, booksCollection, reviewsCollection } from "../models";
import { Author, Book, PAGE_LIMIT, PaginationResponse, Review, ReviewListItem } from "../types";

export const getReviewList = async (page: number): Promise<PaginationResponse<ReviewListItem>> => {
  const offset = (page - 1) * PAGE_LIMIT;

  const totalSnap = await reviewsCollection().count().get();
  const total = totalSnap.data().count;

  const snap = await reviewsCollection()
    .orderBy("createdAt", "desc")
    .offset(offset)
    .limit(PAGE_LIMIT)
    .get();

  const data: ReviewListItem[] = await Promise.all(
    snap.docs.map(async (doc) => {
      const review = doc.data() as Review;

      const bookSnap = await booksCollection().doc(review.bookId).get();
      const book = bookSnap.exists ? (bookSnap.data() as Book) : null;

      let author: Author | null = null;
      if (book?.authorId) {
        const authorSnap = await authorsCollection().doc(book.authorId).get();
        author = authorSnap.exists ? (authorSnap.data() as Author) : null;
      }

      return {
        id: doc.id,
        content: review.content,
        bookId: review.bookId,
        bookTitle: book?.title ?? null,
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

export const createReviewRecord = async (content: string, bookId: string) => {
  const book = await booksCollection().doc(bookId).get();
  if (!book.exists) {
    return { bookNotFound: true as const };
  }

  const payload: Review = {
    content,
    bookId,
    createdAt: Date.now()
  };

  const doc = await reviewsCollection().add(payload);
  return { bookNotFound: false as const, id: doc.id };
};

export const updateReviewRecord = async (id: string, content: string, bookId: string) => {
  const reviewRef = reviewsCollection().doc(id);
  const reviewDoc = await reviewRef.get();

  if (!reviewDoc.exists) {
    return { reviewNotFound: true as const, bookNotFound: false as const };
  }

  const book = await booksCollection().doc(bookId).get();
  if (!book.exists) {
    return { reviewNotFound: false as const, bookNotFound: true as const };
  }

  await reviewRef.update({ content, bookId });
  return { reviewNotFound: false as const, bookNotFound: false as const };
};

export const deleteReviewRecord = async (id: string) => {
  const reviewRef = reviewsCollection().doc(id);
  const reviewDoc = await reviewRef.get();

  if (!reviewDoc.exists) {
    return false;
  }

  await reviewRef.delete();
  return true;
};
