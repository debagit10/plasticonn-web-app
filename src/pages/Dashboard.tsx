import { useEffect } from "react";
import CollectionCenter_Dashboard from "../features/collection_center/CollectionCenter_Dashboard";
import CollectorDashboard from "../features/collectors/CollectorDashboard";
import { useAuth, useAuthStore } from "../utils/useAuth";

const Dashboard = () => {
  const user = useAuth();

  const { setCoords } = useAuthStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
    );
  }, []);

  return (
    <div className="">
      {user?.isCollector && <CollectorDashboard />}

      {user.isCenter && <CollectionCenter_Dashboard />}
    </div>
  );
};

export default Dashboard;
