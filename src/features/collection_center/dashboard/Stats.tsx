import { Typography } from "@mui/material";
import verified from "../../../assets/verified.png";
import co2saved from "../../../assets/co2saved.png";
import pending from "../../../assets/pending.png";
import today from "../../../assets/today.png";
import api from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";

const statsConfig = [
  {
    key: "verifiedDrops",
    icon: verified,
    title: "Total Verified",
    color: "#1A1A1A",
  },
  {
    key: "totalCO2Saved",
    icon: co2saved,
    title: "CO₂ Saved (g)",
    bg: "#FA98081A",
    color: "#00C281",
  },
  {
    key: "pendingDrops",
    icon: pending,
    title: "Pending Queue",
    color: "#FF9D0D",
  },
  {
    key: "todayDrops",
    icon: today,
    title: "Today collections",
    color: "#0D5DFF",
  },
];

type StatsData = {
  verifiedDrops: number;
  pendingDrops: number;
  totalCO2Saved: number;
  todayDrops: number;
};

const Stats = () => {
  const [stats, setStats] = useState<StatsData>({
    verifiedDrops: 0,
    pendingDrops: 0,
    totalCO2Saved: 0,
    todayDrops: 0,
  });

  const getStats = async () => {
    try {
      const response = await api.get("/api/center/dashboard");
      console.log(response.data.data);
      setStats(response.data.data);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="flex justify-between mt-10">
      {statsConfig.map((stat, index) => (
        <div
          key={index}
          className="group bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] min-w-80 h-38 transition-all duration-300"
        >
          <div className="flex gap-6.5">
            <img src={stat.icon} className="w-20 h-20" />

            <div className="flex flex-col gap-2">
              <Typography fontSize={24} fontWeight={300} color="#1A1A1A">
                {stat.title}
              </Typography>

              <Typography
                fontSize={32}
                fontWeight={400}
                color={stat.color}
                sx={{
                  transition: "all 0.3s ease",
                  ".group:hover &": {
                    boxShadow: `6px 6px 36px 0px ${stat.bg}`,
                    color: stat.color,
                  },
                }}
              >
                {stats[stat.key as keyof StatsData]}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
