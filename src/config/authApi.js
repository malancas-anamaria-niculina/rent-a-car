import axios from "./axiosConfig";

const BASE_URL = "https://localhost:7265/api";

const authApi = axios.create({
  baseURL: BASE_URL,
});

const registerUser = async (userData) => {
  try {
    const response = await authApi.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await authApi.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { registerUser, loginUser };
