import { Typography } from "@mui/material";
import co2saved from "../../../assets/co2saved.png";
import submission from "../../../assets/submissions.png";
import achievement from "../../../assets/Achievement.png";

const stats = [
  {
    icon: co2saved,
    stat: "+12.3%",
    title: "Total CO₂ Saved",
    value: "247.8 kg",
    bg: "#00C2811A",
    color: "#00C281",
  },
  {
    icon: submission,
    stat: "23 total",
    title: "Verified Submissions",
    value: "18",
    bg: "#FA98081A",
    color: "#FF9D0D",
  },
  {
    icon: achievement,
    stat: "Active",
    title: "Achievement",
    value: "3/12",
    bg: "#8A38F51A",
    color: "#8A38F5",
  },
];

const Stats = () => {
  return (
    <div className="flex gap-10 mt-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group bg-[#FAFAFA] p-10.5 rounded-xl shadow-[0_2px_6px_#1A1A1A26] w-125 h-82.5 transition-all duration-300"
        >
          <div className="flex justify-between">
            <img src={stat.icon} />

            <div
              className="p-2.5 rounded-xl w-37.5 h-15 text-center"
              style={{ backgroundColor: stat.bg }}
            >
              <Typography fontSize={26} fontWeight={300} color={stat.color}>
                {stat.stat}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-10">
            <Typography fontSize={24} fontWeight={300} color="#1A1A1A">
              {stat.title}
            </Typography>

            <Typography
              fontSize={32}
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
