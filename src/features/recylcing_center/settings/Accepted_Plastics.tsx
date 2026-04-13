import { Typography } from "@mui/material";
import { useAuthStore } from "../../../utils/useAuth";

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

  const { user } = useAuthStore();

  return (
    <div className="bg-[#FAFAFA] rounded-[18px] shadow-[0_2px_6px_#1A1A1A26] flex flex-col p-5 sm:p-7 lg:p-9">
      <Typography
        className="text-xl sm:text-2xl lg:text-[28px]"
        color="#1A1A1A"
      >
        Accepted Plastic Types
      </Typography>

      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
        {user?.materialsAccepted?.map((typeName, index) => {
          const type = plasticTypes.find((item) => item.name === typeName);

          if (!type) return null;

          return (
            <div
              key={index}
              className="rounded-xl px-3 py-2 sm:px-4 sm:py-3"
              style={{ backgroundColor: type.bg }}
            >
              <Typography
                fontSize={26}
                fontWeight={400}
                className="text-sm sm:text-base"
              >
                {type.name} (#{index + 1})
              </Typography>

              <Typography
                sx={{ color: type.textColor }}
                fontSize={24}
                fontWeight={300}
              >
                {type.description}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accepted_Plastics;
