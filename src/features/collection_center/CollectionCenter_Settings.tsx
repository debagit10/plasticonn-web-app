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
    <div className="px-4 sm:px-8 lg:px-16">
      {/* HEADER */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div onClick={() => navigate("/dashboard")}>
          <img src={back} className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="flex flex-col gap-1 sm:gap-1.5 mt-1 sm:mt-3">
          <Typography
            fontWeight={400}
            fontSize={25}
            color="#1A1A1A"
            className="text-xl sm:text-2xl lg:text-[28px]"
          >
            Profile Settings
          </Typography>

          <Typography
            fontWeight={300}
            color="#1A1A1A80"
            className="text-sm sm:text-base lg:text-[24px]"
          >
            Manage your personal information
          </Typography>
        </div>
      </div>

      {/* SECTIONS */}

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Profile_details />
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Accepted_Plastics />
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Edit_profile />
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10 pb-[5%]">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default CollectionCenter_Settings;
