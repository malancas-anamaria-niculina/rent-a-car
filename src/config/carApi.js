import axios from "axios";

const BASE_URL = "https://localhost:7265/api/cars/past-events";

const carEventsApi = axios.create({
  baseURL: BASE_URL,
});

const carsHistory = async (carId) => {
  try {
    const response = await carEventsApi.get(`/${carId}`);
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
