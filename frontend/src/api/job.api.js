import api from './axios';

export const jobApi = {
  createJob: (data) => api.post('/jobs', data),
  getJobs: (params) => api.get('/jobs', { params }),
  getMyJobs: (params) => api.get('/jobs/my-listings', { params }),
  getJobById: (jobId) => api.get(`/jobs/${jobId}`),
  updateJob: (jobId, data) => api.patch(`/jobs/${jobId}`, data),
  deleteJob: (jobId) => api.delete(`/jobs/${jobId}`),
};