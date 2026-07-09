import api from "./api";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const getProfile = () => {
  return api.get("/auth/profile");
};

export const updateProfile = (userData) => {
  return api.put("/auth/profile", userData);
};

export const changePassword = (passwordData) => {
  return api.put("/auth/change-password", passwordData);
};