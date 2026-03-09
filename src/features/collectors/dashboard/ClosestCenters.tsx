import { Button, Divider, Typography } from "@mui/material";
import location from "../../../assets/location.png";
import { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { getDistance } from "geolib";
import { useAuthStore } from "../../../utils/useAuth";
import DropOff from "../modals/Dropoff";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  address: string;
  materialsAccepted: string[];
  gps: GPS;
  contactPhone: string;
  distance: string | null;
}

interface GPS {
  coordinates: number[];
}

const ClosestCenters = () => {
  const [centers, setCenters] = useState<Centers[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const { coords } = useAuthStore();

  const getCenters = async () => {
    if (!coords?.lat || !coords?.lng) return;
    try {
      const response = await api.get(
        `/api/center/closest?lat=${coords.lat}&lng=${coords.lng}`,
      );
      setCenters(response.data.data.centers);
      console.log(response.data.data.centers);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCenters();
  }, [coords]);

  return (
    <div className="w-125 bg-[#FAFAFA] py-9 px-6.5 shadow-[0_2px_6px_#1A1A1A26] rounded-xl">
      <Typography fontSize={28} fontWeight={400} color="#052E1E">
        Closest Centers
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <div className="max-h-100 overflow-hidden overflow-y-scroll">
        {centers.map((center, index) => (
          <div>
            <div
              onClick={() =>
                setSelectedIndex(selectedIndex === index ? null : index)
              }
              key={center._id}
              className="rounded-xl p-6.5 border-[0.4px] border-[#1A1A1A] flex flex-col gap-3 mb-2"
            >
              <div className="flex justify-between items-center">
                <Typography fontSize={24} fontWeight={400} color="#1A1A1A">
                  {center.name}
                </Typography>
                <div
                  className="p-2.5 rounded-xl w-22.5 h-11.5 text-center items-center"
                  style={{ backgroundColor: "#00C2811A" }}
                >
                  <Typography fontSize={20} fontWeight={300} color="#00C281">
                    Open
                  </Typography>
                </div>
              </div>

              <div className="flex gap-3">
                <img src={location} />
                <Typography fontSize={24} fontWeight={400} color="#1A1A1A80">
                  {center.gps?.coordinates?.length === 2 &&
                  coords?.lat &&
                  coords?.lng
                    ? `${(
                        getDistance(
                          {
                            latitude: Number(coords.lat),
                            longitude: Number(coords.lng),
                          },
                          {
                            latitude: center.gps.coordinates[1],
                            longitude: center.gps.coordinates[0],
                          },
                        ) / 1000
                      ).toFixed(1)} km`
                    : "---"}
                </Typography>
              </div>

              <div className="flex gap-6.75">
                {center.materialsAccepted.map((item, i) => (
                  <div
                    key={i}
                    className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 text-center items-center"
                  >
                    <Typography fontSize={14} fontWeight={400} color="#1A1A1A">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {selectedIndex === index && (
              <div className="flex gap-2 mb-4">
                <div className="transition-all duration-300">
                  <Button
                    variant="outlined"
                    sx={{
                      width: "200px",
                      borderColor: "#00C281",
                      color: "#00C281",
                      textTransform: "capitalize",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();

                      window.open(
                        `https://www.google.com/maps?q=${center.gps.coordinates[1]},${center.gps.coordinates[0]}`,
                        "_blank",
                      );
                    }}
                    className="w-full bg-[#00C281] text-white py-3 rounded-xl
                           transition-all duration-200 hover:opacity-90"
                  >
                    Open in Google Maps
                  </Button>
                </div>

                <div>
                  <DropOff center={center} width="180px" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosestCenters;
