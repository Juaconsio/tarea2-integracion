import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import trainIcon from "../assets/train-svgrepo-com.svg";
import statusIconSVG from "../assets/venue_location_icon.svg";
import axios from "axios";
import PropTypes from 'prop-types';

const Trains = ({ lastJsonMessage }) => {
  const [trainsOne, setOne] = useState([]);
  const [trainsTwo, setTwo] = useState([]);
  const [trainsThree, setThree] = useState([]);
  const [trainsFour, setFour] = useState([]);
  const [trainsFourA, setFourA] = useState([]);
  const [trainsFive, setFive] = useState([]);
  const [trainsSix, setSix] = useState([]);
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState();


  Trains.propTypes = {
    lastJsonMessage: PropTypes.object, // Change object to the appropriate data type
  };


  const icon = L.icon({
    iconUrl: trainIcon,
    iconRetinaUrl: trainIcon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [15, 20],
    className: "red_icon",
  })

  const statusIcon = L.icon({
    iconUrl: statusIconSVG,
    iconRetinaUrl: statusIconSVG,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [15, 20],
    className: "red_icon",
  })

  const popup = (train) => {
    return (
      <Popup>
        <div>
          <h3>Tren {train.train_id}</h3>
          <p>Estado: {train.status}</p>
          <p>Linea: {train.line_id}</p>
          <p>Actual: {train.current_stations}</p>
          <p>Ultima estación: {train.last_station}</p>
          <p>Ultimo abordo: {train.last_aboard}</p>
          <p>Ultimo descenso: {train.last_unaboard}</p>
          <p>Cantidad de pasajeros: {train.num_passengers}</p>
          {train.timeline && Object.keys(train.timeline).slice(-5).map((key) => (
            <p key={key}> {key} : {train.timeline[key]}</p>
          ))
          }
        </div>
      </Popup>
    )
  }

  useEffect(() => {
    axios.get(`https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/stations`)
      .then((response) => {
        setStations(response.data);
      })
    axios.get(`https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/trains`)
      .then((response) => {
        response.data.map((train) => {
          if (train.line_id === "1") {
            setOne(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "2") {
            setTwo(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "3") {
            setThree(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "4") {
            setFour(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "4A") {
            setFourA(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "5") {
            setFive(prevTrains => [...prevTrains, train])
          }
          else if (train.line_id === "6") {
            setSix(prevTrains => [...prevTrains, train])
          }
        })
      });
  }, []);

  const selectLine = (line_id) => {
    switch (line_id) {
      case "1":
        return trainsOne;
      case "2":
        return trainsTwo;
      case "3":
        return trainsThree;
      case "4":
        return trainsFour;
      case "4A":
        return trainsFourA;
      case "5":
        return trainsFive;
      case "6":
        return trainsSix;
      default:
        return [];
    }
  };

  const updateLine = (line_id, trains) => {
    switch (line_id) {
      case "1":
        setOne(trains);
        break;
      case "2":
        setTwo(trains)
        break;
      case "3":
        setThree(trains);
        break;
      case "4":
        setFour(trains);
        break;
      case "4A":
        setFourA(trains);
        break;
      case "5":
        setFive(trains);
        break;
      case "6":
        setSix(trains)
        break;
      default:
        return [];
    }
  };

  const searchTrainById = (trainId) => {
    let trains = null;
    let lineId = null;
    let index = -1;

    trainsOne.forEach((t, i) => {
      if (t.train_id === trainId) {
        trains = trainsOne;
        lineId = "1";
        index = i;
      }
    });

    if (!trains) {
      trainsTwo.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsTwo;
          lineId = "2";
          index = i;
        }
      });
    }

    if (!trains) {
      trainsThree.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsThree;
          lineId = "3";
          index = i;
        }
      });
    }

    if (!trains) {
      trainsFour.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsFour;
          lineId = "4";
          index = i;
        }
      });
    }

    if (!trains) {
      trainsFourA.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsFourA;
          lineId = "4A";
          index = i;
        }
      });
    }

    if (!trains) {
      trainsFive.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsFive;
          lineId = "5";
          index = i;
        }
      });
    }

    if (!trains) {
      trainsSix.forEach((t, i) => {
        if (t.train_id === trainId) {
          trains = trainsSix;
          lineId = "6";
          index = i;
        }
      });
    }

    return { trains, lineId, index };
  };
  useEffect(() => {
    const event = lastJsonMessage;
    if (event) {
      if (event.data && event.data.line_id) {
        const trains = selectLine(event.data.line_id);
        const indexToUpdate = trains.findIndex((train) => train.train_id === event.data.train_id);
        switch (event.type) {
          case "position":
            if (indexToUpdate !== -1) {
              const updateTrains = [...trains];
              updateTrains[indexToUpdate].lat = event.data.position.lat;
              updateTrains[indexToUpdate].long = event.data.position.long;
              updateTrains[indexToUpdate].status = 'moving';
              updateLine(event.data.line_id, updateTrains);
            }
            break;
          case "arrival":
            if (indexToUpdate !== -1) {
              const updateTrains = [...trains];
              const indexStation = stations.findIndex((station) => station.station_id === event.data.station_id);
              if (indexStation !== -1) {
                updateTrains[indexToUpdate].lat = stations[indexStation].position.lat;
                updateTrains[indexToUpdate].long = stations[indexStation].position.long;
                updateTrains[indexToUpdate].status = event.type;
                updateTrains[indexToUpdate].current_stations = stations[indexStation].name;
                updateLine(event.data.line_id, updateTrains);
              }
            }
            break;
          case "departure":
            if (indexToUpdate !== -1) {
              const updateTrains = [...trains];
              const indexStation = stations.findIndex((station) => station.station_id === event.data.station_id);
              if (indexStation !== -1) {
                updateTrains[indexToUpdate].lat = stations[indexStation].position.lat;
                updateTrains[indexToUpdate].long = stations[indexStation].position.long;
                updateTrains[indexToUpdate].status = event.type;
                updateTrains[indexToUpdate].last_station = stations[indexStation].name;
                updateLine(event.data.line_id, updateTrains);
              }
            }
            break;
          case "boarding":
            if (indexToUpdate !== -1) {
              const updateTrains = [...trains];
              updateTrains[indexToUpdate].status = event.type;
              updateTrains[indexToUpdate].last_aboard = event.data.boarded_passengers;
              if (!updateTrains[indexToUpdate].num_passengers) {
                updateTrains[indexToUpdate].num_passengers += event.data.boarded_passengers;
              } else {
                updateTrains[indexToUpdate].num_passengers += event.data.boarded_passengers;
              }
              updateTrains[indexToUpdate].timeline = {
                ...updateTrains[indexToUpdate].timeline,
                [event.timestamp]: updateTrains[indexToUpdate].num_passengers
              }

              updateLine(event.data.line_id, updateTrains);
            }
            break;
          case "unboarding":
            if (indexToUpdate !== -1) {
              const updateTrains = [...trains];
              updateTrains[indexToUpdate].status = event.type;
              updateTrains[indexToUpdate].last_unaboard = event.data.unboarded_passengers;
              if (!updateTrains[indexToUpdate].num_passengers) {
                updateTrains[indexToUpdate].num_passengers = 0;
              } else if (updateTrains[indexToUpdate].num_passengers >= event.unboarded_passengers) {
                updateTrains[indexToUpdate].num_passengers -= event.unboarded_passengers;
              } else {
                updateTrains[indexToUpdate].num_passengers = 0;
              }
              updateTrains[indexToUpdate].timeline = {
                ...updateTrains[indexToUpdate].timeline,
                [event.timestamp]: updateTrains[indexToUpdate].num_passengers
              }
              updateLine(event.data.line_id, updateTrains);
            }
            break;
          //   break;
          default:
            console.log("No event");

        }
      } else {
        if (event.type === "status") {
          const { trains, index } = searchTrainById(event.data.train_id)
          if (index !== -1) {
            setStatus({
              lat: trains[index].lat,
              long: trains[index].long,
              status: event.data.status
            });
          }
        }
      }

    }
  }, [lastJsonMessage, stations]);

  return (
    <>
      {trainsOne.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsTwo.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsThree.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsFour.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsFourA.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsFive.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {trainsSix.map((train) => (
        train.lat && train.long && (

          <Marker key={train.train_id} position={[train.lat, train.long]} icon={icon}> {popup(train)}</Marker >
        )
      ))}
      {status && status.lat && status.long && (
        <Marker key={status.long} position={[status.lat, status.long]} icon={statusIcon}>
          <Popup>
            <div>
              <h3>Estado del tren</h3>
              <p>Estado: {status.status}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}

export default Trains;