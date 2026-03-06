import { Badge, Typography } from "@mui/material";
import bell from "../assets/bell.png";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import icon from "../assets/notification.png";
import api from "../utils/axiosInstance";

interface Notifications {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState<Notifications[]>([
    {
      _id: "",
      title: "",
      message: "",
      type: "",
      read: false,
      createdAt: "",
    },
  ]);

  // const notifications = [
  //   {
  //     title: "New submission",
  //     text: "Sarah Johnson submitted 5.2 kg of PET plastic.",
  //     time: "10 mins ago",
  //     read: false,
  //   },
  //   {
  //     title: "Pickup Scheduled",
  //     text: "RecycleMax will pickup tomorrow at 9 AM.",
  //     time: "1 hour ago",
  //     read: false,
  //   },
  //   {
  //     title: "Capacity Alert",
  //     text: "Storage capacity at 85%. Schedule a pickup soon.",
  //     time: "3 hours ago",
  //     read: true,
  //   },
  //   {
  //     title: "Capacity Alert",
  //     text: "Storage capacity at 85%. Schedule a pickup soon.",
  //     time: "3 hours ago",
  //     read: true,
  //   },
  // ];

  const getNotifications = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/api/notification/list`);

      console.log(response.data.data.notifications);

      setNotifications(response.data.data.notifications);

      setLoading(false);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);

      if (errMsg) {
        setLoading(false);
      }
    }
  };

  const readNotification = async (notification_id: string) => {
    try {
      const response = await api.put(
        `/api/notification/read/${notification_id}`,
      );

      console.log(response.data);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.error(errMsg);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await api.put(`/api/notification/read`);

      console.log(response.data);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.error(errMsg);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="relative">
      {/* Bell */}
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        <Badge
          badgeContent={
            notifications.filter((n) => !n.read && n.type === "individual")
              .length
          }
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

            <div onClick={markAllAsRead} className="cursor-pointer">
              <Typography
                fontSize={16}
                fontWeight={400}
                color="#1A1A1A"
                sx={{ textDecoration: "underline" }}
              >
                Mark all as read
              </Typography>
            </div>
          </div>

          {loading && "Loading Notifications"}

          <div className="flex flex-col gap-3 max-h-125 overflow-hidden overflow-y-scroll">
            {notifications
              ? notifications.map((notification, index) => (
                  <div
                    onClick={() => readNotification(notification._id)}
                    key={index}
                    className={`cursor-pointer rounded-xl py-6 px-9 flex gap-4.5 border ${notification.read ? "bg-[#1A1A1A0D] border-[#1A1A1A80]" : "bg-[#00C2810A] border-[#00C281]"}`}
                  >
                    <img src={icon} className="w-15 h-15" />

                    <div className="flex flex-col ">
                      <Typography
                        fontSize={18}
                        fontWeight={400}
                        color="#1A1A1A"
                      >
                        {notification.title}
                      </Typography>

                      <Typography
                        fontSize={16}
                        fontWeight={300}
                        color="#1A1A1A"
                      >
                        {notification.message}
                      </Typography>

                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        color="#1A1A1A99"
                      >
                        {notification.createdAt}
                      </Typography>
                    </div>
                  </div>
                ))
              : "You currently have no notifications"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
