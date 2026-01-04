export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getStoredUser = () =>
  JSON.parse(localStorage.getItem("user") || "null");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
