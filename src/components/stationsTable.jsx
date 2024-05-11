import { useEffect, useState } from "react";
import axios from "axios";

const StationsTable = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get(`https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/stations`)
      .then((response) => {
        setStations(response.data);
      })

  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID</th>
            <th>Linea</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station, index) => (
            <tr key={index}>
              <td>{station.name}</td>
              <td>{station.station_id}</td>
              <td>Linea {station.line_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StationsTable;