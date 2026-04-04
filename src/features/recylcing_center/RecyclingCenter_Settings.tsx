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
    <div className="px-16">
      <div className="flex items-center gap-3.5">
        <div onClick={() => navigate("/dashboard")}>
          <img src={back} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-1 mt-5">
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

      {/* <div className="mt-10">
        <Impact />
      </div> */}

      <div className="mt-10">
        <Change_Details />
      </div>

      <div className="mt-10 pb-10">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default RecyclingCenter_Settings;
