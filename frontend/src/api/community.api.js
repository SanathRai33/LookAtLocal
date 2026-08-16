import api from './axios';

export const communityApi = {
  createCommunityPost: (data) => api.post('/community', data),
  getCommunityPosts: (params) => api.get('/community', { params }),
  getCommunityPostById: (postId) => api.get(`/community/${postId}`),
  updateCommunityPost: (postId, data) => api.patch(`/community/${postId}`, data),
  deleteCommunityPost: (postId) => api.delete(`/community/${postId}`),
};