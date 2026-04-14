import { Typography } from "@mui/material";
import co2saved from "../../../assets/co2saved.png";
import processed from "../../../assets/processed.png";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
        group bg-[#FAFAFA] rounded-xl shadow-[0_2px_6px_#1A1A1A26]
        p-5 sm:p-7 lg:p-9
        transition-all duration-300
      "
        >
          <div className="flex gap-4 sm:gap-6 items-center">
            <img
              src={stat.icon}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            />

            <div className="flex flex-col gap-1 sm:gap-2">
              <Typography
                fontWeight={300}
                color="#1A1A1A"
                className="text-base sm:text-lg lg:text-2xl"
              >
                {stat.title}
              </Typography>

              <Typography
                fontWeight={400}
                color={stat.color}
                className="text-xl sm:text-2xl lg:text-3xl"
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
