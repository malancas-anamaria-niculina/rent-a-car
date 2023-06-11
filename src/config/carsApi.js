import axios from "./axiosConfig";

const BASE_URL = "https://localhost:7265/api/cars";

const carsApi = axios.create({
  baseURL: BASE_URL,
});

const getAllCars = async () => {
  try {
    const response = await carsApi.get("/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { getAllCars };
