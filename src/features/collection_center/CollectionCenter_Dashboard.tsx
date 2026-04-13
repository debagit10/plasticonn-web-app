import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import Queue from "./dashboard/Queue";
import { useAuthStore } from "../../utils/useAuth";

const CollectionCenter_Dashboard = () => {
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
          Collection Center Dashboard
        </Typography>

        <Typography
          fontWeight={300}
          color="#1A1A1A"
          className="text-lg sm:text-xl lg:text-[26px]"
        >
          Welcome back, {user?.name}
        </Typography>
      </div>

      {/* STATS */}
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Stats />
      </div>

      {/* QUEUE */}
      <div className="mt-6 sm:mt-8 lg:mt-10 pb-[20%]">
        <Queue />
      </div>
    </div>
  );
};

export default CollectionCenter_Dashboard;
