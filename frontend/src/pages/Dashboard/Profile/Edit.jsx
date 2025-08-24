import React from "react";
import Layout from "../../../layouts/Layout";
import useProfile from "../../../hooks/User/UseProfile";

const Edit = () => {
  const { form, errors, loading, submitting, handleChange, handleSubmit } =
    useProfile();

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className={`w-full border px-3 py-2 rounded ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                name="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={`w-full border px-3 py-2 rounded ${
                  errors.password_confirmation ? "border-red-500" : ""
                }`}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={submitting}>
                {submitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Edit;
