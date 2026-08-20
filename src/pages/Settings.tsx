import CollectionCenter_Settings from "../features/collection_center/CollectionCenter_Settings";
import CollectorSettings from "../features/collectors/CollectorSettings";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const user = useAuth();

  const navigate = useNavigate();

  if (!user.user?._id) {
    navigate("/join");
  }

  return (
    <div>
      {user?.isCollector && <CollectorSettings />}

      {user.isCenter && <CollectionCenter_Settings />}
    </div>
  );
};

export default Settings;
