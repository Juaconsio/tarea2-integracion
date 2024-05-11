import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./markers";
import Trains from './Trains';

import PropTypes from 'prop-types';

import 'leaflet/dist/leaflet.css';

const MapView = ({ lastJsonMessage }) => {
  MapView.propTypes = {
    lastJsonMessage: PropTypes.object, // Change object to the appropriate data type
  };
  return (
    <>
      <div>
        <MapContainer center={{ lat: '-33.437778', lng: '-70.650278' }} zoom={13}  >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers />
          <Trains lastJsonMessage={lastJsonMessage} />
        </MapContainer  >
      </div>
    </>
  );
}
export default MapView;