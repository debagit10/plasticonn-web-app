import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import Queue from "./dashboard/Queue";
import { useAuthStore } from "../../utils/useAuth";

const CollectionCenter_Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="px-16 ">
      <div className="flex flex-col gap-3">
        <Typography fontSize={42} fontWeight={400} color="#1A1A1A">
          Collection Center
        </Typography>
        <Typography fontSize={26} fontWeight={300} color="#1A1A1A">
          Welcome back, {user?.name}
        </Typography>
      </div>

      <div className="mt-10">
        <Stats />
      </div>

      <div className=" mt-10">
        <Queue />
      </div>
    </div>
  );
};

export default CollectionCenter_Dashboard;
