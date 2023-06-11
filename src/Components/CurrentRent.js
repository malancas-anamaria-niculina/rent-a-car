import React, { useContext } from "react";
import { Card, Typography } from "@mui/material";
import RentContext from "../contexts/RentContext";
import dayjs from "dayjs";

const CurrentRent = () => {
  const {
    rentData: { rentingEvent },
  } = useContext(RentContext);

  return (
    !!rentingEvent && (
      <Card
        style={{
          maxWidth: "30%",
          minWidth: "20%",
          minHeight: 320,
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          textAlign: "left",
          padding: 20,
        }}
      >
        {console.log(rentingEvent)}
        <Typography variant="h5">Current rent details</Typography>
        <Typography variant="h6">
          Car model: {rentingEvent.car.model}
        </Typography>
        <Typography variant="h6">
          Time spent: {rentingEvent.currentRentingHours.toPrecision(2) * 60}{" "}
          minutes
        </Typography>
        <Typography variant="h6">
          Cost: {rentingEvent.currentRentingCost.toPrecision(2)} RON
        </Typography>
        <Typography variant="h6">
          Start Time:{" "}
          {dayjs(rentingEvent.rentalStartDate).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </Card>
    )
  );
};

export default CurrentRent;
