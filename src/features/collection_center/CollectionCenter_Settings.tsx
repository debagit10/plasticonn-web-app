import { Typography } from "@mui/material";
import back from "../../assets/back.png";
import Profile_details from "./settings/Profile_details";
import Accepted_Plastics from "./settings/Accepted_Plastics";
import Change_Password from "./modals/Change_Password";
import Edit_profile from "./modals/Edit_Profile";

const CollectionCenter_Settings = () => {
  return (
    <div className="px-16">
      <div className="flex items-center gap-3.5">
        <img src={back} />

        <div className="flex flex-col gap-3 mt-5">
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
        <Change_Password />
      </div>

      <div className="mt-10 pb-10">
        <Edit_profile />
      </div>
    </div>
  );
};

export default CollectionCenter_Settings;
