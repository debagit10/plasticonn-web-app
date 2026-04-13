import { Typography, Divider, LinearProgress } from "@mui/material";

const Plastic_Type = () => {
  const stats = [
    {
      type: "PET",
      value: 40.8,
      stat: "5240 kg",
      percentage: "40.8%",
      color: "#0D5DFF",
    },
    {
      type: "HDPE",
      value: 27.4,
      stat: "3520 kg",
      percentage: "27.4%",
      color: "#00C281",
    },
    {
      type: "LDPE",
      value: 17,
      stat: "2180 kg",
      percentage: "17%",
      color: "#FF9D0D",
    },
    {
      type: "PP",
      value: 9.7,
      stat: "1240 kg",
      percentage: "9.7%",
      color: "#8A38F5",
    },
    {
      type: "Others",
      value: 5.2,
      stat: "667 kg",
      percentage: "5.2%",
      color: "#1A1A1AB2",
    },
  ];

  return (
    <div
      className="
    bg-[#FAFAFA] rounded-xl shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col gap-6 sm:gap-7
    
    w-full
    p-5 sm:p-7 lg:p-9
  "
    >
      {/* HEADER */}
      <div>
        <Typography
          className="text-xl sm:text-2xl lg:text-[28px]"
          fontWeight={400}
          color="#052E1E"
        >
          Plastic Type Distribution
        </Typography>

        <div className="mt-3 sm:mt-5">
          <Divider />
        </div>
      </div>

      {/* LIST + PROGRESS */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-3">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />

                <Typography
                  className="text-sm sm:text-base lg:text-lg"
                  fontWeight={300}
                  color="#1A1A1A"
                >
                  {stat.type}
                </Typography>
              </div>

              {/* RIGHT */}
              <Typography
                className="text-sm sm:text-base lg:text-lg"
                fontWeight={300}
                color="#1A1A1A"
              >
                {stat.stat}{" "}
                <span className="text-[#1A1A1A80]">({stat.percentage})</span>
              </Typography>
            </div>

            <LinearProgress
              variant="determinate"
              value={stat.value}
              sx={{
                height: { xs: 6, sm: 8, lg: 10 },
                borderRadius: "8px",
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: stat.color,
                  borderRadius: "8px",
                },
              }}
            />
          </div>
        ))}
      </div>

      {/* BAR CHART */}
      <div className="flex gap-3 sm:gap-5 lg:gap-8 justify-between items-end h-40 sm:h-52 lg:h-64 overflow-x-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 min-w-[60px]"
          >
            <div className="flex-1 flex items-end justify-center w-full">
              <div
                className="rounded-t-xl w-6 sm:w-10 lg:w-12"
                style={{
                  backgroundColor: stat.color,
                  height: `${stat.percentage}`,
                }}
              />
            </div>

            <Typography
              className="mt-2 text-xs sm:text-sm lg:text-base"
              fontWeight={400}
            >
              {stat.type}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plastic_Type;
