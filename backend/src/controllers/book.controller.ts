import { Request, Response } from "express";
import {
  createBookRecord,
  deleteBookRecord,
  getBookList,
  getBookSelectOptions,
  updateBookRecord
} from "../services";

const parsePage = (value: unknown) => {
  const page = Number(value ?? 1);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const getBooks = async (req: Request, res: Response) => {
  const page = parsePage(req.query.page);
  const response = await getBookList(page);

  res.json(response);
};

export const getBookOptions = async (_req: Request, res: Response) => {
  const data = await getBookSelectOptions();

  res.json(data);
};

export const createBook = async (req: Request, res: Response) => {
  const title = String(req.body?.title ?? "").trim();
  const authorId = String(req.body?.authorId ?? "").trim();

  if (!title || !authorId) {
    return res.status(400).json({ error: "title and authorId are required" });
  }

  const result = await createBookRecord(title, authorId);
  if (result.authorNotFound) {
    return res.status(404).json({ error: "author not found" });
  }

  return res.status(201).json({ id: result.id });
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const deleted = await deleteBookRecord(id);
  if (!deleted) {
    return res.status(404).json({ error: "book not found" });
  }

  return res.json({ message: "deleted" });
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const title = String(req.body?.title ?? "").trim();
  const authorId = String(req.body?.authorId ?? "").trim();

  if (!title || !authorId) {
    return res.status(400).json({ error: "title and authorId are required" });
  }

  const result = await updateBookRecord(id, title, authorId);
  if (result.bookNotFound) {
    return res.status(404).json({ error: "book not found" });
  }
  if (result.authorNotFound) {
    return res.status(404).json({ error: "author not found" });
  }

  return res.json({ message: "updated" });
};