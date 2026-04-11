import { Divider, Typography } from "@mui/material";

const Achievements = () => {
  return (
    <div
      className="
        w-full
        min-h-37.5 sm:min-h-45 lg:min-h-55
        bg-[#FAFAFA]
        py-4 sm:py-6 lg:py-8
        px-4 sm:px-5 lg:px-6
        rounded-xl
        shadow-[0_2px_6px_#1A1A1A26]
      "
    >
      <Typography
        fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
        fontWeight={400}
        color="#052E1E"
      >
        Achievements
      </Typography>

      <Divider sx={{ marginY: "0.75rem" }} />

      <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} color="#1A1A1A80">
        COMING SOON!!
      </Typography>
    </div>
  );
};

export default Achievements;
