import { auth } from "../firebase/firebaseconfig";

export async function getFreshToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  // Force refresh = true
  return await user.getIdToken(true);
}
