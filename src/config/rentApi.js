import axios from "axios";

const BASE_URL = "https://localhost:7265/api/rent";

const rentApi = axios.create({
  baseURL: BASE_URL,
});

const bookACar = async (bookData) => {
  try {
    const response = await rentApi.post("/plan", bookData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const rentACar = async (carId) => {
  try {
    const response = await rentApi.post(`/${carId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { bookACar, rentACar };
