import React from "react"
import { Polyline } from "react-leaflet"
const Line = (stations) => {
  let onePath = []
  let twoPath = []
  let threePath = []
  let fourPath = []
  let fivePath = []
  let sixPath = []
  let sevenPath = []


  stations.map(station => {
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

  return (
    <>
      <Polyline pathOptions={{ color: 'red' }} positions={onePath} />
      <Polyline pathOptions={{ color: 'yellow' }} positions={twoPath} />
      <Polyline pathOptions={{ color: 'brown' }} positions={threePath} />
      <Polyline pathOptions={{ color: 'blue' }} positions={fourPath} />
      <Polyline pathOptions={{ color: 'blue' }} positions={sevenPath} />
      <Polyline pathOptions={{ color: 'green' }} positions={fivePath} />
      <Polyline pathOptions={{ color: 'violet' }} positions={sixPath} />


    </>
  )
}

export default Line;