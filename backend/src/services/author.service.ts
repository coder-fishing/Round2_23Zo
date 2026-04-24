import { authorsCollection, booksCollection } from "../models";
import { Author, AuthorListItem, PAGE_LIMIT, PaginationResponse, SelectOption } from "../types";

export const getAuthorList = async (page: number): Promise<PaginationResponse<AuthorListItem>> => {
  const offset = (page - 1) * PAGE_LIMIT;

  const totalSnap = await authorsCollection().count().get();
  const total = totalSnap.data().count;

  const snap = await authorsCollection()
    .orderBy("name")
    .offset(offset)
    .limit(PAGE_LIMIT)
    .get();

  const data: AuthorListItem[] = await Promise.all(
    snap.docs.map(async (doc) => {
      const books = await booksCollection().where("authorId", "==", doc.id).get();
      const author = doc.data() as Author;

      return {
        id: doc.id,
        name: author.name,
        booksCount: books.size
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

export const getAuthorSelectOptions = async (): Promise<SelectOption[]> => {
  const snap = await authorsCollection().orderBy("name").get();

  return snap.docs.map((doc) => {
    const author = doc.data() as Author;
    return {
      id: doc.id,
      name: author.name
    };
  });
};

export const createAuthorRecord = async (name: string) => {
  const payload: Author = {
    name,
    createdAt: Date.now()
  };

  const doc = await authorsCollection().add(payload);
  return { id: doc.id };
};

export const updateAuthorRecord = async (id: string, name: string) => {
  const authorRef = authorsCollection().doc(id);
  const authorDoc = await authorRef.get();

  if (!authorDoc.exists) {
    return false;
  }

  await authorRef.update({ name });
  return true;
};

export const deleteAuthorRecord = async (id: string) => {
  const authorRef = authorsCollection().doc(id);
  const authorDoc = await authorRef.get();

  if (!authorDoc.exists) {
    return false;
  }

  await authorRef.delete();
  return true;
};
