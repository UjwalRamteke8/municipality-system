import admin from "firebase-admin";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeFirebase = async () => {
  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    if (!serviceAccountPath) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is missing in .env");
    }

    // Resolve the absolute path
    const resolvedPath = path.resolve(__dirname, "../../", serviceAccountPath);
    const serviceAccount = JSON.parse(await readFile(resolvedPath, "utf8"));

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("✅ Firebase Admin initialized successfully");
    }
  } catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
  }
};

initializeFirebase();

export default admin;
