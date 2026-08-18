import api from "./axios";

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  refreshToken: () => api.post("/auth/refresh"),
  logout: () => api.post("/auth/logout"),
  changePassword: (data) => api.patch("/auth/change-password", data),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  sendVerificationEmail: () => api.post("/auth/send-verification-email"),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }),
};
