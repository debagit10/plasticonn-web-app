import { Avatar, TextField, Typography } from "@mui/material";
import { useAuth } from "../../../utils/useAuth";
import Change_picture from "../modals/Change_picture";
import Remove_picture from "../modals/Remove_picture";
import { getInitials } from "../../../utils/getInitials";

const Personal = () => {
  const { user } = useAuth();

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      height: "42px",
      borderRadius: "12px",
      backgroundColor: "#1A1A1A0D",

      "& fieldset": {
        borderColor: "transparent",
      },

      "&:hover fieldset": {
        borderColor: "#1A1A1A20",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#00C281",
        borderWidth: "1px",
      },
    },

    "& input": {
      padding: "10px 12px",
      fontSize: 14,
    },
  };

  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-5 sm:p-7 lg:p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-6 sm:gap-7">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* AVATAR + ACTIONS */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
          <Avatar
            src={user?.image?.url || undefined}
            sx={{
              width: { xs: 100, sm: 120, md: 140, lg: 150 },
              height: { xs: 100, sm: 120, md: 140, lg: 150 },
              background: "linear-gradient(to bottom, #005C3D, #00C281)",
              fontSize: "32px",
            }}
          >
            {!user?.image?.url &&
              getInitials(`${user?.firstName} ${user?.lastName}`)}
          </Avatar>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-center">
            <div className="flex-1 max-w-35">
              <Change_picture />
            </div>

            <div className="flex-1 max-w-35">
              <Remove_picture />
            </div>
          </div>
        </div>

        {/* NAME FIELDS */}
        <div className="flex flex-col gap-4 w-full">
          <div>
            <Typography className="text-sm sm:text-base" color="#1A1A1A">
              First Name
            </Typography>
            <TextField
              value={user?.firstName}
              size="small"
              fullWidth
              sx={inputStyle}
            />
          </div>

          <div>
            <Typography className="text-sm sm:text-base" color="#1A1A1A">
              Last Name
            </Typography>
            <TextField
              value={user?.lastName}
              size="small"
              fullWidth
              sx={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* OTHER FIELDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Typography className="text-sm sm:text-base" color="#1A1A1A">
            Email Address
          </Typography>
          <TextField
            value={user?.email}
            size="small"
            fullWidth
            sx={inputStyle}
          />
        </div>

        <div>
          <Typography className="text-sm sm:text-base" color="#1A1A1A">
            Phone Number
          </Typography>
          <TextField
            value={user?.phone}
            size="small"
            fullWidth
            sx={inputStyle}
          />
        </div>

        <div>
          <Typography className="text-sm sm:text-base" color="#1A1A1A">
            Address
          </Typography>
          <TextField
            value={user?.address}
            size="small"
            fullWidth
            sx={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Personal;
