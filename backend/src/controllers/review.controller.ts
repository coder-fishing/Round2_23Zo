import { Request, Response } from "express";
import {
  createReviewRecord,
  deleteReviewRecord,
  getReviewList,
  updateReviewRecord
} from "../services";

const parsePage = (value: unknown) => {
  const page = Number(value ?? 1);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const getReviews = async (req: Request, res: Response) => {
  const page = parsePage(req.query.page);
  const response = await getReviewList(page);

  res.json(response);
};

export const createReview = async (req: Request, res: Response) => {
  const content = String(req.body?.content ?? "").trim();
  const bookId = String(req.body?.bookId ?? "").trim();

  if (!content || !bookId) {
    return res.status(400).json({ error: "content and bookId are required" });
  }

  const result = await createReviewRecord(content, bookId);
  if (result.bookNotFound) {
    return res.status(404).json({ error: "book not found" });
  }

  return res.status(201).json({ id: result.id });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const deleted = await deleteReviewRecord(id);
  if (!deleted) {
    return res.status(404).json({ error: "review not found" });
  }

  return res.json({ message: "deleted" });
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const content = String(req.body?.content ?? "").trim();
  const bookId = String(req.body?.bookId ?? "").trim();

  if (!content || !bookId) {
    return res.status(400).json({ error: "content and bookId are required" });
  }

  const result = await updateReviewRecord(id, content, bookId);
  if (result.reviewNotFound) {
    return res.status(404).json({ error: "review not found" });
  }
  if (result.bookNotFound) {
    return res.status(404).json({ error: "book not found" });
  }

  return res.json({ message: "updated" });
};