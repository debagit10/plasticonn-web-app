import { Typography } from "@mui/material";
import Stats from "../features/collectors/dashboard/Stats";
import CentersMap from "../features/collectors/dashboard/NearbyCenters";
import ClosestCenters from "../features/collectors/dashboard/ClosestCenters";

const DashboardPage = () => {
  return (
    <div className="px-16">
      <div className="flex flex-col gap-3 mt-5">
        <Typography fontSize={42} fontWeight={400} color="#1A1A1A">
          Collector Dashboard
        </Typography>
        <Typography fontSize={26} fontWeight={26} color="#1A1A1A">
          Welcome back, Sarah
        </Typography>
      </div>

      <Stats />

      <div className="flex justify-between mt-10 gap-10">
        <CentersMap />

        <ClosestCenters />
      </div>
    </div>
  );
};

export default DashboardPage;
