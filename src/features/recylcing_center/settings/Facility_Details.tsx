import { Typography } from "@mui/material";
import { HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import {
  HiOutlineBuildingOffice,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { useAuthStore } from "../../../utils/useAuth";

const Facility_details = () => {
  const { user } = useAuthStore();

  return (
    <div
      className="
    bg-[#FAFAFA] rounded-[18px] shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col gap-6 sm:gap-7
    
    p-5 sm:p-7 lg:p-9
  "
    >
      {" "}
      <div
        className="
      flex flex-col lg:flex-row 
      gap-6 lg:gap-0 
      lg:justify-between
    "
      >
        {" "}
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Title */}
          <div className="flex items-center gap-3">
            <HiOutlineBuildingOffice
              size={20}
              className="text-[#1A1A1A] sm:text-[22px]"
            />{" "}
            <div>
              <Typography
                fontWeight={500}
                color="#1A1A1A"
                className="text-base sm:text-lg lg:text-[20px]"
              >
                {user?.name}
              </Typography>
              {/* <Typography fontSize={14} color="#1A1A1A80">
                Est. 2018 • Industrial Grade Facility
              </Typography> */}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <HiOutlineMapPin className="text-[#1A1A1A80] text-lg sm:text-xl" />
            <div>
              <Typography className="text-xs sm:text-sm" color="#1A1A1A80">
                Address
              </Typography>
              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                {user?.address}
              </Typography>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3">
            <HiOutlinePhone className="text-[#1A1A1A80] text-lg sm:text-xl" />
            <div>
              <Typography className="text-xs sm:text-sm" color="#1A1A1A80">
                Contact Number
              </Typography>
              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                {user?.contactPhone}
              </Typography>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <HiOutlineEnvelope className="text-[#1A1A1A80] text-lg sm:text-xl" />
            <div>
              <Typography className="text-xs sm:text-sm" color="#1A1A1A80">
                Email
              </Typography>
              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                {user?.contactEmail}
              </Typography>
            </div>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div
          className="
        flex flex-col 
        gap-5 sm:gap-6 
        
        lg:items-end 
        lg:text-right
      "
        >
          {/* Status Badge */}
          <div className="">
            <div className="bg-[#00C2811A] text-[#00C281] px-3 py-1 rounded-lg text-xs sm:text-sm w-[20%]">
              Active
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex gap-3 items-center lg:justify-end">
            <HiOutlineClock className="text-[#1A1A1A80] text-lg sm:text-xl" />

            <div>
              <Typography className="text-xs sm:text-sm" color="#1A1A1A80">
                Operating Hours
              </Typography>

              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                Mon–Fri: 8:00 AM – 6:00 PM
              </Typography>

              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                Saturday: 9:00 AM – 4:00 PM
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility_details;
