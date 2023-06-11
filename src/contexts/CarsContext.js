import { createContext, useState } from "react";
import { carsHistory } from "../config/carApi";
import dayjs from "dayjs";

const CarsContext = createContext();

const CarsProvider = ({ children }) => {
  const initialCar = {
    isData: false,
    model: "",
    carType: "",
    odometer: null,
    year: null,
    availability: "",
    user: null,
    history: [
      {
        rentalStartDate: "",
        rentalEndDate: "",
        pricePerHour: null,
        estimatedRentingHours: null,
        estimatedCost: null,
      },
    ],
  };

  const [carHistory, setCarHistory] = useState(initialCar);

  const handleCarsActivity = async (carId) => {
    try {
      const carData = await carsHistory(carId);
      setCarHistory({
        isData: true,
        model: carData.rentingEvents[0].car.model,
        carType: carData.rentingEvents[0].car.carType.type,
        odometer: `${carData.rentingEvents[0].car.odometer} km`,
        year: carData.rentingEvents[0].car.year,
        availability:
          carData.rentingEvents[0].car.isAvailable === true
            ? "Available"
            : "Not available",
        history: carData.rentingEvents.map((rentingEvent) => ({
          user: rentingEvent.owner.userName,
          rentalStartHour: dayjs(rentingEvent.rentalStartDate).format(
            "HH:mm:ss"
          ),
          rentalEndHour: dayjs(rentingEvent.rentalEndDate).format("HH:mm:ss"),
          rentalStartDate: dayjs(rentingEvent.rentalStartDate).format(
            "YYYY-MM-DD"
          ),
          rentalEndDate: dayjs(rentingEvent.rentalEndDate).format("YYYY-MM-DD"),
          pricePerHour: `${rentingEvent.pricePerHour} RON`,
          estimatedRentingHours: rentingEvent.totalRentingHours.toPrecision(1),
          estimatedCost: `${rentingEvent.totalCost.toPrecision(3)} RON`,
        })),
      });
    } catch (error) {
      console.error("The data could not be retrieved: ", error.message);
    }
  };

  const carsContextValue = {
    carHistory,
    handleCarsActivity,
  };

  return (
    <CarsContext.Provider value={carsContextValue}>
      {children}
    </CarsContext.Provider>
  );
};

export { CarsProvider };

export default CarsContext;
