import React from "react";
import api from "../api/Axios";

const JobApplicationService = {
  getAll: async () => {
    const response = await api.get("/job-applications");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/job-applications", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/job-applications/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/job-applications/${id}`);
    return response.data;
  },

  getStatusCount: async () => {
    const response = await api.get("/job-applications/status-count");
    return response.data;
  },
};
export default JobApplicationService;
