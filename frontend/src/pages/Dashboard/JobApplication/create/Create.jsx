import React, { useState } from "react";
import JobApplicationService from "../../../../services/JobApplicationService";
import { toast } from "react-toastify";

const Create = ({ onClose }) => {
  const [form, setForm] = useState({
    company_name: "",
    position: "",
    type: "Full Time",
    source: "",
    applied_at: "",
    status: "Applied",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.company_name.trim())
      newErrors.company_name = ["Company name is required"];
    if (!form.position.trim()) newErrors.position = ["Position is required"];
    if (!form.source.trim()) newErrors.source = ["Source is required"];
    if (!form.applied_at) newErrors.applied_at = ["Applied date is required"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let appliedAt = form.applied_at;
      if (appliedAt) {
        const date = new Date(appliedAt);
        appliedAt = date.toISOString().slice(0, 19).replace("T", " ");
      }

      const payload = {
        ...form,
        applied_at: appliedAt,
      };

      await JobApplicationService.create(payload);
      toast.success("Job successfully added!");
      onClose();
    } catch (error) {
      console.error("Error details:", error);

      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors;
        setErrors(serverErrors);
        const firstErrorKey = Object.keys(serverErrors)[0];
        if (firstErrorKey) {
          toast.error(serverErrors[firstErrorKey][0]);
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to add job!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="company_name"
              placeholder="Company Name"
              value={form.company_name}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.company_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.company_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_name[0]}
              </p>
            )}
          </div>

          <div>
            <input
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.position ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position[0]}</p>
            )}
          </div>

          <div>
            <select
              name="type"
              onChange={handleChange}
              value={form.type}
              className="w-full border px-3 py-2 rounded border-gray-300">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
            )}
          </div>

          <div>
            <input
              name="source"
              placeholder="Source"
              value={form.source}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.source ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.source && (
              <p className="text-red-500 text-sm mt-1">{errors.source[0]}</p>
            )}
          </div>

          <div>
            <input
              type="datetime-local"
              name="applied_at"
              value={form.applied_at}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.applied_at ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.applied_at && (
              <p className="text-red-500 text-sm mt-1">
                {errors.applied_at[0]}
              </p>
            )}
          </div>

          <div>
            <select
              name="status"
              onChange={handleChange}
              value={form.status}
              className="w-full border px-3 py-2 rounded border-gray-300">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status[0]}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
