import { Badge, Typography } from "@mui/material";
import bell from "../assets/bell.png";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import icon from "../assets/notification.png";

const Notification = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      title: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic.",
      time: "10 mins ago",
      read: false,
    },
    {
      title: "Pickup Scheduled",
      text: "RecycleMax will pickup tomorrow at 9 AM.",
      time: "1 hour ago",
      read: false,
    },
    {
      title: "Capacity Alert",
      text: "Storage capacity at 85%. Schedule a pickup soon.",
      time: "3 hours ago",
      read: true,
    },
    {
      title: "Capacity Alert",
      text: "Storage capacity at 85%. Schedule a pickup soon.",
      time: "3 hours ago",
      read: true,
    },
  ];

  return (
    <div className="relative">
      {/* Bell */}
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        <Badge
          badgeContent={notifications.filter((n) => !n.read).length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#FF383C",
              color: "#fff",
            },
          }}
        >
          <img src={bell} alt="notifications" />
        </Badge>
      </div>

      {/* Floating Card */}
      {open && (
        <div
          className="absolute right-0 mt-11
                   bg-[#FAFAFA] p-9 rounded-xl 
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                   w-214.75 z-50"
        >
          <div
            className="flex justify-end cursor-pointer ml-[97%] w-4.5 h-4.5 mb-4"
            onClick={() => setOpen(false)}
          >
            <IoClose size={14} />
          </div>

          <div className="flex justify-between">
            <Typography fontSize={26} fontWeight={500} color="#00C281">
              Notifications
            </Typography>

            <Typography
              fontSize={16}
              fontWeight={400}
              color="#1A1A1A"
              sx={{ textDecoration: "underline" }}
            >
              Mark all as read
            </Typography>
          </div>

          <div className="flex flex-col gap-3 max-h-125 overflow-hidden overflow-y-scroll">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`rounded-xl py-6 px-9 flex gap-4.5 border ${notification.read ? "bg-[#1A1A1A0D] border-[#1A1A1A80]" : "bg-[#00C2810A] border-[#00C281]"}`}
              >
                <img src={icon} className="w-15 h-15" />

                <div className="flex flex-col ">
                  <Typography fontSize={18} fontWeight={400} color="#1A1A1A">
                    {notification.title}
                  </Typography>

                  <Typography fontSize={16} fontWeight={300} color="#1A1A1A">
                    {notification.text}
                  </Typography>

                  <Typography fontSize={14} fontWeight={400} color="#1A1A1A99">
                    {notification.time}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
