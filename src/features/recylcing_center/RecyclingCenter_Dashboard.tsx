import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import Plastic_Type from "./dashboard/Plastic_Type";
import Messages from "./dashboard/Messages";
import { useAuthStore } from "../../utils/useAuth";

const RecylcingCenter_Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <Typography
          fontWeight={400}
          fontSize={25}
          color="#1A1A1A"
          className="text-2xl sm:text-3xl lg:text-[42px]"
        >
          Recycling Center
        </Typography>

        <Typography
          fontWeight={300}
          fontSize={18}
          color="#1A1A1A"
          className="text-base sm:text-xl lg:text-[26px]"
        >
          Welcome back, {user?.name}. ID: {user?.centerId}
        </Typography>
      </div>

      {/* STATS */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Stats />
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col lg:flex-row gap-6 lg:gap-10 pb-10">
        <div className="w-full lg:w-1/2">
          <Plastic_Type />
        </div>

        <div className="w-full lg:w-1/2">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default RecylcingCenter_Dashboard;
