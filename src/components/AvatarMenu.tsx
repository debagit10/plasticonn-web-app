import { useState } from "react";
import user from "../assets/user.png";
import { Divider, Typography } from "@mui/material";
import profile from "../assets/profile.png";
import { MdLogout } from "react-icons/md";

const AvatarMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="bg-linear-to-b from-[#005C3D] to-[#00C281] py-2 px-3 rounded-[30px] flex items-center cursor-pointer"
      >
        <img src={user} width={28} height={28} />
      </div>

      {open && (
        <div
          className="absolute right-13 mt-9
                   bg-[#FAFAFA] p-6.5 rounded-xl 
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                   w-76.5 z-50"
        >
          <div className="flex flex-col gap-2">
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Sarah Johnson
            </Typography>
            <Typography fontWeight={400} fontSize={14} color="#1A1A1A80">
              sarah.j@example.com
            </Typography>
          </div>

          <Divider sx={{ marginY: "14px" }} />

          <div className="flex py-1 px-2 gap-3 items-center cursor-pointer">
            <img src={profile} className="w-4.5 h-4.5" />

            <Typography fontWeight={400} fontSize={16} color="#1A1A1A">
              Profile Settings
            </Typography>
          </div>

          <Divider sx={{ marginY: "14px" }} />

          <div className="flex py-1 px-2 gap-3 items-center cursor-pointer">
            <MdLogout size={18} color="#FF383C" />

            <Typography fontWeight={400} fontSize={16} color="#FF383C">
              Log out
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
