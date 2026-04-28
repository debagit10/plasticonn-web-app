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
import { HiOutlinePencil } from "react-icons/hi";
import { useAuthStore } from "../../../utils/useAuth";

const Change_picture = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const { toast, closeToast, showToast } = useToast();

  const { setUser } = useAuthStore();

  const update = async () => {
    setLoading(true);

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.patch("api/center/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("Picture updated", "success");

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
        className="p-2 rounded-lg bg-[#1A1A1A0D] hover:bg-[#1A1A1A1A] transition"
      >
        <HiOutlinePencil size={16} />
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
              Update Center Picture
            </Typography>
          </div>

          <div
            onClick={() => {
              setOpen(false);
              setImage(null);
              setLoading(false);
            }}
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
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-24 h-24 object-cover mt-2 rounded-lg"
              />
            )}

            <input
              className="h-10 w-full rounded-xl bg-[#00C2810D] px-2.5 py-3 cursor-pointer mt-3"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="flex gap-3 lg:gap-1 mt-8">
            {" "}
            <Button
              onClick={() => {
                setOpen(false);
                setImage(null);
                setLoading(false);
              }}
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
              fullWidth
              onClick={update}
              sx={{
                height: "48px",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: loading ? "white" : "#00C281",
                borderColor: loading ? "grey" : "",
                color: loading ? "grey" : "white",
              }}
            >
              <Typography
                fontWeight={400}
                fontSize={16}
                sx={{ textTransform: "capitalize" }}
              >
                {loading ? "Updating..." : "Update"}
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Change_picture;
