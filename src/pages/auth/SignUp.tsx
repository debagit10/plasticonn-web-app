import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useToast } from "../../utils/useToast";
import Toast from "../../utils/Toast";
import { useState } from "react";
import api from "../../utils/axiosInstance";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useAuthStore } from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";
import getCoordinates from "../../utils/getCoordinates";
import { AxiosError } from "axios";

interface SignUpDetails {
  firstName: string;
  lastName: string;
  name?: string | null;
  email?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactPerson?: string | null;
  operatingHours?: string | null;
  materialsAccepted?: string[] | null;
  password: string;
  address: string;
  phone: string;
  role: string;
  centerType?: string | null;
}

const TOTAL_STEPS = 3;

const StepIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => (
  <div className="flex items-center justify-center gap-2 mb-4">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div
        key={i}
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: i + 1 === currentStep ? "2rem" : "0.5rem",
          backgroundColor: i + 1 <= currentStep ? "#00C281" : "#D1D5DB",
        }}
      />
    ))}
  </div>
);

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const { toast, closeToast, showToast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);

  const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>({
    email: null,
    firstName: "",
    lastName: "",
    contactEmail: null,
    contactPhone: null,
    contactPerson: null,
    operatingHours: null,
    materialsAccepted: [],
    password: "",
    address: "",
    phone: "",
    role: "",
    centerType: null,
  });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignUpDetails,
  ) => {
    const { value, checked } = e.target;
    setSignUpDetails((prev) => {
      if (!Array.isArray(prev[field])) return prev;
      const updatedArray = checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value);
      return { ...prev, [field]: updatedArray };
    });
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      height: "40px",
      borderRadius: "12px",
      backgroundColor: "#00C2810D",
      "& fieldset": { borderColor: "#00C2810D" },
      "&.Mui-focused fieldset": { borderColor: "#00C2810D" },
    },
    "& input": { padding: "10px 12px", fontSize: 14 },
  };

  const plasticsOptions = ["PP", "PVC", "PTDE"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  // ── Step validation ────────────────────────────────────────────────────────

  const isStep1Valid = () => {
    if (!signUpDetails.role) return false;
    if (signUpDetails.role === "center" && !signUpDetails.centerType)
      return false;
    return true;
  };

  const isStep2Valid = () => {
    if (signUpDetails.role === "collector") {
      return (
        signUpDetails.firstName.trim() !== "" &&
        signUpDetails.lastName.trim() !== "" &&
        (signUpDetails.email?.trim() ?? "") !== "" &&
        signUpDetails.address.trim() !== "" &&
        signUpDetails.phone.trim() !== ""
      );
    }
    if (signUpDetails.role === "center") {
      return (
        (signUpDetails.name?.trim() ?? "") !== "" &&
        (signUpDetails.contactPerson?.trim() ?? "") !== "" &&
        (signUpDetails.contactEmail?.trim() ?? "") !== "" &&
        (signUpDetails.contactPhone?.trim() ?? "") !== "" &&
        signUpDetails.address.trim() !== "" &&
        (signUpDetails.materialsAccepted?.length ?? 0) > 0 &&
        (signUpDetails.operatingHours?.trim() ?? "") !== ""
      );
    }
    return false;
  };

  const isStep3Valid = () => signUpDetails.password.trim() !== "";

  const canAdvance = () => {
    if (step === 1) return isStep1Valid();
    if (step === 2) return isStep2Valid();
    if (step === 3) return isStep3Valid();
    return false;
  };

  const handleNext = () => {
    if (!canAdvance()) {
      showToast("Please complete all required fields", "warning");
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  // ── Submit ─────────────────────────────────────────────────────────────────

  const { setUser } = useAuthStore.getState();

  const signup = async () => {
    if (!isStep3Valid()) {
      showToast("Please input all fields", "warning");
      return;
    }

    let lat = 0;
    let lng = 0;
    setLoading(true);

    if (signUpDetails.role === "center") {
      const coords = await getCoordinates(signUpDetails.address);
      if ("error" in coords) {
        showToast("Address not found", "error");
        setLoading(false);
        return;
      }
      lat = coords.lat;
      lng = coords.lng;
    }

    try {
      const formData = new FormData();

      Object.entries(signUpDetails).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      formData.append("lat", String(lat));

      formData.append("lng", String(lng));

      if (image) formData.append("image", image);

      documents.forEach((file) => formData.append("documents", file));

      console.log(signUpDetails);

      const response = await api.post(
        `/api/${signUpDetails.role === "collector" ? "collector" : "center"}/register`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setLoading(false);

      showToast("Sign in successful", "success", "/dashboard");

      if (signUpDetails.role === "collector") setUser(response.data.data.user);

      if (signUpDetails.role === "center") setUser(response.data.data.center);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id:
            signUpDetails.role === "collector"
              ? response.data.data.user._id
              : response.data.data.center._id,
          role: signUpDetails.role === "collector" ? "collector" : "center",
        }),
      );
    } catch (error: unknown) {
      let errMsg = "Something went wrong";
      if (error instanceof AxiosError)
        errMsg = error.response?.data?.message || errMsg;
      else if (error instanceof Error) errMsg = error.message;

      showToast(errMsg, "error");

      setLoading(false);
    }
  };

  // ── Step labels ────────────────────────────────────────────────────────────

  const stepTitles = ["Choose your role", "Your details", "Set password"];

  const stepSubtitles = [
    "Tell us how you'll use Plasticonn",
    signUpDetails.role === "center"
      ? "Provide your center information"
      : "Provide your personal information",
    "Secure your account",
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex justify-center bg-[#FAFAFA] pt-10 pb-15 min-h-screen px-4 sm:px-6">
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />

      <div className="flex flex-col gap-5 w-full max-w-sm sm:max-w-md lg:max-w-2xl">
        {/* Logo + Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-center gap-2 items-center">
            <img
              src="/logo.png"
              alt="Plasticonn logo"
              className="w-10 h-10 sm:w-14 sm:h-14"
            />
            <Typography
              color="#005C3D"
              fontSize={{ xs: 26, sm: 32, md: 36 }}
              fontWeight={400}
            >
              Plasticonn
            </Typography>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Typography
              color="#1A1A1A"
              fontSize={{ xs: 18, sm: 22, md: 24 }}
              fontWeight={400}
            >
              Create Account
            </Typography>
            <Typography
              color="#1A1A1A99"
              fontSize={{ xs: 14, sm: 16, md: 18 }}
              fontWeight={400}
            >
              Join the sustainability revolution
            </Typography>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#FAFAFA] rounded-[18px] border border-[#1A1A1A80] p-5 sm:p-6 flex flex-col gap-5 w-full">
          {/* Step indicator */}
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

          {/* Step header */}
          <div className="flex flex-col items-center gap-1">
            <Typography
              color="#1A1A1A"
              fontSize={{ xs: 18, sm: 20, md: 22 }}
              fontWeight={400}
            >
              {stepTitles[step - 1]}
            </Typography>
            <Typography
              color="#1A1A1A99"
              fontSize={{ xs: 13, sm: 14, md: 16 }}
              fontWeight={400}
              className="text-center"
            >
              {stepSubtitles[step - 1]}
            </Typography>
          </div>

          {/* ── Step 1: Role selection ───────────────────────────── */}
          {step === 1 && (
            <>
              <div>
                <Typography
                  fontWeight={400}
                  fontSize={{ xs: 15, sm: 16, md: 18 }}
                  color="#1A1A1A"
                >
                  Role
                </Typography>
                <TextField
                  select
                  name="role"
                  value={signUpDetails.role}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor: "#00C2810D",
                      "& fieldset": { borderColor: "#00C2810D" },
                      "&.Mui-focused fieldset": { borderColor: "#00C2810D" },
                    },
                    "& .MuiSelect-select": {
                      padding: "10px 12px",
                      fontSize: 14,
                    },
                  }}
                >
                  <MenuItem value="collector">Collector</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                </TextField>
              </div>

              {signUpDetails.role === "center" && (
                <div>
                  <Typography
                    fontWeight={400}
                    fontSize={{ xs: 15, sm: 16, md: 18 }}
                    color="#1A1A1A"
                  >
                    Center Type
                  </Typography>
                  <TextField
                    select
                    name="centerType"
                    value={signUpDetails.centerType}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        borderRadius: "12px",
                        backgroundColor: "#00C2810D",
                        "& fieldset": { borderColor: "#00C2810D" },
                        "&.Mui-focused fieldset": { borderColor: "#00C2810D" },
                      },
                      "& .MuiSelect-select": {
                        padding: "10px 12px",
                        fontSize: 14,
                      },
                    }}
                  >
                    <MenuItem value="collection">Collection</MenuItem>
                    <MenuItem value="recycling">Recycling</MenuItem>
                  </TextField>
                </div>
              )}
            </>
          )}

          {/* ── Step 2: Details ──────────────────────────────────── */}
          {step === 2 && (
            <>
              {/* Collector fields */}
              {signUpDetails.role === "collector" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Typography
                        fontWeight={400}
                        fontSize={{ xs: 15, sm: 16, md: 18 }}
                        color="#1A1A1A"
                      >
                        First Name
                      </Typography>
                      <TextField
                        name="firstName"
                        value={signUpDetails.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={textFieldStyle}
                      />
                    </div>
                    <div>
                      <Typography
                        fontWeight={400}
                        fontSize={{ xs: 15, sm: 16, md: 18 }}
                        color="#1A1A1A"
                      >
                        Last Name
                      </Typography>
                      <TextField
                        name="lastName"
                        value={signUpDetails.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={textFieldStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Email
                    </Typography>
                    <TextField
                      name="email"
                      value={signUpDetails.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Address
                    </Typography>
                    <TextField
                      name="address"
                      value={signUpDetails.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      name="phone"
                      value={signUpDetails.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>
                </>
              )}

              {/* Center fields */}
              {signUpDetails.role === "center" && (
                <>
                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Center Name
                    </Typography>
                    <TextField
                      name="name"
                      value={signUpDetails.name}
                      onChange={handleChange}
                      placeholder="Enter center name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Contact Person
                    </Typography>
                    <TextField
                      name="contactPerson"
                      value={signUpDetails.contactPerson}
                      onChange={handleChange}
                      placeholder="Enter contact name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Typography
                        fontWeight={400}
                        fontSize={{ xs: 15, sm: 16, md: 18 }}
                        color="#1A1A1A"
                      >
                        Contact Email
                      </Typography>
                      <TextField
                        name="contactEmail"
                        value={signUpDetails.contactEmail}
                        onChange={handleChange}
                        placeholder="Enter contact email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={textFieldStyle}
                      />
                    </div>
                    <div>
                      <Typography
                        fontWeight={400}
                        fontSize={{ xs: 15, sm: 16, md: 18 }}
                        color="#1A1A1A"
                      >
                        Contact Phone
                      </Typography>
                      <TextField
                        name="contactPhone"
                        value={signUpDetails.contactPhone}
                        onChange={handleChange}
                        placeholder="Enter contact phone"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={textFieldStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Address
                    </Typography>
                    <TextField
                      name="address"
                      value={signUpDetails.address}
                      onChange={handleChange}
                      placeholder="e.g 12 Adeola Odeku Street, Victoria Island, Lagos, Nigeria"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Accepted Plastics
                    </Typography>
                    <FormGroup row>
                      {plasticsOptions.map((plastic) => (
                        <FormControlLabel
                          key={plastic}
                          control={
                            <Checkbox
                              checked={signUpDetails.materialsAccepted?.includes(
                                plastic,
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, "materialsAccepted")
                              }
                              value={plastic}
                            />
                          }
                          label={plastic}
                        />
                      ))}
                    </FormGroup>
                  </div>

                  <div>
                    <Typography
                      fontWeight={400}
                      fontSize={{ xs: 15, sm: 16, md: 18 }}
                      color="#1A1A1A"
                    >
                      Operating Hours
                    </Typography>
                    <TextField
                      name="operatingHours"
                      value={signUpDetails.operatingHours}
                      onChange={handleChange}
                      placeholder="e.g., 9 AM - 6 PM"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={textFieldStyle}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {/* ── Step 3: Password + uploads ───────────────────────── */}
          {step === 3 && (
            <>
              {/* Profile picture */}
              <div>
                <Typography
                  fontWeight={400}
                  fontSize={{ xs: 15, sm: 16, md: 18 }}
                  color="#1A1A1A"
                >
                  {signUpDetails.role === "collector"
                    ? "Profile Picture"
                    : "Center Picture"}
                </Typography>

                {image && (
                  <div className="flex justify-center my-3">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-36 h-36 object-cover mt-2 rounded-full"
                    />
                  </div>
                )}

                <input
                  className="h-10 w-full rounded-xl bg-[#00C2810D] px-2.5 py-3 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0])
                      setImage(e.target.files[0]);
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <Typography
                  fontWeight={400}
                  fontSize={{ xs: 15, sm: 16, md: 18 }}
                  color="#1A1A1A"
                >
                  Password
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signUpDetails.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VscEye
                            size={20}
                            className="text-[#A0AAB2] cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <VscEyeClosed
                            size={20}
                            className="text-[#A0AAB2] cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Documents (center only) */}
              {signUpDetails.role === "center" && (
                <div>
                  <Typography
                    fontWeight={400}
                    fontSize={{ xs: 15, sm: 16, md: 18 }}
                    color="#1A1A1A"
                  >
                    Documents
                  </Typography>

                  <input
                    className="h-10 w-full rounded-xl bg-[#00C2810D] px-2.5 py-3 cursor-pointer"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files)
                        setDocuments((prev) => [
                          ...prev,
                          ...Array.from(e.target.files || []),
                        ]);
                    }}
                  />

                  {documents.length > 0 && (
                    <div className="mt-4 flex flex-col gap-3">
                      <Typography
                        fontSize={16}
                        fontWeight={400}
                        color="#1A1A1A"
                      >
                        Selected Documents
                      </Typography>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {documents.map((file, index) => (
                          <div
                            key={index}
                            className="relative rounded-xl border border-[#1A1A1A20] p-2 flex flex-col items-center gap-2"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Typography
                              fontSize={12}
                              className="truncate w-full text-center"
                            >
                              {file.name}
                            </Typography>
                            <button
                              onClick={() =>
                                setDocuments((prev) =>
                                  prev.filter((_, i) => i !== index),
                                )
                              }
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Login link */}
          <div>
            <Typography fontWeight={300} fontSize={{ xs: 14, sm: 15, md: 16 }}>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-[#00C281]"
                style={{ textDecoration: "underline" }}
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </Typography>
          </div>

          {/* Navigation buttons */}
          <div className={`flex gap-3 ${step > 1 ? "flex-row" : "flex-col"}`}>
            {step > 1 && (
              <Button
                fullWidth
                onClick={handleBack}
                sx={{
                  height: "48px",
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "transparent",
                  border: "1px solid #00C281",
                  color: "#00C281",
                }}
              >
                <Typography
                  fontWeight={400}
                  fontSize={16}
                  sx={{ textTransform: "capitalize" }}
                >
                  Back
                </Typography>
              </Button>
            )}

            {step < TOTAL_STEPS ? (
              <Button
                fullWidth
                onClick={handleNext}
                sx={{
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
                  Continue
                </Typography>
              </Button>
            ) : (
              <Button
                disabled={loading}
                fullWidth
                onClick={signup}
                sx={{
                  height: "48px",
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: loading ? "white" : "#00C281",
                  color: loading ? "grey" : "white",
                }}
              >
                <Typography
                  fontWeight={400}
                  fontSize={16}
                  sx={{ textTransform: "capitalize" }}
                >
                  {loading ? "Creating Account..." : "Sign up"}
                </Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
