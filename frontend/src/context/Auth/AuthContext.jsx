import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../api/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    else localStorage.removeItem("accessToken");

    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    else localStorage.removeItem("refreshToken");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [accessToken, refreshToken, user]);

  const register = async (data) => {
    const res = await api.post("/register", data);

    if (res.data.data?.access_token) {
      setAccessToken(res.data.data.access_token);
    }
    if (res.data.data?.refresh_token) {
      setRefreshToken(res.data.data.refresh_token);
    }
    if (res.data.data?.user) {
      setUser(res.data.data.user);
    }

    return res;
  };

  const login = async (credentials) => {
    const res = await api.post("/login", credentials);
    if (res.data.data?.access_token) {
      setAccessToken(res.data.data.access_token);
    }
    if (res.data.data?.refresh_token) {
      setRefreshToken(res.data.data.refresh_token);
    }
    if (res.data.data?.user) {
      setUser(res.data.data.user);
    }
    return res;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(error.response?.data?.message);
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        register,
        setUser,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
