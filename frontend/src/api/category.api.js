import api from "./axios";

export const categoryApi = {
  getCategories: (params) => api.get("/categories", { params }),
  getCategoryById: (categoryId) => api.get(`/categories/${categoryId}`),
};
