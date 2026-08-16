import api from "./axios";

export const spaceApi = {
  createSpace: (data) => api.post("/spaces", data),
  getSpaces: (params) => api.get("/spaces", { params }),
  getMySpaces: (params) => api.get("/spaces/my-listings", { params }),
  getSpaceById: (spaceId) => api.get(`/spaces/${spaceId}`),
  updateSpace: (spaceId, data) => api.patch(`/spaces/${spaceId}`, data),
  deleteSpace: (spaceId) => api.delete(`/spaces/${spaceId}`),
};
