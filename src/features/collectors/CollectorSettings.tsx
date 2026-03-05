import { Typography } from "@mui/material";
import Profile_Picture from "./settings/Profile_Picture";
import back from "../../assets/back.png";
import Personal from "./settings/Personal";
import Change_Password from "./modals/Change_Password";
import Edit_profile from "./modals/Edit_profile";
import { useNavigate } from "react-router-dom";

const CollectorSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="px-16">
      <div className="flex items-center gap-3.5">
        <div onClick={() => navigate("/dashboard")}>
          <img src={back} className="cursor-pointer" />
        </div>

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

export default CollectorSettings;
