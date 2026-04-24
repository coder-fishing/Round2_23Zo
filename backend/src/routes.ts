import { Router } from "express";
import {
  getAuthors, getAuthorOptions, createAuthor, updateAuthor, deleteAuthor
} from "./controllers/author.controller";

import {
  getBooks, getBookOptions, createBook, updateBook, deleteBook
} from "./controllers/book.controller";

import {
  getReviews, createReview, updateReview, deleteReview
} from "./controllers/review.controller";

const router = Router();

/* AUTHOR */
router.get("/authors", getAuthors);
router.get("/authors/options", getAuthorOptions);
router.post("/authors", createAuthor);
router.put("/authors/:id", updateAuthor);
router.delete("/authors/:id", deleteAuthor);

/* BOOK */
router.get("/books", getBooks);
router.get("/books/options", getBookOptions);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

/* REVIEW */
router.get("/reviews", getReviews);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;