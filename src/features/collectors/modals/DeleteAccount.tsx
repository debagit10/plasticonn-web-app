import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useToast } from "../../../utils/useToast";
import api from "../../../utils/axiosInstance";
import Toast from "../../../utils/Toast";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast, closeToast, showToast } = useToast();

  const deleteAcc = async () => {
    setLoading(true);

    try {
      await api.delete("api/collector/delete");

      showToast("Account deleted", "success", "/");
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);
      showToast(errMsg, "error");

      if (errMsg) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        fullWidth
        sx={{
          width: "100%",
          borderColor: "red",
          borderWidth: "1px",
          color: "red",
          textTransform: "capitalize",
          borderRadius: "12px",
          padding: "8px",
        }}
      >
        <Typography fontSize={16} fontWeight={300}>
          Delete Account
        </Typography>
      </Button>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            padding: { xs: "8px", sm: "20px", md: "24px" },
            borderRadius: "16px",
          },
        }}
      >
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={closeToast}
        />
        <DialogTitle className="flex  justify-between gap-10">
          <div className="flex flex-col gap-2">
            <Typography fontSize={26} fontWeight={400} color="#1A1A1A">
              Delete Account
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
          <div>
            <Typography fontSize={{ xs: 14, sm: 16 }}>
              Are you sure you want to delete your account? This action is
              irreversible.
            </Typography>
          </div>

          <div className="flex gap-3 lg:gap-1 mt-8">
            {" "}
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
              onClick={deleteAcc}
              sx={{
                width: "365px",
                height: "48px",
                padding: "12px",
                borderRadius: "12px",
                borderColor: loading ? "grey" : "",
                backgroundColor: loading ? "white" : "red",
                color: loading ? "grey" : "white",
              }}
            >
              <Typography
                fontWeight={400}
                fontSize={16}
                sx={{ textTransform: "capitalize" }}
              >
                {loading ? "Deleting..." : " Delete"}
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
