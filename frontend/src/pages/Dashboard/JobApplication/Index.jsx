import React, { useState } from "react";
import Layout from "../../../layouts/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useJobs from "../../../hooks/JobApplication/UseJobs";
import Create from "../JobApplication/create/Create";
import Edit from "../JobApplication/edit/Edit";
import ModalConfirm from "./modal/ModalConfirm";

const Index = () => {
  const {
    jobs,
    loading,
    modalCreate,
    modalEdit,
    currentJob,
    setModalCreate,
    setModalEdit,
    setCurrentJob,
    deleteJob,
  } = useJobs();

  const [modalDelete, setModalDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (jobToDelete) {
      await deleteJob(jobToDelete.id);
      setModalDelete(false);
      setJobToDelete(null);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setModalCreate(true)}>
            + Add Jobs
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Job data has not been entered yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Position</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Applied At</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.company_name}
                    </td>
                    <td className="px-6 py-4">{job.position}</td>
                    <td className="px-6 py-4">{job.type}</td>
                    <td className="px-6 py-4">{job.source}</td>
                    <td className="px-6 py-4">{job.applied_at}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          job.status
                        )}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-500 transition mb-3"
                        onClick={() => {
                          setCurrentJob(job);
                          setModalEdit(true);
                        }}>
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
                        onClick={() => {
                          setJobToDelete(job);
                          setModalDelete(true);
                        }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalCreate && <Create onClose={() => setModalCreate(false)} />}
      {modalEdit && currentJob && (
        <Edit job={currentJob} onClose={() => setModalEdit(false)} />
      )}
      <ModalConfirm
        isOpen={modalDelete}
        job={jobToDelete}
        onCancel={() => setModalDelete(false)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
};

export default Index;
