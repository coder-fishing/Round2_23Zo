export type SectionKey = "authors" | "books" | "reviews";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api";

const parseError = async (res: Response) => {
  try {
    const payload = (await res.json()) as { error?: string; message?: string };
    return payload?.error || payload?.message || "Request failed";
  } catch {
    return "Request failed";
  }
};

export const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return (await res.json()) as T;
};

export const getListPath = (section: SectionKey, page: number) => {
  if (section === "authors") return `/authors?page=${page}`;
  if (section === "books") return `/books?page=${page}`;
  return `/reviews?page=${page}`;
};
