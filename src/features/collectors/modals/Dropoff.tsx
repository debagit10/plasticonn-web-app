import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useToast } from "../../../utils/useToast";
import api from "../../../utils/axiosInstance";
import Toast from "../../../utils/Toast";
import { useAuth } from "../../../utils/useAuth";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  address: string;
  gps: GPS;
  materialsAccepted: string[];
  contactPhone: string;
}

interface GPS {
  coordinates: number[];
}

interface DropDetails {
  name: string;
  amount: number;
  types: string[];
  condition: string;
}

const fields = [
  { label: "Center Name", name: "name", type: "text" },
  { label: "Amount", name: "amount", type: "number" },
  {
    label: "Types",
    name: "types",
    type: "checkbox",
    options: [
      { label: "PET", value: "PET" },
      { label: "PP", value: "PP" },
    ],
  },
  {
    label: "Condition",
    name: "condition",
    type: "radio",
    options: [
      { label: "Dirty", value: "dirty" },
      { label: "Clean", value: "clean" },
    ],
  },
  { label: "Picture", name: "image", type: "file" },
];

const DropOff = ({ center, width }: { center: Centers; width: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const { coords } = useAuth();

  const [dropDetails, setDropDetails] = useState<DropDetails>({
    amount: 0,
    name: "",
    types: [],
    condition: "",
  });

  const { showToast, toast, closeToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDropDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setLoading(true);

    if (
      dropDetails.amount <= 0 ||
      dropDetails.types.length <= 0 ||
      dropDetails.condition.length <= 0
    ) {
      showToast("Input all field", "warning");

      setLoading(false);

      return;
    }

    const formData = new FormData();

    Object.entries(dropDetails).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    formData.append("center_id", String(center._id));
    formData.append("lng", String(coords?.lng));
    formData.append("lat", String(coords?.lat));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post(`/api/drop/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 201) {
        setLoading(false);

        showToast("Drop off successful", "success");

        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
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
        fullWidth
        onClick={() => setOpen(true)}
        startIcon={<IoMdAdd />}
        sx={{
          width: width,
          backgroundColor: "#00C281",
          color: "white",
          textTransform: "capitalize",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
          Drop-off
        </Typography>
      </Button>

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            paddingY: { xs: "16px", sm: "20px", md: "24px" },
            paddingX: { xs: "12px", sm: "16px", md: "18px" },
            borderRadius: "16px",
            width: "100%",
            maxWidth: "900px",
            margin: "12px",
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
          <div className="flex flex-col gap-2.5">
            {fields.map((field) => (
              <div key={field.name}>
                <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
                  {field.label}
                </Typography>

                {field.type === "text" && (
                  <TextField
                    name={field.name}
                    value={center.name || null}
                    size="small"
                    fullWidth
                    sx={{
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
                )}

                {field.type === "number" && (
                  <TextField
                    name={field.name}
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 100,
                      step: 1,
                    }}
                    // value={dropDetails[field.name as keyof DropDetails] || ""}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    sx={{
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
                )}

                {field.type === "checkbox" &&
                  field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={dropDetails.types.includes(option.value)}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            setDropDetails((prev) => ({
                              ...prev,
                              types: checked
                                ? [...prev.types, option.value]
                                : prev.types.filter((t) => t !== option.value),
                            }));
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}

                {field.type === "checkbox" &&
                  center.materialsAccepted?.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={dropDetails.types.includes(option)}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            setDropDetails((prev) => ({
                              ...prev,
                              types: checked
                                ? [...prev.types, option]
                                : prev.types.filter((t) => t !== option),
                            }));
                          }}
                        />
                      }
                      label={option}
                    />
                  ))}

                {field.type === "radio" && (
                  <RadioGroup
                    name={field.name}
                    value={dropDetails[field.name as keyof DropDetails] || ""}
                    onChange={handleChange}
                  >
                    {field.options?.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}

            <input
              className="h-10 w-full rounded-xl bg-[#00C2810D] px-2.5 py-3 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{
                textTransform: "capitalize",
                borderRadius: "10px",
                borderColor: "#1A1A1A80",
                color: "#1A1A1A",
                padding: "10px",
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              disabled={loading}
              onClick={submit}
              sx={{
                textTransform: "capitalize",
                borderRadius: "10px",
                backgroundColor: loading ? "#A0A0A0" : "#00C281",
                color: "white",
                padding: "10px",
              }}
            >
              {loading ? "Dropping off..." : "Submit Drop Off"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DropOff;
