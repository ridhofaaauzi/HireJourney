import api from "../api/Axios";

const UserService = {
  getProfile: async () => {
    const response = await api.get("/users");
    return response.data.data;
  },

  updateProfile: async (payload) => {
    const response = await api.put("/users/update", payload);
    return response.data;
  },
};

export default UserService;
