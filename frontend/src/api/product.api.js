import api from "./axios";

export const productApi = {
  createProduct: (data) => api.post("/products", data),
  getProducts: (params) => api.get("/products", { params }),
  getMyProducts: (params) => api.get("/products/my-listings", { params }),
  getProductById: (productId) => api.get(`/products/${productId}`),
  updateProduct: (productId, data) => api.patch(`/products/${productId}`, data),
  deleteProduct: (productId) => api.delete(`/products/${productId}`),
};
