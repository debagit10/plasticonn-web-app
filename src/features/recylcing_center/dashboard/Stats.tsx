import { Typography } from "@mui/material";
import co2saved from "../../../assets/co2saved.png";
import processed from "../../../assets/Processed.png";
import efficiency from "../../../assets/efficiency.png";
import partners from "../../../assets/partners.png";

const stats = [
  {
    icon: processed,
    title: "Total Processed",
    value: "12,847 kg",
    bg: "#FA98081A",
    color: "#1A1A1A",
  },
  {
    icon: co2saved,
    title: "CO₂ Reduced",
    value: "30,832 kg",
    bg: "#FA98081A",
    color: "#00C281",
  },
  {
    icon: efficiency,
    title: "Efficiency",
    value: "94.2%",
    color: "#0D5DFF",
  },

  {
    icon: partners,
    title: "Active Partners",
    value: "23",
    color: "#8A38F5",
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
