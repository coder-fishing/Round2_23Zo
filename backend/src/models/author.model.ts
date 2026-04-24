import { db } from "../firebase";

export const AUTHORS_COLLECTION = "authors";

export const authorsCollection = () => db.collection(AUTHORS_COLLECTION);