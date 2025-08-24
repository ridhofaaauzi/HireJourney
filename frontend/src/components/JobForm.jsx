import React from "react";

const JobForm = ({
  form,
  errors,
  handleChange,
  loading,
  onSubmit,
  onClose,
  mode,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Add Job" : "Edit Job"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
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
              {loading
                ? mode === "create"
                  ? "Saving..."
                  : "Updating..."
                : mode === "create"
                ? "Save"
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
