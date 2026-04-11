import { Typography } from "@mui/material";
import Notification from "./Notification";
import AvatarMenu from "./AvatarMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    // <div className="flex justify-between px-16 py-6.5 bg-[#FAFAFA] sticky top-0 z-50 shadow-md">
    //   <div
    //     className="flex items-center gap-2 cursor-pointer"
    //     onClick={() => navigate("/dashboard")}
    //   >
    //     <img src="/logo.png" alt="Plasticonn logo" className="w-14 h-14" />

    //     <Typography fontSize={36} fontWeight={400} color="#005C3D">
    //       Plasticonn
    //     </Typography>
    //   </div>

    //   <div className="flex gap-4 items-center">
    //     <Notification />

    //     <AvatarMenu />
    //   </div>
    // </div>

    <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-4 sm:py-5 bg-[#FAFAFA] sticky top-0 z-50 shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="/logo.png"
          alt="Plasticonn logo"
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
        />

        <Typography
          fontSize={{ xs: 20, sm: 26, md: 30, lg: 36 }}
          fontWeight={400}
          color="#005C3D"
        >
          Plasticonn
        </Typography>
      </div>

      <div className="flex gap-2 sm:gap-4 items-center">
        <Notification />
        <AvatarMenu />
      </div>
    </div>
  );
};

export default Navbar;
