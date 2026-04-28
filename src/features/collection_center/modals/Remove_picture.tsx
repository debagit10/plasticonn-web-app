import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import api from "../../../utils/axiosInstance";
import Toast from "../../../utils/Toast";
import { useToast } from "../../../utils/useToast";
import { HiOutlineTrash } from "react-icons/hi";
import { useAuthStore } from "../../../utils/useAuth";

const Remove_picture = () => {
  const { setUser } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast, closeToast, showToast } = useToast();

  const deleteAcc = async () => {
    setLoading(true);

    try {
      const response = await api.delete("api/center/picture");

      showToast("Picture removed", "success");

      setUser(response.data.data);

      setTimeout(() => {
        setOpen(false);
        setLoading(false);
      }, 2000);
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
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg bg-[#C6191910] hover:bg-[#C6191920] text-[#C61919] transition"
      >
        <HiOutlineTrash size={16} />
      </button>

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            paddingY: "20px",
            paddingX: "16px",
            borderRadius: "18px",
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
              Remove picture
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
            <Typography fontSize={16} fontWeight={300}>
              Are you sure you want to remove your center picture?
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
                {loading ? "Removing..." : " Remove"}
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Remove_picture;
