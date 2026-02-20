import { Typography } from "@mui/material";
import Notification from "./Notification";
import AvatarMenu from "./AvatarMenu";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between px-16 py-6.5 bg-[#FAFAFA] sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Plasticonn logo" width={56} height={56} />

        <Typography fontSize={36} fontWeight={400} color="#005C3D">
          Plasticonn
        </Typography>
      </div>

      <div className="flex gap-4 items-center">
        <Notification />

        <AvatarMenu />
      </div>
    </div>
  );
};

export default Navbar;
