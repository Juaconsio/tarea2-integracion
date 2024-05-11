import L from "leaflet";
import redIcon from "../assets/red-circle.svg";
import yellowIcon from "../assets/yellow-circle.svg";
import brownIcon from "../assets/brown-circle.svg";
import blueIcon from "../assets/blue-circle.svg";
import greenIcon from "../assets/green-circle.svg";
import otherBlueIcon from "../assets/otherblue.svg";
import violetIcon from "../assets/violet-circle.svg";

const RedStation = L.icon({
  iconUrl: redIcon,
  iconRetinaUrl: redIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "red_icon",
});

const GreenStation = L.icon({
  iconUrl: greenIcon,
  iconRetinaUrl: greenIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});

const YellowStation = L.icon({
  iconUrl: yellowIcon,
  iconRetinaUrl: yellowIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});

const BlueStation = L.icon({
  iconUrl: blueIcon,
  iconRetinaUrl: blueIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});

const BrownStation = L.icon({
  iconUrl: brownIcon,
  iconRetinaUrl: brownIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});

const OtherBlueStaion = L.icon({
  iconUrl: otherBlueIcon,
  iconRetinaUrl: otherBlueIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});

const violetStaion = L.icon({
  iconUrl: violetIcon,
  iconRetinaUrl: violetIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [15, 20],
  className: "leaflet-venue-icon",
});


export const checkIcon = (line) => {
  switch (line) {
    case "1":
      return RedStation
    case "2":
      return YellowStation
    case "3":
      return BrownStation
    case "4":
      return BlueStation
    case "4A":
      return OtherBlueStaion
    case "5":
      return GreenStation
    case "6":
      return violetStaion
    default:
      return RedStation
  }
}