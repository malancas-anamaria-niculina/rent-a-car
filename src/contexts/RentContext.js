import { createContext, useState } from "react";
import { rentACar, bookACar } from "../config/rentApi";

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

  const handleRent = async (carId) => {
    try {
      const { rentingEvent } = await rentACar(carId);
      console.log(rentingEvent);
      setRentData({ ...rentData, rentingEvent });
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
  };

  return (
    <RentContext.Provider value={rentContextValue}>
      {children}
    </RentContext.Provider>
  );
};

export { RentProvider };

export default RentContext;
