import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface IMap {
  setGeoData: React.Dispatch<any>;
  apiData: any;
}

function LocationMarker({ setGeoData, apiData }: IMap) {
  const [position, setPosition] = useState<any>(null);
  const leafletRef = useRef<any>();
  const map = useMapEvents({
    click(e) {
      const locat = e.latlng;
      setPosition(locat);
      setGeoData(locat);
      map.flyTo(locat, map.getZoom());
    },
  });

  useEffect(() => {
    if (leafletRef && leafletRef.current) {
      leafletRef.current.openPopup();
    }
  }, [position, apiData]);
  return position === null ? null : (
    <Marker position={position} ref={leafletRef}>
      <Popup>
        <>
          {!apiData ? (
            <p>Loading...</p>
          ) : (
            <div className="">
              <p className="font-[700] text-[16px] mb-1">{apiData.country}</p>
              <p className="text-orange-800 font-[700]">{`Cases: ${apiData.cases}`}</p>
              <p className="text-amber-600 font-[700]">{`Active: ${apiData.active}`}</p>
              <p className="text-green-600 font-[700]">{`Recoverd: ${apiData.recovered}`}</p>
              <p className="text-red-600 font-[700]">{`Deaths: ${apiData.deaths}`}</p>
            </div>
          )}
        </>
      </Popup>
    </Marker>
  );
}

const Map = ({ setGeoData, apiData }: IMap) => {
  const position = { lat: 37, lng: 97 };
  const zoom = 4;
  return (
    <div className="map w-full">
      <MapContainer
        center={position}
        scrollWheelZoom={false}
        zoom={zoom}
        style={{ height: "560px", width: "inherit" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setGeoData={setGeoData} apiData={apiData} />
      </MapContainer>
    </div>
  );
};

export default Map;
