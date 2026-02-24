import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import Plastic_Type from "./dashboard/Plastic_Type";
import Messages from "./dashboard/Messages";

const RecylcingCenter_Dashboard = () => {
  return (
    <div className="px-16 ">
      <div className="flex flex-col gap-3">
        <Typography fontSize={42} fontWeight={400} color="#1A1A1A">
          Recycling Center
        </Typography>
        <Typography fontSize={26} fontWeight={300} color="#1A1A1A">
          GreenTech Processing Facility
        </Typography>
      </div>

      <div className="mt-10">
        <Stats />
      </div>

      <div className="mt-10 flex gap-10 pb-10">
        <Plastic_Type />

        <Messages />
      </div>
    </div>
  );
};

export default RecylcingCenter_Dashboard;
