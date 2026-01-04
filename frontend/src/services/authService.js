import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseconfig";

const authService = {
  async register(data) {
    const { email, password, firstName, lastName, ...rest } = data;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      ...rest,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return { user: userData };
  },

  async login({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      throw new Error("User profile not found in Firestore.");
    }

    return { user: snap.data() };
  },

  async logout() {
    await signOut(auth);
  },

  async getCurrentUser() {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      return snap.exists() ? snap.data() : null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  async getIdToken(forceRefresh = false) {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      return await user.getIdToken(forceRefresh);
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  },

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },
};

export default authService;
