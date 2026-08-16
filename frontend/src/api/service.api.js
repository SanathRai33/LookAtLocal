import api from "./axios";

export const serviceApi = {
  createService: (data) => api.post("/services", data),
  getServices: (params) => api.get("/services", { params }),
  getMyServices: (params) => api.get("/services/my-listings", { params }),
  getServiceById: (serviceId) => api.get(`/services/${serviceId}`),
  updateService: (serviceId, data) => api.patch(`/services/${serviceId}`, data),
  deleteService: (serviceId) => api.delete(`/services/${serviceId}`),
};
