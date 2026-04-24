import { Request, Response } from "express";
import {
  createAuthorRecord,
  deleteAuthorRecord,
  getAuthorList,
  getAuthorSelectOptions,
  updateAuthorRecord
} from "../services";

const parsePage = (value: unknown) => {
  const page = Number(value ?? 1);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const getAuthors = async (req: Request, res: Response) => {
  const page = parsePage(req.query.page);
  const response = await getAuthorList(page);

  res.json(response);
};

export const getAuthorOptions = async (_req: Request, res: Response) => {
  const data = await getAuthorSelectOptions();

  res.json(data);
};

export const createAuthor = async (req: Request, res: Response) => {
  const name = String(req.body?.name ?? "").trim();

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const doc = await createAuthorRecord(name);

  return res.status(201).json(doc);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const name = String(req.body?.name ?? "").trim();

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const updated = await updateAuthorRecord(id, name);
  if (!updated) {
    return res.status(404).json({ error: "author not found" });
  }

  return res.json({ message: "updated" });
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const deleted = await deleteAuthorRecord(id);
  if (!deleted) {
    return res.status(404).json({ error: "author not found" });
  }

  return res.json({ message: "deleted" });
};