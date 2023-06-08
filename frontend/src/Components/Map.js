import L from 'leaflet';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import "../App.css"
import carImage from "../static/images/car1.jpg";
import { useState, useRef } from "react";
import { Marker, TileLayer, Popup, MapContainer } from "react-leaflet";
import { icon } from "leaflet";
import '../App.css';
import "leaflet-routing-machine";
import RoutingMachine from './RoutingControl';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const ref = useRef(null);
  const ICON = icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32],
  })
  const [checkCar, setCheckCar] = useState(false);
  const [rent, setRent] = useState(false);
  const markers = [[46.773541, 23.622030], [46.771774, 23.624830]];
    const defaultProps = {
      center: [{
        lat: 46.771774,
        lng: 23.624830
      },
      {
        lat: 46.773541,
        lng: 23.622030
      }],
      zoom: 11
    };
    const destination = {
      lat: 46.769023,
      lng: 23.629473
    }
    const carDetails = {
      "Category": "Standard",
      "Year": 2022,
      "Fuel": "full",
      "Price/hour": "40 lei",
      "Transition": "Automatic",
      "Acceleration": "0-150 km/h",
      "Location": "str",
      "Status": "Available"
    }

    const getDistance = (humanCoord, carCoord) => {
      let R = 6371e3;
      let phi1 = humanCoord[0] * Math.PI / 180;
      let phi2 = carCoord[0] * Math.PI / 180;
      let dphi = (carCoord[0] - humanCoord[0]) * Math.PI / 180;
      let dlambda = (carCoord[1] - humanCoord[1]) * Math.PI / 180;
      let a = Math.pow(Math.sin(dphi/2),2) + Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(dlambda/2),2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return Math.round(R * c);
    };

    const rentCar = () => {
      setCheckCar(false);
      setRent(true);
    }

    const MyMarkers = ({ data }) => {
      return data.map((marker, index) => {
        let markerMsg = `Approximate distance from your position: ${getDistance(data[0], data[index])}`;
        if (index == 0){
          markerMsg = "You are here";
        }
       return (
       <Marker key={index} position={marker} ref={ref} eventHandlers={{
        click: () => {
          if (index > 0){
            setCheckCar(true);
          }
        },
        mouseover: (event) => {
          event.target.openPopup();
        },
        mouseout: (event) => {
          event.target.closePopup();
        }
      }}>
        <Popup>
          {markerMsg}
        </Popup>
      </Marker>
       ); 
       });
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
          {!!checkCar && <div className="rentCard" style={{position:'absolute', zIndex: 2}}>
            <Card sx={{ maxWidth: 1000 }}>
              <CloseIcon onClick={rentCar} onChange={rentCar} style={{ position: 'relative', left: 120, cursor: 'pointer' }}></CloseIcon>
              <CardMedia
                sx={{ height: '30%', paddingTop: '56.25%' }}
                image={carImage}
                title="car"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Hyundai Grand i10 Nios
                </Typography>
                {Object.keys(carDetails).map((key, index) => <Typography variant="body2" color="text.secondary">
                  {key}: {carDetails[key]}
                </Typography>)}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={rentCar} onChange={rentCar}>Rent</Button>
                <Button size="small">Book</Button>
              </CardActions>
            </Card>
          </div>}
          <MapContainer center={[46.771774, 23.624830]} zoom={13} scrollWheelZoom={false} doubleClickZoom={false} style={{ width: "100%", height: "100vh", zIndex: 1 }} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyMarkers data={markers} />
            {!!rent && <RoutingMachine initialCoords={markers[0]} destinationCoords={markers[1]}/>}
          </MapContainer>
        </div>
      );
}