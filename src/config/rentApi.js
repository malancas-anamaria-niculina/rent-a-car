import axios from "axios";

const BASE_URL = "https://localhost:7265/api/rent";

const rentApi = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
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

const finishRent = async (carId) => {
  try {
    const response = await rentApi.post(`/${carId}/finish`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const cancelABook = async (carId) => {
  try {
    const response = await rentApi.post(`/${carId}/cancel`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { bookACar, rentACar, finishRent, cancelABook };
