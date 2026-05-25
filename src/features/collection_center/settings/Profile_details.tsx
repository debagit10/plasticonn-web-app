import { Avatar, Typography } from "@mui/material";
import { HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import {
  HiOutlineBuildingOffice,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { useAuthStore } from "../../../utils/useAuth";
import Change_picture from "../modals/Change_picture";
import Remove_picture from "../modals/Remove_picture";
import { getInitials } from "../../../utils/getInitials";

const Profile_details = () => {
  const { user } = useAuthStore();
  return (
    <div
      className="
    bg-[#FAFAFA] rounded-[18px] shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col gap-6 sm:gap-7
    p-5 sm:p-7 lg:p-9
  "
    >
      <div
        className="
      flex flex-col lg:flex-row 
      gap-6 lg:gap-10 
      lg:items-start
    "
      >
        {/* PROFILE IMAGE (NEW) */}
        <div className="flex flex-col items-center gap-3">
          {/* <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full p-2">
            <img
              src={user?.image?.url}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div> */}

          <Avatar
            src={user?.image?.url || undefined}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#00C281",
            }}
          >
            {!user?.image?.url && getInitials(user?.name)}
          </Avatar>
          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <Change_picture />

            <Remove_picture />
          </div>
        </div>

        {/* LEFT SECTION */}
        <div className="flex flex-col gap-5 sm:gap-6 flex-1">
          {/* Title */}
          <div className="flex gap-3 items-center">
            <HiOutlineBuildingOffice className="text-[#1A1A1A] text-lg sm:text-xl" />

            <Typography
              fontWeight={500}
              className="text-base sm:text-lg lg:text-[20px]"
              color="#1A1A1A"
            >
              {user?.name}
            </Typography>
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
        flex flex-col gap-5 sm:gap-6 
        lg:items-end lg:text-right
      "
        >
          {/* Status */}
          <div className="bg-[#00C2811A] text-[#00C281] px-3 py-1 rounded-lg text-xs sm:text-sm">
            Active
          </div>

          {/* Hours */}
          <div className="flex gap-3 items-center lg:justify-end">
            <HiOutlineClock className="text-[#1A1A1A80] text-lg sm:text-xl" />

            <div>
              <Typography className="text-xs sm:text-sm" color="#1A1A1A80">
                Operating Hours
              </Typography>

              <Typography className="text-sm sm:text-base" color="#1A1A1A">
                {user?.operatingHours}
              </Typography>

              {/* <Typography className="text-sm sm:text-base" color="#1A1A1A">
                Saturday: 9:00 AM – 4:00 PM
              </Typography> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_details;
