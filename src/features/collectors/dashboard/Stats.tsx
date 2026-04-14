import { Typography } from "@mui/material";
import co2saved from "../../../assets/co2saved.png";
import submission from "../../../assets/submissions.png";
import achievement from "../../../assets/achievement.png";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";

const Stats = () => {
  const [stats, setStats] = useState({
    co2Saved: "0kg",
    verifiedSubmissions: 0,
    totalSubmissions: 0,
    achievement: "Coming Soon",
  });

  const getStats = async () => {
    try {
      const response = await api.get("/api/collector/dashboard");
      setStats(response.data.data);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const statsDisplay = [
    {
      icon: co2saved,
      stat: "+12.3%",
      title: "Total CO₂ Saved",
      value: stats.co2Saved,
      bg: "#00C2811A",
      color: "#00C281",
    },
    {
      icon: submission,
      stat: `${stats.totalSubmissions} total`,
      title: "Verified Submissions",
      value: String(stats.verifiedSubmissions),
      bg: "#FA98081A",
      color: "#FF9D0D",
    },
    {
      icon: achievement,
      // stat: stats.achievement,
      stat: "---",
      title: "Achievement",
      value: "Coming soon!!",
      bg: "#8A38F51A",
      color: "#8A38F5",
    },
  ];
  return (
    <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {statsDisplay.map((stat, index) => (
        <div
          key={index}
          className="
        group bg-[#FAFAFA]
        p-4 sm:p-6 lg:p-8
        rounded-xl
        shadow-[0_2px_6px_#1A1A1A26]
        w-full
        min-h-45 sm:min-h-55
        transition-all duration-300
      "
        >
          {/* Top Section */}
          <div className="flex justify-between items-center">
            <img
              src={stat.icon}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />

            <div
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-xl text-center"
              style={{ backgroundColor: stat.bg }}
            >
              <Typography
                fontSize={{ xs: 14, sm: 18, md: 22, lg: 26 }}
                fontWeight={300}
                color={stat.color}
              >
                {stat.stat}
              </Typography>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6">
            <Typography
              fontSize={{ xs: 16, sm: 18, md: 20, lg: 24 }}
              fontWeight={300}
              color="#1A1A1A"
            >
              {stat.title}
            </Typography>

            <Typography
              fontSize={{ xs: 20, sm: 24, md: 28, lg: 32 }}
              fontWeight={400}
              sx={{
                transition: "all 0.3s ease",
                ".group:hover &": {
                  boxShadow: `6px 6px 36px 0px ${stat.bg}`,
                  color: stat.color,
                },
              }}
            >
              {stat.value}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
