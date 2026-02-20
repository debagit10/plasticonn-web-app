import { Badge } from "@mui/material";
import bell from "../assets/bell.png";

const Notification = () => {
  return (
    <div>
      <Badge
        badgeContent={4}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#FF383C",
            color: "#fff",
          },
        }}
      >
        <img src={bell} />
      </Badge>
    </div>
  );
};

export default Notification;
