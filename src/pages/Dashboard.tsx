import CollectionCenter_Dashboard from "../features/collection_center/CollectionCenter_Dashboard";
import CollectorDashboard from "../features/collectors/CollectorDashboard";
import RecylcingCenter_Dashboard from "../features/recylcing_center/RecyclingCenter_Dashboard";
import { useAuth } from "../utils/useAuth";

const Dashboard = () => {
  const user = useAuth();

  return (
    <div className="">
      {user?.isCollector && <CollectorDashboard />}

      {user.isCollection && <CollectionCenter_Dashboard />}

      {user.isRecycling && <RecylcingCenter_Dashboard />}
    </div>
  );
};

export default Dashboard;
