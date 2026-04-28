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
  image?: {
    url: string;
    public_id?: string;
  } | null;
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
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCenters();
  }, [coords]);

  return (
    <div className="w-full bg-[#FAFAFA] py-4 sm:py-6 lg:py-8 px-4 sm:px-5 lg:px-6 rounded-xl shadow-[0_2px_6px_#1A1A1A26]">
      <Typography
        fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
        fontWeight={400}
        color="#052E1E"
      >
        Closest Centers
      </Typography>

      <Divider sx={{ marginY: "0.75rem" }} />

      <div className="max-h-[60vh] overflow-y-auto">
        {centers.map((center, index) => (
          <div key={center._id}>
            <div
              onClick={() =>
                setSelectedIndex(selectedIndex === index ? null : index)
              }
              className="rounded-xl p-4 sm:p-5 border border-[#1A1A1A30] flex flex-col md:flex-row gap-3 mb-3"
            >
              <div>
                {center.image ? (
                  <img
                    src={center.image?.url}
                    className="rounded-2xl w-full  md:w-32 h-32"
                  />
                ) : (
                  <div className="rounded-2xl w-full md:w-32 h-32 bg-linear-to-b from-[#005C3D] to-[#00C281]" />
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between gap-10 items-center">
                  <Typography
                    fontSize={{ xs: 16, sm: 18, md: 20, lg: 24 }}
                    fontWeight={400}
                  >
                    {center.name}
                  </Typography>

                  <div className="px-2 flex py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#00C2811A]">
                    <Typography
                      fontSize={{ xs: 12, sm: 14, md: 16, lg: 20 }}
                      fontWeight={300}
                      color="#00C281"
                    >
                      Open
                    </Typography>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex gap-2 items-center">
                  <img src={location} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <Typography
                    fontSize={{ xs: 12, sm: 14, md: 16 }}
                    color="#1A1A1A80"
                  >
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

                {/* Materials */}
                <div className="flex flex-wrap gap-2">
                  {center.materialsAccepted.map((item, i) => (
                    <div
                      key={i}
                      className="border border-[#1A1A1A40] rounded-lg px-2 py-1"
                    >
                      <Typography fontSize={12}>{item}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedIndex === index && (
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#00C281",
                    color: "#00C281",
                    textTransform: "capitalize",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://www.google.com/maps?q=${center.gps.coordinates[1]},${center.gps.coordinates[0]}`,
                      "_blank",
                    );
                  }}
                >
                  Open in Maps
                </Button>

                <DropOff center={center} width="100%" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosestCenters;
