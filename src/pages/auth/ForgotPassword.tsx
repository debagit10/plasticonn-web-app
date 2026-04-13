import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useToast } from "../../utils/useToast";
import Toast from "../../utils/Toast";
import { useState } from "react";
import api from "../../utils/axiosInstance";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);

  const { toast, showToast, closeToast } = useToast();

  const [passwordReset, setPasswordReset] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPasswordReset((prev) => ({ ...prev, [name]: value }));
  };

  const initiate = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/auth/forget-password", {
        email: passwordReset.email,
      });

      setLoading(false);

      if (response.data.status === 200) {
        setStep1(true);

        showToast("OTP sent to email provided", "success");
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

  const verify = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/auth/confirm-password-reset", {
        email: passwordReset.email,
        otp_code: passwordReset.otp,
      });

      setLoading(false);

      console.log(response.data);

      setStep2(true);
      setStep1(false);

      showToast("OTP verified", "success");
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);

      showToast(errMsg, "error");

      if (errMsg) {
        setLoading(false);
      }
    }
  };

  const reset = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/auth/reset-password", {
        email: passwordReset.email,
        otp_code: passwordReset.otp,
        password: passwordReset.password,
      });

      if (response.data.status === 200) {
        setLoading(false);

        showToast("Password reset successfully", "success", "/");
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
    <div className="flex justify-center bg-[#FAFAFA] pt-10 pb-15 min-h-screen px-4 sm:px-6">
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />

      <div className="flex flex-col gap-5 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Logo + Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center gap-2">
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
              Reset Your Password
            </Typography>
            <Typography
              color="#1A1A1A99"
              fontSize={{ xs: 13, sm: 15, md: 18 }}
              fontWeight={400}
              className="text-center"
            >
              Enter your email address and follow the steps
            </Typography>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#FAFAFA] rounded-[18px] border border-[#1A1A1A80] p-5 sm:p-6 flex flex-col gap-5 w-full">
          {/* Card Header */}
          <div className="flex flex-col items-center gap-3">
            <Typography
              color="#1A1A1A"
              fontSize={{ xs: 20, sm: 22, md: 24 }}
              fontWeight={400}
            >
              Forgot Password
            </Typography>
            <Typography
              color="#1A1A1A99"
              fontSize={{ xs: 14, sm: 16, md: 18 }}
              fontWeight={400}
              className="text-center"
            >
              We'll help you get back into your account securely
            </Typography>
          </div>

          {/* Email */}
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
              value={passwordReset.email}
              onChange={handleChange}
              placeholder="Enter your email associated to your plasticonn account"
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
                "& input": { padding: "10px 12px", fontSize: 14 },
              }}
            />
          </div>

          {/* OTP */}
          {step1 && (
            <div>
              <Typography
                fontWeight={400}
                fontSize={{ xs: 15, sm: 16, md: 18 }}
                color="#1A1A1A"
              >
                OTP
              </Typography>
              <TextField
                type="text"
                name="otp"
                value={passwordReset.otp}
                onChange={handleChange}
                placeholder="Enter the OTP sent to your mail"
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
                  "& input": { padding: "10px 12px", fontSize: 14 },
                }}
              />
            </div>
          )}

          {/* New Password */}
          {step2 && (
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
                value={passwordReset.password}
                onChange={handleChange}
                placeholder="Enter your new password"
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
                  "& input": { padding: "10px 12px", fontSize: 14 },
                }}
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
          )}

          {/* Remember password link */}
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => navigate("/", { replace: true })}
          >
            <Typography
              fontWeight={400}
              fontSize={{ xs: 14, sm: 15, md: 16 }}
              color="#00C281"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              I have remembered my password
            </Typography>
          </div>

          {/* Submit */}
          <Button
            disabled={loading}
            fullWidth
            onClick={step1 ? verify : step2 ? reset : initiate}
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
              {step1 ? "Verify OTP" : step2 ? "Reset Password" : "Send OTP"}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
