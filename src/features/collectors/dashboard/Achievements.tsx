import { Divider, Typography } from "@mui/material";

const Achievements = () => {
  return (
    <div className="w-125 h-100 bg-[#FAFAFA] py-9 px-6.5 shadow-[0_2px_6px_#1A1A1A26] rounded-xl">
      <Typography fontSize={28} fontWeight={400} color="#052E1E">
        Achievements
      </Typography>

      <Divider sx={{ marginY: "1rem" }} />

      <Typography>COMING SOON!!</Typography>
    </div>
  );
};

export default Achievements;
