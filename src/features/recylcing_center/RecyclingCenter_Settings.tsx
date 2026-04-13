import { Typography } from "@mui/material";
import back from "../../assets/back.png";
import Facility_details from "./settings/Facility_Details";
import Accepted_Plastics from "./settings/Accepted_Plastics";
import Change_Details from "./modals/Change_Details";
// import Impact from "./settings/Impact";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./modals/DeleteAccount";

const RecyclingCenter_Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-8 lg:px-16">
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
            Facility Details
          </Typography>
          <Typography
            fontWeight={300}
            color="#1A1A1A80"
            className="text-sm sm:text-base lg:text-[24px]"
          >
            View and manage your recycling facility information
          </Typography>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Facility_details />
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Accepted_Plastics />
      </div>

      {/* <div className="mt-10">
        <Impact />
      </div> */}

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <Change_Details />
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-10 pb-[20%]">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default RecyclingCenter_Settings;
