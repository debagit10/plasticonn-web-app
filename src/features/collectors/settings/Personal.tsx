import { TextField, Typography } from "@mui/material";
import { useAuth } from "../../../utils/useAuth";

const Personal = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={400} fontSize={28} color="#1A1A1A">
          Personal Information
        </Typography>
        <Typography fontWeight={300} fontSize={24} color="#1A1A1A80">
          Update your personal details
        </Typography>
      </div>

      <div className="flex gap-9">
        <div>
          <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
            First Name
          </Typography>
          <TextField
            value={user?.firstName}
            variant="outlined"
            size="small"
            sx={{
              width: "670px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
                borderRadius: "12px",
                color: "#1A1A1A",
                backgroundColor: "#1A1A1A0D",

                // focused
                "&.Mui-focused fieldset": {
                  borderColor: "#1A1A1A0D",
                  borderWidth: "0.2px",
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
        <div>
          <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
            Last Name
          </Typography>
          <TextField
            value={user?.lastName}
            variant="outlined"
            size="small"
            sx={{
              width: "670px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
                borderRadius: "12px",
                color: "#1A1A1A",
                backgroundColor: "#1A1A1A0D",

                // focused
                "&.Mui-focused fieldset": {
                  borderColor: "#1A1A1A0D",
                  borderWidth: "0.2px",
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

      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Email Address
        </Typography>
        <TextField
          value={user?.email}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "12px",
              color: "#1A1A1A",
              backgroundColor: "#1A1A1A0D",

              // focused
              "&.Mui-focused fieldset": {
                borderColor: "#1A1A1A0D",
                borderWidth: "0.2px",
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
      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Phone Number
        </Typography>
        <TextField
          value={user?.phone}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "12px",
              color: "#1A1A1A",
              backgroundColor: "#1A1A1A0D",

              // focused
              "&.Mui-focused fieldset": {
                borderColor: "#1A1A1A0D",
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
      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Address
        </Typography>
        <TextField
          value={user?.address}
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "12px",
              color: "#1A1A1A",
              backgroundColor: "#1A1A1A0D",

              // focused
              "&.Mui-focused fieldset": {
                borderColor: "#1A1A1A0D",
                borderWidth: "0.2px",
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

export default Personal;
