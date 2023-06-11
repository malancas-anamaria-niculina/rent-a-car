import { createContext, useState } from "react";
import { carsHistory } from "../config/carApi";
import dayjs from "dayjs";

const CarsContext = createContext();

const CarsProvider = ({ children }) => {
  const initialCar = {
    model: "",
    carType: "",
    odometer: null,
    year: null,
    availability: "",
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

  const handleCarsActivity = async () => {
    try {
      const carData = await carsHistory(1);
      setCarHistory({
        model: carData.rentingEvents[0].car.model,
        carType: carData.rentingEvents[0].car.type,
        odometer: `${carData.rentingEvents[0].car.odometer} km`,
        year: carData.rentingEvents[0].car.year,
        availability:
          carData.rentingEvents[0].car.isAvailable === true
            ? "Available"
            : "Not available",
        history: carData.rentingEvents.map((rentingEvent) => ({
          rentalStartDate: dayjs(rentingEvent.rentalStartDate).format(
            "YYYY-MM-DD, HH:mm:ss"
          ),
          rentalEndDate: dayjs(rentingEvent.rentalEndDate).format(
            "YYYY-MM-DD, HH:mm:ss"
          ),
          pricePerHour: `${rentingEvent.pricePerHour} lei`,
          estimatedRentingHours: rentingEvent.totalRentingHours.toPrecision(1),
          estimatedCost: `${rentingEvent.totalCost.toPrecision(3)} lei`,
        })),
      });
      console.log(carData);
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
