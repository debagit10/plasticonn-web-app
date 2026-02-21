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
import { IoNavigateOutline } from "react-icons/io5";

const DropOff = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<IoNavigateOutline />}
          sx={{
            width: "200px",
            backgroundColor: "#00C281",
            color: "white",
            textTransform: "capitalize",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
            Navigate
          </Typography>
        </Button>

        <Dialog
          open={open}
          PaperProps={{
            sx: {
              paddingY: "24px",
              paddingX: "18px",
              borderRadius: "18px",
              width: "550px",
            },
          }}
        >
          <DialogTitle className="flex items-center justify-between">
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
                    width: "265px",
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DropOff;
