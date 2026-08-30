import api from "./axios";

export const favoriteApi = {
  addFavorite: (data) => api.post("/favorites", data),

  getFavorites: (params) => api.get("/favorites", { params }),

  removeFavorite: (entityType, entityId) =>
    api.delete(`/favorites/${entityType}/${entityId}`),
};
