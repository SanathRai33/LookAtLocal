import api from "./axios.js";

const jobApplicationApi = {
  createApplication: (data) => api.post("/job-applications", data),

  getMyApplications: (params = {}) =>
    api.get("/job-applications/my-applications", {
      params,
    }),

  getReceivedApplications: (params = {}) =>
    api.get("/job-applications/received", {
      params,
    }),

  getApplicationById: (applicationId) =>
    api.get(`/job-applications/${applicationId}`),

  reviewApplication: (applicationId) =>
    api.patch(`/job-applications/${applicationId}/review`),

  shortlistApplication: (applicationId) =>
    api.patch(`/job-applications/${applicationId}/shortlist`),

  acceptApplication: (applicationId) =>
    api.patch(`/job-applications/${applicationId}/accept`),

  rejectApplication: (applicationId) =>
    api.patch(`/job-applications/${applicationId}/reject`),

  withdrawApplication: (applicationId) =>
    api.patch(`/job-applications/${applicationId}/withdraw`),
};

export default jobApplicationApi;
