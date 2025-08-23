import React from "react";
import api from "../api/Axios";

export const register = async (data) => {
  return await api.post("/register", data);
};

export const login = async (data) => {
  const response = await api.post("/login", data);
  if (response.data.data?.access_token) {
    localStorage.setItem("accessToken", response.data.data.access_token);
  }
  if (response.data.data?.user) {
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }
  return response;
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
    error.response?.data?.message;
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
