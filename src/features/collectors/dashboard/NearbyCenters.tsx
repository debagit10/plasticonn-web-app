import { Divider, Typography } from "@mui/material";
import Navigate from "../modals/Navigate";

const CentersMap = () => {
  return (
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-17 w-262.5">
      <div className="flex justify-between">
        <Typography fontSize={28} fontWeight={400} color="#052E1E">
          Nearby Collection Centers
        </Typography>

        <Navigate />
      </div>

      <Divider />
    </div>
  );
};

export default CentersMap;
