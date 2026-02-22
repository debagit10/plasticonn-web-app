import { Divider, Typography } from "@mui/material";

const Accepted_Plastics = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col">
      <Typography fontWeight={400} fontSize={28} color="#1A1A1A">
        Accepted Plastic Types
      </Typography>

      <Divider sx={{ mt: "1rem", mb: "3rem" }} />

      <div className="flex gap-9">
        {["PET", "HDPE", "PVC", "LDPE", "PP", "PS"].map((item, index) => (
          <div className="rounded-xl py-3 px-4.5 items-center justify-center bg-[#1A1A1A0D]">
            <Typography>{`${item} (#${index + 1})`}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accepted_Plastics;
