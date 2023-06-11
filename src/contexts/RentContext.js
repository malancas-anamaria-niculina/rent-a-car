import { createContext, useState } from "react";
import { rentACar, bookACar } from "../config/rentApi";
import { getAllCars } from "../config/carsApi";

const RentContext = createContext();

const RentProvider = ({ children }) => {
  const initialRentData = {
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
      console.log(cars);
      setRentData({ ...rentData, cars });
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
      const { rentingEvent, car } = await rentACar(carId);
      console.log(rentData.cars.filter((car) => car.id !== carId).push(car));
      console.log(rentingEvent);
      setRentData({
        ...rentData,
        rentingEvent,
        car,
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
      const { rentingEvent } = await bookACar({
        carId,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
      });
      console.log(rentingEvent);
      setRentData({ ...rentData, rentingEvent });
    } catch (error) {
      setRentData({
        ...initialRentData,
        error: error.message || "There is something word with your booking",
      });
      console.error("Booking failed: ", error.message);
    }
  };

  const rentContextValue = {
    rentData,
    handleRent,
    handleBook,
    handleGetCars,
  };

  return (
    <RentContext.Provider value={rentContextValue}>
      {children}
    </RentContext.Provider>
  );
};

export { RentProvider };

export default RentContext;
