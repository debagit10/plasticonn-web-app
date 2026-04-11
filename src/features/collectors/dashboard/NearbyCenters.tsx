import { Divider, Typography } from "@mui/material";
import Navigate from "../modals/Navigate";
import { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { useAuthStore } from "../../../utils/useAuth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  address: string;
  materialsAccepted: string[];
  gps: GPS;
  contactPhone: string;
  contactEmail: string;
  distance: string | null;
}

interface GPS {
  coordinates: number[];
}

// Fix default marker icon broken in webpack/vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const centerIcon = new L.DivIcon({
  className: "",
  html: `<div style="
    width: 36px; height: 36px;
    background: #22c55e;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

const CentersMap = () => {
  const [centers, setCenters] = useState<Centers[]>([]);
  const { coords } = useAuthStore();

  const getCenters = async () => {
    if (!coords?.lat || !coords?.lng) return;
    try {
      const response = await api.get(
        `/api/center/closest?lat=${coords.lat}&lng=${coords.lng}`,
      );
      setCenters(response.data.data.centers);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCenters();
  }, [coords]);

  return (
    <div className="bg-[#FAFAFA] p-4 sm:p-6 lg:p-8 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography
          fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
          fontWeight={400}
          color="#052E1E"
        >
          Nearby Collection Centers
        </Typography>

        <Navigate />
      </div>

      <Divider />

      {/* Map */}
      <div className="mt-4 z-0">
        {coords?.lat && coords?.lng && (
          <MapContainer
            key={`${coords.lat}-${coords.lng}`}
            center={[coords.lat, coords.lng]}
            zoom={12}
            style={{ height: "500px", width: "100%", borderRadius: "16px" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[coords.lat, coords.lng]}>
              <Popup>You are here</Popup>
            </Marker>

            {centers.map((center) => {
              const [lng, lat] = center.gps.coordinates;
              return (
                <Marker
                  key={center._id}
                  position={[lat, lng]}
                  icon={centerIcon}
                >
                  <Popup>{center.name}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default CentersMap;
