import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Change_Password from "./Change_Password";
import { useToast } from "../../../utils/useToast";
import api from "../../../utils/axiosInstance";
import { useAuthStore } from "../../../utils/useAuth";
import Toast from "../../../utils/Toast";

const Edit_profile = () => {
  const { user, setUser } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast, closeToast, showToast } = useToast();

  const initialValues = useMemo(
    () => ({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      address: user?.address ?? "",
    }),
    [user],
  );

  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [user]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const changedFields = useMemo(() => {
    return Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (value !== initialValues[key as keyof typeof initialValues]) {
          acc[key as keyof typeof initialValues] = value;
        }
        return acc;
      },
      {} as Partial<typeof formData>,
    );
  }, [formData, initialValues]);

  const hasChanges = Object.keys(changedFields).length > 0;

  const fields = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email address", key: "email" },
    { label: "Address", key: "address" },
  ];

  const textFieldSx = {
    width: "500px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      borderRadius: "12px",
      backgroundColor: "#FAFAFA",
      "& fieldset": { borderColor: "#1A1A1A", borderWidth: "0.2px" },
      "&.Mui-focused fieldset": {
        borderColor: "#1A1A1A",
        borderWidth: "0.2px",
      },
    },
    "& input": { padding: "10px 12px", fontSize: 14 },
  };

  const update = async () => {
    setLoading(true);
    if (!hasChanges) {
      showToast("Nothing to update", "info");

      setLoading(false);

      return;
    }

    try {
      const response = await api.put("api/collector/profile", changedFields);

      setLoading(false);

      showToast("Profile updated", "success");

      setUser(response.data.data.collector);
      setTimeout(() => {
        setOpen(false);
      }, 2000);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.data.collector._id,
          role: response.data.data.collector.role,
        }),
      );
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
      <div className="flex gap-9">
        <Change_Password />

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
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={closeToast}
        />

        <DialogTitle className="flex  justify-between gap-10">
          <div className="flex flex-col gap-2">
            <Typography fontSize={26} fontWeight={400} color="#1A1A1A">
              Edit profile details
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
          <div className="flex flex-col gap-3">
            {fields.map(({ label, key }) => (
              <div key={key} className="flex gap-2.5">
                <div>
                  <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
                    {label}
                  </Typography>
                  <TextField
                    value={formData[key as keyof typeof formData]}
                    onChange={handleChange(key)}
                    variant="outlined"
                    size="small"
                    sx={textFieldSx}
                  />
                </div>
              </div>
            ))}
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
              onClick={update}
              sx={{
                width: "365px",
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
                Update
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit_profile;
