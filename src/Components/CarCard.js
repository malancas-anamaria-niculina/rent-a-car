import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import carImage from "../static/images/car1.jpg";
import { useNavigate } from "react-router-dom";

const CarCard = ({ setCheckCar, marker, rentCar, bookCar }) => {
  const navigate = useNavigate();

  return (
    <div className="rentCard" style={{ position: "absolute", zIndex: 2 }}>
      <Card
        sx={{
          width: "fit-content",
          borderRadius: 2,
          position: "relative",
          pt: 2,
        }}
      >
        <CloseIcon
          onClick={() => setCheckCar(false)}
          style={{
            position: "absolute",
            right: 10,
            top: 4,
            cursor: "pointer",
            zIndex: 3,
          }}
        ></CloseIcon>
        <CardMedia
          sx={{ height: "40%", paddingTop: "50.25%", minWidth: 200 }}
          image={carImage}
          title="car"
        />
        <CardContent style={{ alignItems: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: 15 }}
          >
            {marker[2].model}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: 12 }}
          >
            Year: {marker[2]["year"]}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: 12 }}
          >
            Odometer: {marker[2].odometer}km
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: 12 }}
          >
            Type: {marker[2]["carType"]["type"]}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: 12 }}
          >
            Price: {marker[2]["price"]}$
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={rentCar}
            onChange={rentCar}
            style={{ zIndex: 3 }}
          >
            Rent
          </Button>
          <Button
            size="small"
            onClick={bookCar}
            onChange={bookCar}
            style={{ zIndex: 3 }}
          >
            Book
          </Button>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={() => {
              navigate("/car-history", { state: { carId: marker[2].id } });
            }}
            style={{ zIndex: 3 }}
          >
            View car history
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CarCard;
