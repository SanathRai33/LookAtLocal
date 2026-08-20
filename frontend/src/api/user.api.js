import api from './axios';

export const userApi = {
  getMyProfile: () => api.get('/users/me'),
  getPublicProfile: (userId) => api.get(`/users/${userId}`),
  updateMyProfile: (data) => api.patch('/users/me', data),
  updateMyAccountStatus: (status) => api.patch("/users/me/status", { status }),
  updateAvatar: (data) => api.patch('/users/me/avatar', data),
  deleteMyAccount: () => api.delete('/users/me'),
};