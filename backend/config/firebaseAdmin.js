// backend/config/firebaseAdmin.js

import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert to absolute path correctly
const serviceAccountPath = path.join(
  __dirname,
  "..",
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH
);

console.log("Firebase JSON Path:", serviceAccountPath);

// Read JSON manually (avoids ESM Windows import error)
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("✅ Firebase Admin initialized successfully");
}

export default admin;
