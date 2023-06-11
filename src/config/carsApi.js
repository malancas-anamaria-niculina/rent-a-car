import axios from "axios";

const BASE_URL = "https://localhost:7265/api/cars";

const carsApi = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
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
