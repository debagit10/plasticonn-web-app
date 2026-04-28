import { useState } from "react";
import { Avatar, Divider, Typography } from "@mui/material";
import profile from "../assets/profile.png";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils/getInitials";

const AvatarMenu = () => {
  const { user, clearUser } = useAuthStore();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      if (!loading) {
        clearUser();
        localStorage.clear();

        window.location.replace("/");
      }
    }, 2000);
  };

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="py-2 px-3 rounded-[30px] flex items-center cursor-pointer"
      >
        <Avatar
          src={user?.image?.url || undefined}
          sx={{
            width: 50,
            height: 50,
            background: "linear-gradient(to bottom, #005C3D, #00C281)",
          }}
        >
          {!user?.image?.url &&
            getInitials(`${user?.firstName} ${user?.lastName}`)}
        </Avatar>
      </div>

      {open && (
        <div
          className="
      absolute right-0 sm:right-4 mt-8
      bg-[#FAFAFA] p-4 sm:p-6 rounded-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      w-[90vw] max-w-sm
      z-50
    "
        >
          <div className="flex flex-col gap-2">
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              {user?.name} {user?.firstName} {user?.lastName}
            </Typography>
            <Typography fontWeight={400} fontSize={14} color="#1A1A1A80">
              {user?.email} {user?.contactEmail}
            </Typography>
          </div>

          <Divider sx={{ marginY: "14px" }} />

          <div
            className="flex py-1 px-2 gap-3 items-center cursor-pointer"
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
          >
            <img src={profile} className="w-4.5 h-4.5" />

            <Typography fontWeight={400} fontSize={16} color="#1A1A1A">
              Profile Settings
            </Typography>
          </div>

          <Divider sx={{ marginY: "14px" }} />

          <div
            className={`flex py-1 px-2 gap-3 items-center cursor-pointer `}
            onClick={logout}
          >
            <MdLogout size={18} color={!loading ? "#FF383C" : "grey"} />

            <Typography
              fontWeight={400}
              fontSize={16}
              color={!loading ? "#FF383C" : "grey"}
            >
              {loading ? "Logging out..." : "Log out"}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
