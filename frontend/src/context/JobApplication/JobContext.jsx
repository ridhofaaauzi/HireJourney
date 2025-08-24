import { createContext, useContext, useState } from "react";
import api from "../../api/Axios";
import { toast } from "react-toastify";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/job-applications");
      setJobs(res.data);
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired, please login again!");
        localStorage.clear();
        window.location.href = "/";
      } else {
        toast.error("Failed to fetch jobs!");
      }
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (data) => {
    try {
      const res = await api.post("/job-applications", data);
      toast.success("Job created successfully!");
      getAllJobs();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job!");
    }
  };

  const updateJob = async (id, data) => {
    try {
      const res = await api.put(`/job-applications/${id}`, data);
      toast.success("Job updated successfully!");
      getAllJobs();
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job!");
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/job-applications/${id}`);
      toast.success("Job deleted successfully!");
      getAllJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job!");
    }
  };

  const getStatusCount = async () => {
    setLoading(true);
    try {
      const res = await api.get("/job-applications/status-count");
      setJobCounts(res.data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get count job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        jobCounts,
        loading,
        getAllJobs,
        createJob,
        updateJob,
        deleteJob,
        getStatusCount,
      }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
