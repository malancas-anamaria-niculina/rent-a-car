import L from "leaflet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import "../App.css";
import carImage from "../static/images/car1.jpg";
import { useState, useRef } from "react";
import { Marker, TileLayer, Popup, MapContainer } from "react-leaflet";
import "../App.css";
import "leaflet-routing-machine";
import RoutingMachine from "./RoutingControl";
import { addDays, format } from "date-fns";
import dayjs from "dayjs";
import { DateRange, DayPicker } from "react-day-picker";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function SimpleMap() {
  const pastMonth = new Date(2023, 5, 9);
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const ref = useRef(null);
  const [markerState, setMarkerState] = useState(null);
  const [checkCar, setCheckCar] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [bookState, setBookState] = useState(false);
  const [bookStartPicker, setBookStartPicker] = useState(false);
  const [bookEndPicker, setBookEndPicker] = useState(false);
  const [bookStart, setBookStart] = useState(false);
  const [bookEnd, setBookEnd] = useState(false);
  const [rent, setRent] = useState(false);
  var yellowIcon = L.icon({
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconRetinaUrl: require("./yellow-map-marker.png"),
    iconUrl: require("./yellow-map-marker.png"),
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  var blueIcon = L.icon({
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  const markers = [
    [46.773541, 23.62203],
    [46.771774, 23.62483],
  ];
  const defaultProps = {
    center: [
      {
        lat: 46.771774,
        lng: 23.62483,
      },
      {
        lat: 46.773541,
        lng: 23.62203,
      },
    ],
    zoom: 11,
  };
  const destination = {
    lat: 46.769023,
    lng: 23.629473,
  };
  const carDetails = {
    name: "Hyundai Grand i10 Nios",
    details: {
      Category: "Standard",
      Year: 2022,
      Fuel: "full",
      "Price/hour": "40 lei",
      Transition: "Automatic",
      Acceleration: "0-150 km/h",
      Location: "str",
      Status: "Available",
    },
  };

  const getDistance = (humanCoord, carCoord) => {
    let R = 6371e3;
    let phi1 = (humanCoord[0] * Math.PI) / 180;
    let phi2 = (carCoord[0] * Math.PI) / 180;
    let dphi = ((carCoord[0] - humanCoord[0]) * Math.PI) / 180;
    let dlambda = ((carCoord[1] - humanCoord[1]) * Math.PI) / 180;
    let a =
      Math.pow(Math.sin(dphi / 2), 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(dlambda / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  const rentCar = () => {
    setCheckCar(false);
    setRent(true);
  };

  const bookCar = () => {
    setCheckCar(false);
    setBookState(true);
    setBookStartPicker(true);

    var newIcon = L.Icon.extend({
      options: {
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        iconRetinaUrl: require("./yellow-map-marker.png"),
        iconUrl: require("./yellow-map-marker.png"),
      },
    });
    // require('leaflet/dist/images/marker-icon.png')
    markerState.target.setIcon(
      new newIcon({ iconUrl: require("./yellow-map-marker.png") })
    );
  };

  const exitNavigation = () => {
    setRent(false);
  };

  const exitPopup = () => {
    setCheckCar(false);
  };

  const MyMarkers = ({ data }) => {
    return data.map((marker, index) => {
      let markerMsg = `Approximate distance from your position: ${getDistance(
        data[0],
        data[index]
      )}`;
      if (index == 0) {
        markerMsg = "You are here";
      }
      return (
        <Marker
          key={index}
          position={marker}
          ref={ref}
          eventHandlers={{
            click: (event) => {
              if (index > 0) {
                setCheckCar(true);
                setMarkerState(event);
              }
            },
            mouseover: (event) => {
              event.target.openPopup();
            },
            mouseout: (event) => {
              event.target.closePopup();
            },
          }}
        >
          <Popup>{markerMsg}</Popup>
        </Marker>
      );
    });
  };

  const setStartDate = (date) => {
    setBookStart(dayjs(date.$d).format());
    setNextButton(true);
  };

  const setNextTimePicker = () => {
    setNextButton(false);
    if (bookStartPicker) {
      setBookStartPicker(false);
      setBookEndPicker(true);
    } else {
      setBookEndPicker(false);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {!!checkCar && (
        <div className="rentCard" style={{ position: "absolute", zIndex: 2 }}>
          <Card sx={{ maxWidth: "100%", maxHeight: 320 }}>
            <CloseIcon
              onClick={exitPopup}
              onChange={exitPopup}
              style={{
                position: "relative",
                left: 80,
                cursor: "pointer",
                zIndex: 3,
              }}
            ></CloseIcon>
            <CardMedia
              sx={{ height: "40%", paddingTop: "50.25%" }}
              image={carImage}
              title="car"
            />
            <CardContent
              style={{ height: "30vh", width: "100%", alignItems: "center" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ width: "100%", fontSize: 15, paddingRight: "50%" }}
              >
                {carDetails.name}
              </Typography>
              {Object.keys(carDetails.details).map((key, index) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: 10, paddingRight: "15%" }}
                >
                  {key}: {carDetails.details[key]}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
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
          </Card>
        </div>
      )}
      {!!bookState && (
        <Card
          sx={{
            maxWidth: "100%",
            maxHeight: 320,
            position: "absolute",
            zIndex: 3,
            alignItems: "center",
            right: "30%",
          }}
        >
          {!!bookStartPicker && (
            <div style={{ height: "100%", width: "100%", alignItems: "center" }}>
              {!!nextButton && (
                <Button
                  variant="contained"
                  onClick={setNextTimePicker}
                  onChange={setNextTimePicker}
                  style={{
                    position: "absolute",
                    zIndex: 4,
                    left: 50,
                    bottom: 20,
                  }}
                >
                  Next
                </Button>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  disablePast
                  label="Small picker"
                  slotProps={{ textField: { size: 'small' } }}
                  orientation="portrait"
                  onChange={setStartDate}
                  style={{ height: "60%", width: "60%" }}
                />
              </LocalizationProvider>
            </div>
          )}
          {!!bookEndPicker && (
            <div>
              {!!nextButton && (
                <Button
                  variant="contained"
                  onClick={setNextTimePicker}
                  onChange={setNextTimePicker}
                  style={{
                    position: "absolute",
                    zIndex: 4,
                    left: 50,
                    bottom: 20,
                  }}
                >
                  Book
                </Button>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  disablePast
                  orientation="portrait"
                  onChange={setStartDate}
                />
              </LocalizationProvider>
            </div>
          )}
        </Card>
      )}
      {!!rent && (
        <Button
          variant="contained"
          style={{
            position: "absolute",
            width: "15%",
            height: "7vh",
            fontSize: 10,
            zIndex: 2,
            right: "5%",
            top: "65%",
          }}
          onClick={exitNavigation}
          onChange={exitNavigation}
        >
          Exit directions
        </Button>
      )}
      <MapContainer
        center={[46.771774, 23.62483]}
        zoom={13}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        style={{ width: "100%", height: "80vh", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkers data={markers} />
        {!!rent && (
          <RoutingMachine
            initialCoords={markers[0]}
            destinationCoords={markers[1]}
            style={{ width: "60%", height: "60vh", zIndex: 1 }}
          />
        )}
      </MapContainer>
    </div>
  );
}
