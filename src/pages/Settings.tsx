import CollectionCenter_Settings from "../features/collection_center/CollectionCenter_Settings";
import CollectorSettings from "../features/collectors/CollectorSettings";
import RecyclingCenter_Settings from "../features/recylcing_center/RecyclingCenter_Settings";
import { useAuth } from "../utils/useAuth";

const Settings = () => {
  const user = useAuth();

  return (
    <div>
      {user?.isCollector && <CollectorSettings />}

      {user.isCollection && <CollectionCenter_Settings />}

      {user.isRecycling && <RecyclingCenter_Settings />}
    </div>
  );
};

export default Settings;
