import React from "react";
import { useDistance } from "../../utils/CalculateDistance";
import { Typography, Button } from "@mui/material";
import DropOff from "./modals/Dropoff";
import location from "../../assets/location.png";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  address: string;
  materialsAccepted: string[];
  gps: GPS;
  contactPhone: string;
}

interface GPS {
  coordinates: number[];
}

const CenterCard = ({
  center,
  index,
  selectedIndex,
  setSelectedIndex,
}: {
  center: Centers;
  index: number;
  selectedIndex: number | null;
  setSelectedIndex: (value: number | null) => void;
}) => {
  const distance = useDistance(
    center.gps.coordinates[1],
    center.gps.coordinates[0],
  );

  return (
    <React.Fragment key={center._id}>
      <div
        onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
        className={`rounded-xl p-6.5 border-[0.4px] flex flex-col gap-3 mb-4 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedIndex === index ? "bg-[#00C2810D] border-[#00C281]" : "bg-white border-[#1A1A1A]"}`}
      >
        <div className="flex justify-between">
          <Typography fontSize={24} fontWeight={400} color="#1A1A1A">
            {center.name}
          </Typography>

          {/* <div
                      className="p-2.5 rounded-xl w-22.5 h-11.5 text-center flex items-center justify-center"
                      style={{
                        backgroundColor: center.open
                          ? "#00C2811A"
                          : "#1A1A1A1A",
                      }}
                    >
                      <Typography
                        fontSize={20}
                        fontWeight={300}
                        color={center.open ? "#00C281" : "#1A1A1A"}
                      >
                        {center.open ? "Open" : "Closed"}
                      </Typography>
                    </div> */}
        </div>

        <div className="flex gap-3 items-center">
          <img src={location} alt="location" />

          <Typography fontSize={24} fontWeight={400} color="#1A1A1A80">
            {distance !== null ? `${distance} km` : "---"}
          </Typography>
        </div>

        <div className="flex gap-6.75 flex-wrap">
          {center.materialsAccepted.map((material, i) => (
            <div
              key={i}
              className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 
                             text-center flex items-center justify-center"
            >
              <Typography fontSize={14} fontWeight={400} color="#1A1A1A">
                {material}
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
                width: "220px",
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
            <DropOff center={center} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CenterCard;
