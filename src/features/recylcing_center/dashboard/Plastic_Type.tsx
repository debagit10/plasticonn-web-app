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
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7 w-262.5">
      <div className="">
        <div className="">
          <Typography fontSize={28} fontWeight={400} color="#052E1E">
            Plastic Type Distribution
          </Typography>
        </div>

        <div className="mt-5">
          <Divider />
        </div>
      </div>

      <div className="flex flex-col gap-[12.4px]">
        {stats.map((stat, index) => (
          <div key={index} className=" gap-2 lg:gap-3 items-center">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div
                  className={`bg-[${stat.color}] w-4.5 h-4.5 rounded-full`}
                  style={{ backgroundColor: `${stat.color}` }}
                />
                <Typography
                  fontSize={{ xs: 14, lg: 20 }}
                  fontWeight={300}
                  color="#1A1A1A"
                  sx={{ minWidth: { xs: "28px", lg: "32px" } }}
                >
                  {stat.type}
                </Typography>
              </div>

              <Typography
                fontSize={{ xs: 14, lg: 20 }}
                fontWeight={300}
                color="#1A1A1A"
                sx={{
                  minWidth: { xs: "50px", lg: "60px" },
                  textAlign: "right",
                }}
              >
                {stat.stat}{" "}
                <span className="text-[#1A1A1A80]">{`(${stat.percentage})`}</span>
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={stat.value}
              sx={{
                marginTop: "12px",
                flex: 1,
                //maxWidth: { lg: "623.35px" },
                height: { xs: "8px", lg: "10px" },
                borderRadius: "8px",
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#1A1A1A",
                  borderRadius: "8px",
                },
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between h-64">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center h-full">
            <div className="flex-1 flex items-end w-full justify-center">
              <div
                className="rounded-t-[18px] w-45"
                style={{
                  backgroundColor: stat.color,
                  height: stat.percentage,
                }}
              />
            </div>

            <Typography className="mt-2" fontSize={26} fontWeight={400}>
              {stat.type}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plastic_Type;
