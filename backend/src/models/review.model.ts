import { db } from "../firebase";

export const REVIEWS_COLLECTION = "reviews";

export const reviewsCollection = () => db.collection(REVIEWS_COLLECTION);
