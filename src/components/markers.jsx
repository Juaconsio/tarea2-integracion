import { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";
import { checkIcon } from "./Icon";
import { Polyline } from "react-leaflet"

const Markers = () => {
  const [stations, setStations] = useState([]);
  const [onePath, setOnePath] = useState([]);
  const [twoPath, setTwoPath] = useState([]);
  const [threePath, setThreePath] = useState([]);
  const [fourPath, setFourPath] = useState([]);
  const [fivePath, setFivePath] = useState([]);
  const [sixPath, setSixPath] = useState([]);
  const [sevenPath, setSevenPath] = useState([]);
  useEffect(() => {
    axios.get(`https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/stations`)
      .then((response) => {
        setStations(response.data);
      });
  }, []);

  useEffect(() => {
    let onePath = []
    let twoPath = []
    let threePath = []
    let fourPath = []
    let fivePath = []
    let sixPath = []
    let sevenPath = []

    stations.forEach(station => {
      switch (station.line_id) {
        case "1":
          onePath.push([station.position.lat, station.position.long])
          break;
        case "2":
          twoPath.push([station.position.lat, station.position.long])
          break;
        case "3":
          threePath.push([station.position.lat, station.position.long])
          break;
        case "4":
          fourPath.push([station.position.lat, station.position.long])
          break;
        case "4A":
          sevenPath.push([station.position.lat, station.position.long])
          break;
        case "5":
          fivePath.push([station.position.lat, station.position.long])
          break;
        case "6":
          sixPath.push([station.position.lat, station.position.long])
          break;
        default:
          sevenPath.push([station.position.lat, station.position.long])
          break;
      }
    });

    setOnePath(onePath)
    setTwoPath(twoPath)
    setThreePath(threePath)
    setFourPath(fourPath)
    setFivePath(fivePath)
    setSixPath(sixPath)
    setSevenPath(sevenPath)

  }, [stations]);

  return (
    <>
      {stations && stations.map((station, index) => (
        <Marker key={`${station.station_id}-${index}`} position={[station.position.lat, station.position.long]} icon={checkIcon(station.line_id)}>
          <Popup>
            <div>
              <h4>{station.name}</h4>
              <p>{station.station_id}-${index}</p>
              <p>Linea {station.line_id}</p>
              <p>Station ID: {station.station_id}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <div>
        <Polyline pathOptions={{ color: 'red' }} positions={onePath} />
        <Polyline pathOptions={{ color: 'yellow' }} positions={twoPath} />
        <Polyline pathOptions={{ color: 'brown' }} positions={threePath} />
        <Polyline pathOptions={{ color: 'blue' }} positions={fourPath} />
        <Polyline pathOptions={{ color: 'skyblue' }} positions={sevenPath} />
        <Polyline pathOptions={{ color: 'green' }} positions={fivePath} />
        <Polyline pathOptions={{ color: 'violet' }} positions={sixPath} />
      </div>
    </>
  );
}

export default Markers;
