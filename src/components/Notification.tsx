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

  const getNotifications = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/api/notification/list`);

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

  // const readNotification = async (notification_id: string) => {
  //   try {
  //     const response = await api.put(
  //       `/api/notification/read/${notification_id}`,
  //     );

  //     console.log(response.data);
  //   } catch (error: any) {
  //     const errMsg = error?.response?.data?.message;
  //     console.error(errMsg);
  //   }
  // };

  const markAllAsRead = async () => {
    try {
      const response = await api.put(`/api/notification/read`);

      console.log(response.data);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.error(errMsg);
    }
  };

  const handleOpenNotifications = async () => {
    setOpen((prev) => !prev);

    await markAllAsRead();

    getNotifications();
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="relative">
      {/* Bell */}
      <div onClick={handleOpenNotifications} className="cursor-pointer">
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
          className="
    fixed inset-0
    flex items-center justify-center
    z-50
  "
        >
          <div
            className="
      bg-[#FAFAFA]
      p-4 sm:p-6 lg:p-5
      rounded-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]

      w-[95vw]
      sm:w-100
      lg:w-150

      max-h-[80vh]
      overflow-hidden
    "
          >
            <div
              className="flex justify-end cursor-pointer mb-4"
              onClick={() => setOpen(false)}
            >
              <IoClose size={16} />
            </div>

            <div className="flex justify-between">
              <Typography fontSize={26} fontWeight={500} color="#00C281">
                Notifications
              </Typography>
            </div>

            {loading && "Loading Notifications"}

            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {" "}
              {notifications
                ? notifications
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .map((notification, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-xl p-4 sm:p-6 flex gap-3 sm:gap-4 border ${
                          notification.read
                            ? "bg-[#1A1A1A0D] border-[#1A1A1A80]"
                            : "bg-[#00C2810A] border-[#00C281]"
                        }`}
                      >
                        <img src={icon} className="w-10 h-10 sm:w-12 sm:h-12" />

                        <div className="flex flex-col">
                          <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
                            {notification.title}
                          </Typography>

                          <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                            {notification.message}
                          </Typography>

                          <Typography
                            fontSize={{ xs: 10, sm: 12, md: 14 }}
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
        </div>
      )}
    </div>
  );
};

export default Notification;
