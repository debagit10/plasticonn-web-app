import { Divider, Typography } from "@mui/material";
import location from "../../../assets/location.png";

const ClosestCenters = () => {
  return (
    <div className="w-125 bg-[#FAFAFA] py-9 px-6.5 shadow-[0_2px_6px_#1A1A1A26] rounded-xl">
      <Typography fontSize={28} fontWeight={400} color="#052E1E">
        Closest Centers
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <div className="rounded-xl p-6.5 border-[0.4px] border-[#1A1A1A] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Typography fontSize={24} fontWeight={400} color="#1A1A1A">
            EcoHub Central
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
            0.8 km
          </Typography>
        </div>

        <div className="flex gap-6.75">
          <div className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 text-center items-center">
            <Typography fontSize={14} fontWeight={400} color="#1A1A1A">
              PET
            </Typography>
          </div>
          <div className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 text-center items-center">
            <Typography fontSize={14} fontWeight={400} color="#1A1A1A">
              PET
            </Typography>
          </div>
          <div className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 text-center items-center">
            <Typography fontSize={14} fontWeight={400} color="#1A1A1A">
              PET
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosestCenters;
