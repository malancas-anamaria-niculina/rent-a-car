import { createContext, useState } from "react";
import { pastEvents, plannedEvents } from "../config/userApi";
import dayjs from "dayjs";

const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const initialActivity = [
    {
      model: "",
      carType: "",
      odometer: null,
      year: null,
      activity: [
        {
          rentalStartDate: "",
          rentalEndDate: "",
          rentalStartHour: "",
          rentalEndHour: "",
          pricePerHour: null,
          estimatedRentingHours: null,
          estimatedCost: null,
        },
      ],
    },
  ];

  const [activity, setActivity] = useState(initialActivity);

  const handleActivity = async () => {
    try {
      const activityData = await plannedEvents();
      setActivity(
        activityData.rentingEvents.map((plannedEvent) => ({
          model: plannedEvent.car.model,
          carType: plannedEvent.car.carType,
          odometer: `${plannedEvent.car.odometer} km`,
          year: plannedEvent.car.year,
          activity: [
            {
              rentalStartDate: dayjs(plannedEvent.rentalStartDate).format(
                "YYYY-MM-DD"
              ),
              rentalEndDate: dayjs(plannedEvent.rentalEndDate).format(
                "YYYY-MM-DD"
              ),
              rentalStartHour: dayjs(plannedEvent.rentalStartDate).format(
                "HH:mm:ss"
              ),
              rentalEndHour: dayjs(plannedEvent.rentalEndDate).format(
                "HH:mm:ss"
              ),
              pricePerHour: `${plannedEvent.pricePerHour} lei`,
              estimatedRentingHours:
                plannedEvent.totalRentingHours.toPrecision(1),
              estimatedCost: `${plannedEvent.totalCost.toPrecision(3)} lei`,
            },
          ],
        }))
      );
    } catch (error) {
      console.error("The data could not be retrieved: ", error.message);
    }
  };

  const handlePastActivity = async () => {
    try {
      const activityData = await pastEvents();

      let hashmap = new Map();
      activityData.rentingEvents.forEach((element) => {
        if (hashmap[element.carId] === void 0) {
          hashmap[element.carId] = [];
        }
        hashmap[element.carId].push({
          rentalStartDate: dayjs(element.rentalStartDate).format("YYYY-MM-DD"),
          rentalEndDate: dayjs(element.rentalEndDate).format("YYYY-MM-DD"),
          rentalStartHour: dayjs(element.rentalStartDate).format("HH:mm:ss"),
          rentalEndHour: dayjs(element.rentalEndDate).format("HH:mm:ss"),
          pricePerHour: `${element.pricePerHour} lei`,
          totalRentingHours: element.totalRentingHours.toPrecision(1),
          totalCost: `${element.totalCost.toPrecision(3)} lei`,
        });
      });

      setActivity(
        activityData.rentingEvents
          .map((plannedEvent) => ({
            model: plannedEvent.car.model,
            carType: plannedEvent.car.carType,
            odometer: `${plannedEvent.car.odometer} km`,
            year: plannedEvent.car.year,
            activity: hashmap[plannedEvent.carId],
          }))
          .filter(
            (element, index, self) =>
              index ===
              self.findIndex(
                (e) => e.model === element.model && e.year === element.year
              )
          )
      );
    } catch (error) {
      console.error("The data could not be retrieved: ", error.message);
    }
  };

  const activityContextValue = {
    activity,
    handleActivity,
    handlePastActivity,
  };

  return (
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

export { ActivityProvider };

export default ActivityContext;
