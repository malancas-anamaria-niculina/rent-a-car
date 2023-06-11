import React, { useContext } from "react";
import { Button } from "@mui/material";
import RentContext from "../contexts/RentContext";

const NavigationControl = ({ setRent, car }) => {
  const { handleRent } = useContext(RentContext);

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
        onClick={async () => {
          setRent(false);
          await handleRent(car.id);
        }}
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
