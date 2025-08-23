import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";

const Edit = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchUser = async () => {
    setLoading(true);
    try {
      const user = await UserService.getProfile();
      setForm((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired, please login again!");
        localStorage.clear();
        window.location.href = "/";
      } else {
        toast.error("Failed to fetch user data!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      if (!payload.password_confirmation) delete payload.password_confirmation;

      const response = await UserService.updateProfile(payload);

      toast.success(response.message || "Profile updated successfully!");

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        name: payload.name,
        email: payload.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(new Event("userUpdated"));

      setForm((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        Object.values(error.response.data.errors).forEach((errs) =>
          toast.error(errs[0])
        );
      } else if (error.response?.status === 401) {
        toast.error("Session expired, please login again!");
        localStorage.clear();
        window.location.href = "/";
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update profile!"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
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
