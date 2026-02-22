import CollectionCenter_Settings from "../features/collection_center/CollectionCenter_Settings";
import CollectorSettings from "../features/collectors/CollectorSettings";
import { useAuth } from "../utils/useAuth";

const Settings = () => {
  const user = useAuth();

  return (
    <div>
      {user?.isCollector && <CollectorSettings />}

      {user.isCollection && <CollectionCenter_Settings />}

      {user.isRecycling && "Recycling center"}
    </div>
  );
};

export default Settings;
