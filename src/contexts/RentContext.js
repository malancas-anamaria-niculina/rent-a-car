import { createContext, useState } from "react";
import { rentACar, bookACar, finishRent, cancelABook } from "../config/rentApi";
import { getAllCars } from "../config/carsApi";
import { currentRent } from "../config/userApi";

const RentContext = createContext();

const RentProvider = ({ children }) => {
  const initialRentData = {
    message: "",
    rentingEvent: "",
    rentingEvents: "",
    car: "",
    cars: "",
    error: "",
  };
  const [rentData, setRentData] = useState(initialRentData);

  const handleGetCars = async () => {
    try {
      const { cars } = await getAllCars();
      setRentData({ ...rentData, error: "", cars });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error:
          error.message || "There is something wrong with the cars getting",
      });
      console.error("Cars getting failed: ", error.message);
    }
  };

  const handleRent = async (carId) => {
    try {
      const { rentingEvent, car, message } = await rentACar(carId);
      const rentCars = rentData.cars.filter((car) => car.id !== carId);
      setRentData({
        ...rentData,
        message,
        error: "",
        rentingEvent,
        car,
        cars: [...rentCars, car],
      });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your booking",
      });
      console.error("Registration failed: ", error.message);
    }
  };

  const handleBook = async (carId, startDate, endDate) => {
    try {
      const { rentingEvent, car, message } = await bookACar({
        carId,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
      });
      const rentCars = rentData.cars.filter((car) => car.id !== carId);
      setRentData({
        ...rentData,
        message,
        error: "",
        rentingEvent,
        car,
        cars: [...rentCars, car],
      });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your booking",
      });
      console.error("Booking failed: ", error.message);
    }
  };

  const handleCancel = async (carId) => {
    try {
      const { rentingEvent, car, message } = await cancelABook(carId);
      const rentCars = rentData.cars.filter((car) => car.id !== carId);
      setRentData({
        ...rentData,
        message,
        rentingEvent,
        error: "",
        car,
        cars: [...rentCars, car],
      });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your booking",
      });
      console.error("Booking failed: ", error.message);
    }
  };

  const handleFinish = async (carId) => {
    try {
      const { rentingEvent, car, message } = await finishRent(carId);
      const rentCars = rentData.cars.filter((car) => car.id !== carId);
      setRentData({
        ...rentData,
        message,
        error: "",
        rentingEvent,
        car,
        cars: [...rentCars, car],
      });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your renting",
      });
      console.error("Finish renting failed: ", error.message);
    }
  };

  const handleCurrentRent = async () => {
    try {
      const { rentingEvent, message } = await currentRent();
      setRentData({
        ...rentData,
        message,
        error: "",
        rentingEvent,
      });
      console.log(rentingEvent, message);
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your renting",
      });
      console.error("Finish renting failed: ", error.message);
    }
  };

  const handleRentError = (value) => setRentData({ ...rentData, error: value });

  const handleRentMessage = (value) =>
    setRentData({ ...rentData, message: value });

  const rentContextValue = {
    rentData,
    handleRent,
    handleBook,
    handleCancel,
    handleGetCars,
    handleFinish,
    handleRentError,
    handleRentMessage,
    handleCurrentRent,
  };

  return (
    <RentContext.Provider value={rentContextValue}>
      {children}
    </RentContext.Provider>
  );
};

export { RentProvider };

export default RentContext;
