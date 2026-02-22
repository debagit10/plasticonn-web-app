import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";

const CollectionCenter_Dashboard = () => {
  return (
    <div className="px-16 ">
      <div className="flex flex-col gap-3">
        <Typography fontSize={42} fontWeight={400} color="#1A1A1A">
          Collection Center
        </Typography>
        <Typography fontSize={26} fontWeight={300} color="#1A1A1A">
          EcoHub Central
        </Typography>
      </div>

      <div className="mt-10">
        <Stats />
      </div>
    </div>
  );
};

export default CollectionCenter_Dashboard;
