import axios from "axios";

const BASE_URL = "https://localhost:7265/api/cars";

const carEventsApi = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
});

const carsHistory = async (carId) => {
  try {
    const response = await carEventsApi.get(`/past-events/${carId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const carIds = async () => {
  try {
    const response = await carEventsApi.get();
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { carsHistory, carIds };
