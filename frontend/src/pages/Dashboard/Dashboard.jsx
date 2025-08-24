import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import { useJobContext } from "../../context/JobApplication/JobContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { jobCounts, getStatusCount, loading } = useJobContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStatusCount();
      } catch (error) {
        toast.error("Failed to retrieve job data!");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const isEmpty = !jobCounts || Object.keys(jobCounts).length === 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-yellow-100 text-yellow-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : isEmpty ? (
        <p className="text-gray-500 text-center py-6">
          Job counts data has not been entered yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.keys(jobCounts).map((status) => (
            <div
              key={status}
              className={`p-6 rounded-lg shadow ${getStatusColor(status)}`}>
              <h2 className="text-lg font-semibold">{status}</h2>
              <p className="text-2xl font-bold mt-2">{jobCounts[status]}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
