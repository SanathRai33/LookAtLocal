import api from './axios';

export const userApi = {
  getMyProfile: () => api.get('/users/me'),
  updateMyProfile: (data) => api.patch('/users/me', data),
  deleteMyAccount: () => api.delete('/users/me'),
  getPublicProfile: (userId) => api.get(`/users/${userId}`),
  updateAvatar: (data) => api.patch('/users/me/avatar', data),
};