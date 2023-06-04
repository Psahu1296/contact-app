import {  useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer,  useMapEvents,} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

  function LocationMarker() {
    const [position, setPosition] = useState<any>(null)
    const leafletRef = useRef<any>();
    const map = useMapEvents({
      click(e) {
        const locat = e.latlng
        setPosition(locat)
        map.flyTo(locat, map.getZoom())
        L.popup().bindPopup(`<h5 >You are here</h5>`).openPopup()
      },
    })

    useEffect(() => {
        if(leafletRef && leafletRef.current) {
            leafletRef.current.openPopup()
        }
      },[position])
    return position === null ? null : (
      <Marker position={position} ref={leafletRef} >
        <Popup >You are here</Popup>
      </Marker>
    )
  }



const Map = () => {
  const position = { lat: 37, lng: 97 };
  const zoom = 4;
  return (
    <div className="map w-full">
    <MapContainer center={position} scrollWheelZoom={false} zoom={zoom} style={{ height: '560px', width: "inherit" }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
    </div>
  );
};

export default Map;
