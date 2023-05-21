import { Flex } from "@chakra-ui/react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import SimpleMarkerBar from "./SimpleMarkerBar";
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";

type MapBarProps = {
  lat: string;
  lon: string;
  name: string;
  align: "left" | "right";
};

export default function MapBar({ lat, lon, name, align }: MapBarProps) {
  return (
    <Flex justifyContent={align}>
      <MapContainer
        center={[Number(lat), Number(lon)]}
        zoom={13}
        minZoom={6}
        zoomControl={false}
        style={{ width: "50%", height: "20rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SimpleMarkerBar lat={lat} lon={lon} name={name} />
      </MapContainer>
    </Flex>
  );
}