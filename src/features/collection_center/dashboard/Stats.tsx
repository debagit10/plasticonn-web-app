import { Typography } from "@mui/material";
import verified from "../../../assets/verified.png";
import co2saved from "../../../assets/co2saved.png";
import pending from "../../../assets/pending.png";
import today from "../../../assets/today.png";

const stats = [
  {
    icon: verified,
    title: "Total Verified",
    value: "247.8 kg",
    color: "#1A1A1A",
  },
  {
    icon: co2saved,
    title: "CO₂ Saved",
    value: "1847 kg",
    bg: "#FA98081A",
    color: "#00C281",
  },
  {
    icon: pending,
    title: "Pending Queue",
    value: "8",
    color: "#FF9D0D",
  },

  {
    icon: today,
    title: "Today collections",
    value: "23",
    color: "#0D5DFF",
  },
];

const Stats = () => {
  return (
    <div className="flex justify-between mt-10">
      {stats.map((stat, index) => (
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
                {stat.value}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
