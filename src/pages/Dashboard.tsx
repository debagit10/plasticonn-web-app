import CollectionCenter_Dashboard from "../features/collection_center/CollectionCenter_Dashboard";
import CollectorDashboard from "../features/collectors/CollectorDashboard";
import { useAuth } from "../utils/useAuth";

const Dashboard = () => {
  const user = useAuth();

  return (
    <div className="">
      {user?.isCollector && <CollectorDashboard />}

      {user.isCollection && <CollectionCenter_Dashboard />}

      {user.isRecycling && "Recycling center"}
    </div>
  );
};

export default Dashboard;
