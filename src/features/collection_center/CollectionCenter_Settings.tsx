import { Typography } from "@mui/material";
import back from "../../assets/back.png";
import Profile_details from "./settings/Profile_details";
import Accepted_Plastics from "./settings/Accepted_Plastics";
import Edit_profile from "./modals/Edit_Profile";
import DeleteAccount from "./modals/DeleteAccount";
import { useNavigate } from "react-router-dom";

const CollectionCenter_Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="px-16">
      <div className="flex items-center gap-3.5">
        <div onClick={() => navigate("/dashboard")}>
          <img src={back} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <Typography fontSize={28} fontWeight={400} color="#1A1A1A">
            Profile Settings
          </Typography>
          <Typography fontSize={24} fontWeight={300} color="#1A1A1A80">
            Manage your personal information
          </Typography>
        </div>
      </div>

      <div className="mt-10">
        <Profile_details />
      </div>

      <div className="mt-10">
        <Accepted_Plastics />
      </div>

      <div className="mt-10">
        <Edit_profile />
      </div>

      <div className="mt-10 pb-10">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default CollectionCenter_Settings;
