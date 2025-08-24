import { createContext, useContext, useState } from "react";
import api from "../../api/Axios";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser: setAuthUser } = useAuth();

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUser(res.data.data);
      setAuthUser(res.data.data);
      return res.data.data;
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

  const updateProfile = async (payload) => {
    try {
      setLoading(true);

      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v !== "")
      );

      const res = await api.put("/users/update", filteredPayload);

      const updatedUser = { ...user, ...filteredPayload };

      setUser(updatedUser);
      setAuthUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(res.data.message || "Profile updated successfully!");
      return res.data;
    } catch (error) {
      if (error.response?.status === 422) {
        throw error.response.data.errors;
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
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, getProfile, setUser, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
