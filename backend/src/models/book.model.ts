import { db } from "../firebase";

export const BOOKS_COLLECTION = "books";

export const booksCollection = () => db.collection(BOOKS_COLLECTION);
