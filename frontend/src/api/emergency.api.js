import api from './axios';

export const emergencyApi = {
  createEmergencyRequest: (data) => api.post('/emergency', data),
  getEmergencyRequests: (params) => api.get('/emergency', { params }),
  getMyEmergencyRequests: (params) => api.get('/emergency/my-requests', { params }),
  getEmergencyRequestById: (emergencyId) => api.get(`/emergency/${emergencyId}`),
  updateEmergencyRequest: (emergencyId, data) => api.patch(`/emergency/${emergencyId}`, data),
  deleteEmergencyRequest: (emergencyId) => api.delete(`/emergency/${emergencyId}`),
  resolveEmergencyRequest: (emergencyId) => api.post(`/emergency/${emergencyId}/resolve`),
};