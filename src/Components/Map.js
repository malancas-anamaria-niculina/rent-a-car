import L, { marker } from "leaflet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import "../App.css";
import carImage from "../static/images/car1.jpg";
import { useState, useRef, useEffect } from "react";
import { Marker, TileLayer, Popup, MapContainer } from "react-leaflet";
import "../App.css";
import "leaflet-routing-machine";
import RoutingMachine from "./RoutingControl";
import { addDays, format } from "date-fns";
import dayjs from "dayjs";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

// Marker image imports
import yellowMapMarker from "../static/images/yellowMapMarker.png";
import markerShadow from "../static/images/markerShadow.png";
import userMarker from "../static/images/userMarker.png";

// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: yellowMapMarker,
  iconUrl: yellowMapMarker,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function SimpleMap() {
  // const date = new Date();
  // console.log(dayjs(new Date(dayjs(date).format())).format('DD/MM/YYYY'));
  const ref = useRef(null);
  const [markerData, setMarkerData] = useState([]);
  const [markerState, setMarkerState] = useState(null);
  const [checkCar, setCheckCar] = useState(false);
  const [bookState, setBookState] = useState(false);
  const [bookStartPicker, setBookStartPicker] = useState(false);
  const [bookEndPicker, setBookEndPicker] = useState(false);
  const [bookStart, setBookStart] = useState(null);
  const [bookEnd, setBookEnd] = useState(null);
  const [rent, setRent] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  // menu
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const markers = [
    [46.773541, 23.62203],
    [46.771774, 23.62483],
  ];
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userPosition = [latitude, longitude];

    const markerArray = [userPosition, ...markers];
    console.log("Marker array", markerArray);
    setMarkerData(markerArray);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    console.log(markerData);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const carDetails = {
    name: "Hyundai Grand i10 Nios",
    details: {
      Category: "Standard",
      Year: 2022,
      Fuel: "full",
      "Price/hour": "40 lei",
      Transition: "Automatic",
      Odometer: "0-150 km/h",
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
        shadowUrl: markerShadow,
        iconRetinaUrl: yellowMapMarker,
        iconUrl: yellowMapMarker,
      },
    });
    // require('leaflet/dist/images/marker-icon.png')
    markerState.target.setIcon(new newIcon({ iconUrl: yellowMapMarker }));
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
      const iconColor = index == 0 ? userMarker : yellowMapMarker;
      if (bookStart != null && bookEnd != null) {
        markerMsg += `<\br> ${bookStart} <\br> ${bookEnd}`;
      }
      if (index === 0) {
        markerMsg = "You are here";
      }

      const icon = L.icon({
        shadowUrl: markerShadow,
        iconRetinaUrl: iconColor,
        iconUrl: iconColor,
        iconSize: [20, 30], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [17, 65], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
      return (
        <Marker
          key={index}
          position={marker}
          icon={icon}
          ref={ref}
          eventHandlers={{
            click: (event) => {
              if (index > 0) {
                setCheckCar(true);
                setMarkerState(event);
                setSelectedMarkerData(marker);
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
    try {
      if (bookStartPicker === true) {
        setBookStart(dayjs(date.$d).format());
      }
      if (bookEndPicker === true) {
        setBookEnd(dayjs(date.$d).format());
      }
    } catch (error) {
      setBookEndPicker(false);
    }
  };

  const setNextTimePicker = (date) => {
    try {
      setBookStart(dayjs(date.$d).format());
      if (bookStartPicker === true) {
        setBookStartPicker(false);
        setBookEndPicker(true);
      } else {
        setBookEndPicker(false);
      }
    } catch (error) {
      setBookStartPicker(true);
      const startEndDate = bookStartPicker ? "start" : "end";
      alert(`Please select a ${startEndDate} date and time.`);
    }
  };

  const resetTimePickers = () => {
    setBookStart(null);
    setBookEnd(null);
    setBookEndPicker(false);
    setBookStartPicker(false);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ position: "absolute", zIndex: 4, top: "2%", right: "2%" }}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Menu
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Map</MenuItem>
                    <MenuItem onClick={handleClose}>Rented cars</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {!!checkCar && (
        <div className="rentCard" style={{ position: "absolute", zIndex: 2 }}>
          <Card sx={{ width: "fit-content", borderRadius: 2 }}>
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
            <CardContent style={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontSize: 15 }}
              >
                {carDetails.name}
              </Typography>
              {Object.keys(carDetails.details).map((key, index) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: 10 }}
                >
                  {key}: {carDetails.details[key]}
                </Typography>
              ))}
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
          </Card>
        </div>
      )}
      {!!bookState && (
        <Card
          sx={{
            maxWidth: "100%",
            maxHeight: "fit-content",
            position: "absolute",
            zIndex: 3,
            alignItems: "center",
            right: "30%",
          }}
        >
          {!!bookStartPicker && (
            <div
              style={{ height: "100%", width: "100%", alignItems: "center" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  disablePast
                  label="Picker with helper text"
                  orientation="portrait"
                  onChange={setStartDate}
                  style={{ height: "60%", width: "60%" }}
                  onAccept={(date) => setNextTimePicker(date)}
                  slotProps={{
                    textField: { size: "small", text: "Test" },
                    tabs: {
                      hidden: false,
                    },
                    actionBar: {
                      actions: ["accept"],
                    },
                  }}
                />
              </LocalizationProvider>
              <Button
                variant="text"
                style={{
                  position: "absolute",
                  width: "20%",
                  height: "5vh",
                  fontSize: 14,
                  zIndex: 2,
                  right: "25%",
                  bottom: "1.5%",
                }}
                onClick={resetTimePickers}
                onChange={resetTimePickers}
              >
                CANCEL
              </Button>
            </div>
          )}
          {!!bookEndPicker && (
            <div
              style={{ height: "100%", width: "100%", alignItems: "center" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  disablePast
                  label="Picker with helper text"
                  orientation="portrait"
                  onChange={setStartDate}
                  style={{ height: "60%", width: "60%" }}
                  onAccept={(date) => setNextTimePicker(date)}
                  slotProps={{
                    textField: { size: "small", text: "Test" },
                    tabs: {
                      hidden: false,
                    },
                    actionBar: {
                      actions: ["accept"],
                    },
                  }}
                />
              </LocalizationProvider>
              <Button
                variant="text"
                style={{
                  position: "absolute",
                  width: "20%",
                  height: "5vh",
                  fontSize: 14,
                  zIndex: 2,
                  right: "25%",
                  bottom: "1.5%",
                }}
                onClick={resetTimePickers}
                onChange={resetTimePickers}
              >
                CANCEL
              </Button>
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
        <MyMarkers data={markerData} />
        {!!rent && (
          <RoutingMachine
            initialCoords={markerData[0]}
            destinationCoords={selectedMarkerData}
            style={{
              width: "60%",
              height: "60vh",
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
