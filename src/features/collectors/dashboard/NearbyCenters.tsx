import { Divider, TextField, Typography } from "@mui/material";
import Navigate from "../modals/Navigate";

const CentersMap = () => {
  return (
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-17 w-262.5">
      <div className="flex justify-between">
        <Typography fontSize={28} fontWeight={400} color="#052E1E">
          Nearby Collection Centers
        </Typography>

        <Navigate />
      </div>

      <Divider />

      <div>
        <TextField
          name="email"
          //   value={signindetails.email}
          //   onChange={handleChange}
          placeholder="Enter your email"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            // overall height
            "& .MuiOutlinedInput-root": {
              height: "60px",
              borderRadius: "16px",
              backgroundColor: "#7373731A",

              // default border
              "& fieldset": {
                borderColor: "#1A1A1A",
              },

              // focused
              "&.Mui-focused fieldset": {
                borderColor: "#1A1A1A",
              },
            },

            // input text
            "& input": {
              padding: "10px 12px",
              fontSize: 14,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CentersMap;
