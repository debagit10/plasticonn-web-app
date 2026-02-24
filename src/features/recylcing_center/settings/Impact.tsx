import { Typography } from "@mui/material";

const Impact = () => {
  const impactStats = [
    {
      id: 1,
      value: "2.4M kg",
      label: "Plastic Recycled (Lifetime)",
      bg: "#E6F6F1",
      valueColor: "#00C281",
    },
    {
      id: 2,
      value: "18.5K",
      label: "Tons CO₂ Saved",
      bg: "#E8F1FF",
      valueColor: "#0D5DFF",
    },
    {
      id: 3,
      value: "PVC (#3)",
      label: "Pipes, Packaging",
      bg: "#F4E9F9",
      valueColor: "#C026D3",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <div>
        <Typography fontSize={28} fontWeight={400} color="#1A1A1A">
          Environmental Impact
        </Typography>
        <Typography fontSize={24} fontWeight={300} color="#1A1A1A80">
          Our contribution to sustainability
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: stat.bg }}
          >
            <Typography
              style={{ color: stat.valueColor }}
              fontSize={32}
              fontWeight={400}
              color="#1A1A1A80"
            >
              {stat.value}
            </Typography>

            <Typography fontSize={24} fontWeight={300} color="#1A1A1A">
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
