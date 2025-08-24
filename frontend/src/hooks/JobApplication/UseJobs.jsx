import { useEffect, useState } from "react";
import { useJobContext } from "../../context/JobApplication/JobContext";

const useJobs = () => {
  const { jobs, loading, getAllJobs, createJob, updateJob, deleteJob } =
    useJobContext();
  const [currentJob, setCurrentJob] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    getAllJobs();
  }, []);

  return {
    jobs,
    loading,
    currentJob,
    modalCreate,
    modalEdit,
    setCurrentJob,
    setModalCreate,
    setModalEdit,
    createJob,
    updateJob,
    deleteJob,
  };
};

export default useJobs;
