import { useState, useRef, useEffect, useContext } from "react";
import { Marker, TileLayer, Popup, MapContainer } from "react-leaflet";
import L from "leaflet";
import "../App.css";
import "leaflet-routing-machine";
import dayjs from "dayjs";

import RoutingMachine from "./RoutingControl";
import CarCard from "./CarCard";
import NavigationControl from "./NavigationControl";

import { Card, Button } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";

import { getDistance } from "../utils/GetDistance";

// Marker image imports
import yellowMapMarker from "../static/images/yellowMapMarker.png";
import greenMapMarker from "../static/images/greenMapMarker.png";
import markerShadow from "../static/images/markerShadow.png";
import userMarker from "../static/images/userMarker.png";

import RentContext from "../contexts/RentContext";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: yellowMapMarker,
  iconUrl: yellowMapMarker,
  shadowUrl: markerShadow,
});

export default function SimpleMap() {
  // const date = new Date();
  // console.log(dayjs(new Date(dayjs(date).format())).format('DD/MM/YYYY'));
  const ref = useRef(null);
  const {
    rentData: { cars },
    handleGetCars,
  } = useContext(RentContext);
  const [markerData, setMarkerData] = useState([]);
  const [userPosition, setUserPosition] = useState([]);
  const [markerState, setMarkerState] = useState(null);
  const [checkCar, setCheckCar] = useState(false);
  const [bookState, setBookState] = useState(false);
  const [bookStartPicker, setBookStartPicker] = useState(false);
  const [bookEndPicker, setBookEndPicker] = useState(false);
  const [bookStart, setBookStart] = useState(null);
  const [bookEnd, setBookEnd] = useState(null);
  const [rent, setRent] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  useEffect(() => {
    async function fetchCars() {
      await handleGetCars();
    }

    fetchCars();
  }, []);

  useEffect(() => {
    !!cars.length &&
      setMarkerData(
        cars.map((car) => [car.position.latitude, car.position.longitude, car])
      );
  }, [cars]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setUserPosition([latitude, longitude]),
        () => console.log("Unable to retieve your location!")
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

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

    markerState.target.setIcon(new newIcon({ iconUrl: yellowMapMarker }));
  };

  const MyMarkers = ({ data }) => {
    return data
      .filter((marker) => marker.length)
      .map((marker, index) => {
        let markerMsg = `Approximate distance from your position: ${getDistance(
          data[0],
          data[index]
        )}m`;

        const iconColor =
          index === 0
            ? userMarker
            : marker[2].isAvailable
            ? greenMapMarker
            : yellowMapMarker;

        if (index === 0) {
          markerMsg = "You are here";
        }

        if (marker[2] && !marker[2].isAvailable) {
          markerMsg =
            "This car is not available to rent or it's already booked!";
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
            position={[marker[0], marker[1]]}
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
      {!!checkCar &&
        markerData.map((marker) => (
          <CarCard
            marker={marker}
            setCheckCar={setCheckCar}
            bookCar={bookCar}
            rentCar={rentCar}
          />
        ))}
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
      {!!rent && <NavigationControl setRent={setRent} />}
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
        <MyMarkers data={[userPosition, ...markerData]} />
        {!!rent && (
          <RoutingMachine
            initialCoords={userPosition}
            destinationCoords={[selectedMarkerData[0], selectedMarkerData[1]]}
          />
        )}
      </MapContainer>
    </div>
  );
}
