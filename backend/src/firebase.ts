import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve(__dirname, "../serviceAccountKey.json");

const initializeFirebase = () => {
  try {
    if (fs.existsSync(serviceAccountPath)) {
      const raw = fs.readFileSync(serviceAccountPath, "utf8").trim();

      if (raw) {
        const serviceAccount = JSON.parse(raw) as admin.ServiceAccount;

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        return;
      }
    }

    admin.initializeApp();
  } catch (error) {
    console.warn("Invalid serviceAccountKey.json. Falling back to default credentials.", error);
    admin.initializeApp();
  }
};

initializeFirebase();

export const db = admin.firestore();