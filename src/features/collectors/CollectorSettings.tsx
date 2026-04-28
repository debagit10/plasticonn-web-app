import { Typography } from "@mui/material";
import back from "../../assets/back.png";
import Personal from "./settings/Personal";
import Edit_profile from "./modals/Edit_profile";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./modals/DeleteAccount";

const CollectorSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-8 lg:px-16 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Back Button */}
        <div onClick={() => navigate("/dashboard")} className="mt-1 sm:mt-0">
          <img src={back} className="cursor-pointer w-5 sm:w-6 lg:w-auto" />
        </div>

        {/* Title */}
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

      {/* Sections */}
      <div className="mt-6 sm:mt-10">
        <Personal />
      </div>

      <div className="mt-6 sm:mt-10">
        <Edit_profile />
      </div>

      <div className="mt-6 sm:mt-10 pb-[5%]">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default CollectorSettings;
