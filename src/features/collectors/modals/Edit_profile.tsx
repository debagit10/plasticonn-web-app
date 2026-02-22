import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Edit_profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-9">
        <Button
          //onClick={() => setOpen(true)}
          variant="outlined"
          fullWidth
          sx={{
            height: "48px",
            padding: "12px",
            borderRadius: "12px",
            borderColor: "#1A1A1A80",
            color: "#1A1A1A",
            textTransform: "capitalize",
          }}
        >
          <Typography fontSize={16} fontWeight={300}>
            Back to Dashboard
          </Typography>
        </Button>

        <Button
          onClick={() => setOpen(true)}
          fullWidth
          sx={{
            background: "linear-gradient(to top right, #00C281, #005C3D)",
            color: "white",
            textTransform: "capitalize",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
            Edit details
          </Typography>
        </Button>
      </div>

      <Dialog
        open={open}
        PaperProps={{
          sx: {
            paddingY: "24px",
            paddingX: "18px",
            borderRadius: "18px",
            width: "800px",
          },
        }}
      >
        <DialogTitle className="flex  justify-between gap-10">
          <div className="flex flex-col gap-2">
            <Typography fontSize={26} fontWeight={400} color="#1A1A1A">
              New Drop-off
            </Typography>
            <Typography fontSize={20} fontWeight={300} color="#1A1A1A">
              Fill in the details for your plastic collection drop-off
            </Typography>
          </div>

          <div
            onClick={() => setOpen(false)}
            className="cursor-pointer w-6.5 h-6.5"
          >
            <IoCloseOutline
              // size={14}
              width={14}
              height={14}
              color="#1A1A1A"
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-2.5">
            <div>
              <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
                Center Name
              </Typography>
              <TextField
                //   value={search}
                //   onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g Green valley collection center"
                variant="outlined"
                size="small"
                sx={{
                  width: "500px",
                  // overall height
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: "#FAFAFA",

                    // default border
                    "& fieldset": {
                      borderColor: "#1A1A1A",
                      borderWidth: "0.2px",
                    },

                    // focused
                    "&.Mui-focused fieldset": {
                      borderColor: "#1A1A1A",
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

          <div className="flex gap-4 mt-12">
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{
                width: "365px",
                height: "48px",
                padding: "12px",
                borderRadius: "12px",
                borderColor: "#1A1A1A80",
                color: "#1A1A1A",
              }}
            >
              <Typography
                fontWeight={400}
                fontSize={16}
                sx={{ textTransform: "capitalize" }}
              >
                Cancel
              </Typography>
            </Button>

            <Button
              sx={{
                width: "365px",
                height: "48px",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: "#00C281",
                color: "white",
              }}
            >
              <Typography
                fontWeight={400}
                fontSize={16}
                sx={{ textTransform: "capitalize" }}
              >
                Submit Drop Off
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit_profile;
