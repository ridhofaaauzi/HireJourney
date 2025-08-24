import { useEffect, useState } from "react";
import { useJobContext } from "../../context/JobApplication/JobContext";

const useJobs = () => {
  const {
    jobs,
    pagination,
    loading,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
  } = useJobContext();

  const [currentJob, setCurrentJob] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllJobs(page);
  }, [page]);

  return {
    jobs,
    pagination,
    loading,
    page,
    setPage,
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
