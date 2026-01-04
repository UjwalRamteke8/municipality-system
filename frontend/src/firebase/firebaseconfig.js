import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // For realtime chat/IoT

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo8hNmUoELJjkyhFX0-mJqOqgypa6EFik",
  authDomain: "municipality-ad620.firebaseapp.com",
  databaseURL: "https://municipality-ad620-default-rtdb.firebaseio.com",
  projectId: "municipality-ad620",
  storageBucket: "municipality-ad620.appspot.com",
  messagingSenderId: "691158126168",
  appId: "1:691158126168:web:71c19a942aa4405bf4442d",
  measurementId: "G-M4M0DZDYRY",
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);
