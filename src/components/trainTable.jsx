import { useEffect, useState } from "react";
import axios from "axios";

import PropTypes from 'prop-types';

const TrainTable = ({ lastJsonMessage }) => {
  TrainTable.propTypes = {
    lastJsonMessage: PropTypes.object, // Change object to the appropriate data type
  };

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get(`https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/trains`)
      .then((response) => {
        console.log(response.data);
        setTrains(response.data);
      })
  }, []);

  useEffect(() => {
    const event = lastJsonMessage;
    if (event && event.type === "arrival") {
      const indexToUpdate = trains.findIndex((train) => train.train_id === event.data.train_id);
      if (indexToUpdate !== -1) {
        const updateTrains = [...trains];
        updateTrains[indexToUpdate].current_station = event.data.station_id;
        setTrains(updateTrains);
      }
    }
  }, [lastJsonMessage, trains]);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre del conductors</th>
          <th>ID</th>
          <th>Linea</th>
          <th>Estación de origen</th>
          <th>Estación de destino</th>
          <th>Estación actual</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((train, index) => (
          <tr key={index}>
            <td>{train.driver_name}</td>
            <td>{train.train_id}</td>
            <td>Linea {train.line_id}</td>
            <td>{train.origin_station_id}</td>
            <td>{train.destination_station_id}</td>
            <td>{train.current_station}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainTable;