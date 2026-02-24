import { Typography } from "@mui/material";

const Accepted_Plastics = () => {
  const plasticTypes = [
    {
      id: 1,
      name: "PET",
      description: "Bottles, Containers",
      bg: "#E8F1FF",
      textColor: "#0D5DFF",
    },
    {
      id: 2,
      name: "HDPE",
      description: "Bottles, Jugs",
      bg: "#E6F6F1",
      textColor: "#00C281",
    },
    {
      id: 3,
      name: "PVC",
      description: "Pipes, Packaging",
      bg: "#F4E9F9",
      textColor: "#C026D3",
    },
    {
      id: 4,
      name: "LDPE",
      description: "Bags, Wraps",
      bg: "#F5EFE9",
      textColor: "#F97316",
    },
    {
      id: 5,
      name: "PP",
      description: "Containers, Caps",
      bg: "#FDECEC",
      textColor: "#EF4444",
    },
    {
      id: 6,
      name: "PS",
      description: "Foam, Packaging",
      bg: "#F3F4F6",
      textColor: "#6B7280",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <Typography fontSize={28} fontWeight={400}>
        Accepted Plastic Types
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plasticTypes.map((type) => (
          <div
            key={type.id}
            className="rounded-xl p-4"
            style={{ backgroundColor: type.bg }}
          >
            <Typography fontSize={26} fontWeight={400}>
              {type.name} (#{type.id})
            </Typography>

            <Typography
              sx={{ color: type.textColor }}
              fontSize={24}
              fontWeight={300}
            >
              {type.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accepted_Plastics;
