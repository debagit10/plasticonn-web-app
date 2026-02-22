import { Typography } from "@mui/material";
import Profile_Picture from "../features/collectors/settings/Profile_Picture";
import back from "../assets/back.png";
import Personal from "../features/collectors/settings/Personal";
import Change_Password from "../features/collectors/modals/Change_Password";
import Edit_profile from "../features/collectors/modals/Edit_profile";

const SettingsPage = () => {
  return (
    <div className="px-16 bg-[#F1F1F1]">
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
        <Profile_Picture />
      </div>

      <div className="mt-10">
        <Personal />
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

export default SettingsPage;
