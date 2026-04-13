import { Divider, Typography } from "@mui/material";
import { useAuthStore } from "../../../utils/useAuth";

const Accepted_Plastics = () => {
  const { user } = useAuthStore();
  return (
    <div className="bg-[#FAFAFA] rounded-[18px] shadow-[0_2px_6px_#1A1A1A26] flex flex-col p-5 sm:p-7 lg:p-9">
      <Typography
        className="text-xl sm:text-2xl lg:text-[28px]"
        color="#1A1A1A"
      >
        Accepted Plastic Types
      </Typography>

      <Divider sx={{ mt: "1rem", mb: "2rem" }} />

      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
        {user?.materialsAccepted?.map((item, index) => (
          <div
            key={index}
            className="rounded-xl px-3 py-2 sm:px-4 sm:py-3 bg-[#1A1A1A0D]"
          >
            <Typography className="text-sm sm:text-base">
              {`${item} (#${index + 1})`}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accepted_Plastics;
