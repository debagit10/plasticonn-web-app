import { Typography } from "@mui/material";
import Stats from "./dashboard/Stats";
import CentersMap from "./dashboard/NearbyCenters";
import ClosestCenters from "./dashboard/ClosestCenters";
import RecentDrops from "./dashboard/RecentDrops";
import Achievements from "./dashboard/Achievements";
import { useAuthStore } from "../../utils/useAuth";

const CollectorDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="px-4 sm:px-8 lg:px-16 pb-6 sm:pb-8 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <Typography
          fontSize={{ xs: 24, sm: 32, md: 36, lg: 42 }}
          fontWeight={400}
          color="#1A1A1A"
        >
          Collector Dashboard
        </Typography>

        <Typography
          fontSize={{ xs: 16, sm: 18, md: 22, lg: 26 }}
          fontWeight={300}
          color="#1A1A1A"
        >
          Welcome back, {user?.firstName}
        </Typography>
      </div>

      {/* Stats */}
      <Stats />

      {/* Map + Closest Centers */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-10">
        <div className="w-full lg:w-[60%]">
          <CentersMap />
        </div>

        <div className="w-full lg:w-[35%]">
          <ClosestCenters />
        </div>
      </div>

      {/* Recent Drops + Achievements */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-10">
        <div className="w-full lg:w-[60%]">
          <RecentDrops />
        </div>

        <div className="w-full lg:w-[35%]">
          <Achievements />
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;
