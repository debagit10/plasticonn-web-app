import { Typography } from "@mui/material";
import back from "../../assets/back.png";
import Facility_details from "./settings/Facility_Details";
import Accepted_Plastics from "./settings/Accepted_Plastics";
import Change_Password from "./modals/Change_Password";
import Change_Details from "./modals/Change_Details";
import Impact from "./settings/Impact";

const RecyclingCenter_Settings = () => {
  return (
    <div className="px-16">
      <div className="flex items-center gap-3.5">
        <img src={back} />

        <div className="flex flex-col gap-3 mt-5">
          <Typography fontSize={28} fontWeight={400} color="#1A1A1A">
            Facility Details
          </Typography>
          <Typography fontSize={24} fontWeight={300} color="#1A1A1A80">
            View and manage your recycling facility information
          </Typography>
        </div>
      </div>

      <div className="mt-10">
        <Facility_details />
      </div>

      <div className="mt-10">
        <Accepted_Plastics />
      </div>

      <div className="mt-10">
        <Impact />
      </div>

      <div className="mt-10">
        <Change_Password />
      </div>

      <div className="mt-10 pb-10">
        <Change_Details />
      </div>
    </div>
  );
};

export default RecyclingCenter_Settings;
