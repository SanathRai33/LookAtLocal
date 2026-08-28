import api from "./axios.js";

const pointsApi = {
  getSummary: () => api.get("/points"),

  getHistory: (params = {}) =>
    api.get("/points/history", {
      params,
    }),
};

export default pointsApi;
