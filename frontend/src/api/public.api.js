import api from "./axios";

export const publicApi = {
  getStats: () => api.get("/public/stats"),
  getPublicData: () => api.get("/public/latest"),
};
