import React from "react";
import { useDistance } from "../../utils/CalculateDistance";
import { Typography, Button, Chip } from "@mui/material";
import DropOff from "./modals/Dropoff";
import location from "../../assets/location.png";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  formal: boolean;
  type: string;
  address: string;
  materialsAccepted: string[];
  gps: GPS;
  contactPhone: string;
  image?: {
    url: string;
    public_id?: string;
  } | null;
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

  const chipConfig =
    center.type === "Recycling center"
      ? { label: "Recycling center", color: "#00C281" }
      : center.formal
        ? { label: "Formal Collection", color: "#2563eb" }
        : { label: "Informal Collection", color: "#f59e0b" };

  return (
    <React.Fragment key={center._id}>
      <div
        onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
        className={`
    rounded-xl
    p-4 sm:p-5
    border
    flex flex-col md:flex-row items-center gap-3
    mb-3
    cursor-pointer
    transition-all duration-200
    hover:shadow-md
    ${
      selectedIndex === index
        ? "bg-[#00C2810D] border-[#00C281]"
        : "bg-white border-[#1A1A1A30]"
    }
  `}
      >
        <div>
          {center.image ? (
            <img
              src={center.image?.url}
              className="rounded-2xl w-44 md:w-32 h-32"
            />
          ) : (
            <div className="rounded-2xl w-44 md:w-32 h-32 bg-linear-to-b from-[#005C3D] to-[#00C281]" />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="">
            <Typography
              fontSize={{ xs: 16, sm: 18, md: 20, lg: 22 }}
              fontWeight={400}
            >
              {center.name}
            </Typography>

            <Chip
              label={chipConfig.label}
              variant="outlined"
              sx={{
                //width: "50%",
                borderColor: chipConfig.color,
                color: chipConfig.color,
                fontWeight: 500,
              }}
            />
          </div>

          {/* Distance */}
          <div className="flex gap-2 items-center">
            <img
              src={location}
              alt="location"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />

            <Typography fontSize={{ xs: 12, sm: 14, md: 16 }} color="#1A1A1A80">
              {distance !== null ? `${distance} km` : "---"}
            </Typography>
          </div>

          {/* Materials */}
          <div className="flex flex-wrap gap-2">
            {center.materialsAccepted.map((material, i) => (
              <div
                key={i}
                className="border border-[#1A1A1A40] rounded-lg px-2 py-1"
              >
                <Typography fontSize={12}>{material}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}

      {selectedIndex === index && (
        <div className="flex flex-col  gap-2 mb-4">
          <Button
            //fullWidth
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
            Open in Google Maps
          </Button>

          <DropOff center={center} width="100%" />
        </div>
      )}
    </React.Fragment>
  );
};

export default CenterCard;
