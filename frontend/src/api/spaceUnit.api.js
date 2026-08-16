import api from './axios';

export const spaceUnitApi = {
  createSpaceUnit: (spaceId, data) => api.post(`/spaces/${spaceId}/units`, data),
  getSpaceUnits: (spaceId, params) => api.get(`/spaces/${spaceId}/units`, { params }),
  getSpaceUnitById: (spaceId, unitId) => api.get(`/spaces/${spaceId}/units/${unitId}`),
  updateSpaceUnit: (spaceId, unitId, data) => api.patch(`/spaces/${spaceId}/units/${unitId}`, data),
  deleteSpaceUnit: (spaceId, unitId) => api.delete(`/spaces/${spaceId}/units/${unitId}`),
};