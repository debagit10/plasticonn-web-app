import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import CentersMap from "./dashboard/NearbyCenters";
import ClosestCenters from "./dashboard/ClosestCenters";
import RecentDrops from "./dashboard/RecentDrops";
import Achievements from "./dashboard/Achievements";

const CollectorDashboard = () => {
  return (
    <div className="px-16">
      <div className="flex flex-col gap-3">
        <Typography fontSize={42} fontWeight={400} color="#1A1A1A">
          Collector Dashboard
        </Typography>
        <Typography fontSize={26} fontWeight={300} color="#1A1A1A">
          Welcome back, Sarah
        </Typography>
      </div>

      <Stats />

      <div className="flex justify-between mt-10 gap-10">
        <CentersMap />

        <ClosestCenters />
      </div>

      <div className="flex justify-between my-10 gap-10">
        <RecentDrops />

        <Achievements />
      </div>
    </div>
  );
};

export default CollectorDashboard;
