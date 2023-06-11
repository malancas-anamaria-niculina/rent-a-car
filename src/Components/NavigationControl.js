import React from "react";
import { Button } from "@mui/material";

const NavigationControl = ({ setRent, rentCar }) => {
  return (
    <>
      <Button
        variant="contained"
        style={{
          position: "absolute",
          width: "15%",
          height: "7vh",
          fontSize: 15,
          zIndex: 2,
          right: "22%",
          top: "65%",
        }}
        onClick={() => setRent(false)}
      >
        Start Rent
      </Button>
      <Button
        variant="contained"
        style={{
          position: "absolute",
          width: "15%",
          height: "7vh",
          fontSize: 15,
          zIndex: 2,
          right: "5%",
          top: "65%",
        }}
        onClick={() => setRent(false)}
      >
        Exit directions
      </Button>
    </>
  );
};

export default NavigationControl;
