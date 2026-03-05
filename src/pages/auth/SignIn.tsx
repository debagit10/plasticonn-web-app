import {
  Button,
  Checkbox,
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
import logo from "../../assets/logo.png";

interface SignInDetails {
  email: string;
  password: string;
  role: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { toast, closeToast, showToast } = useToast();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [signindetails, setDetails] = useState<SignInDetails>({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values(signindetails).every((value) => value.trim() !== "");
  };

  const { setUser } = useAuthStore.getState();

  const signin = async () => {
    setLoading(true);
    const formReady = isFormDataComplete();

    if (!formReady) {
      setLoading(false);

      return;
    }

    try {
      const response = await api.post(
        `/api/${signindetails.role === "collector" ? "collector" : "center"}/login`,
        signindetails,
      );

      setLoading(false);

      showToast("Sign in successful", "success", "/dashboard");

      setUser(response.data.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.data.user._id,
          role: response.data.data.user.role,
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
    <div className="flex justify-center bg-[#FAFAFA] pt-10 pb-15 h-full">
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />

      <div className="flex flex-col gap-5.25">
        <div className="flex flex-col gap-5.25">
          <div className="flex justify-center gap-2">
            <img src={logo} alt="Plasitconn logo" className="w-14 h-14" />

            <Typography color="#005C3D" fontSize={36} fontWeight={400}>
              Plasticonn
            </Typography>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col ">
              <div className="flex justify-center">
                <Typography color="#1A1A1A" fontSize={24} fontWeight={400}>
                  Welcome to Plasticonn
                </Typography>
              </div>

              <div className="flex justify-center">
                <Typography color="#1A1A1A99" fontSize={18} fontWeight={400}>
                  Join the sustainability revolution
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAFA] rounded-[18px] border border-[#1A1A1A80] p-6 mt-4 ml-4 flex flex-col gap-6.5 w-228">
          <div className="flex justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Typography color="#1A1A1A" fontSize={24} fontWeight={400}>
                  Sign In
                </Typography>
              </div>

              <Typography color="#1A1A1A99" fontSize={20} fontWeight={400}>
                Enter your credentials to access your Plasticonn account{" "}
              </Typography>
            </div>
          </div>

          <div className="mx-3">
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Role
            </Typography>

            <TextField
              select
              name="role"
              value={signindetails.role}
              onChange={handleChange}
              placeholder="Select your role"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#00C2810D",

                  "& fieldset": {
                    borderColor: "#00C2810D",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#00C2810D",
                  },
                },

                "& .MuiSelect-select": {
                  padding: "10px 12px",
                  fontSize: 14,
                },
              }}
            >
              <MenuItem value="collector">Collector</MenuItem>
              <MenuItem value="collection_center">Collection Center</MenuItem>
              <MenuItem value="recycling_center">Recycling Center</MenuItem>
            </TextField>
          </div>

          <div className="mx-3">
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              {signindetails.role !== "collector" ? "Center ID" : "Email"}
            </Typography>
            <TextField
              name="email"
              value={signindetails.email}
              onChange={handleChange}
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#00C2810D",

                  // default border
                  "& fieldset": {
                    borderColor: "#00C2810D",
                  },

                  // focused
                  "&.Mui-focused fieldset": {
                    borderColor: "#00C2810D",
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

          <div className="mx-3">
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              value={signindetails.password}
              onChange={handleChange}
              placeholder="Enter your password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#00C2810D",

                  // default border
                  "& fieldset": {
                    borderColor: "#00C2810D",
                  },

                  // focused
                  "&.Mui-focused fieldset": {
                    borderColor: "#00C2810D",
                  },
                },

                // input text
                "& input": {
                  padding: "10px 12px",
                  fontSize: 14,
                },
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

          <div className="flex justify-between items-center mx-3">
            <div className="flex items-center gap-.5">
              <Checkbox />
              <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
                Remember Me
              </Typography>
            </div>

            <div onClick={() => navigate("/forgot-password")}>
              <Typography
                fontWeight={400}
                fontSize={18}
                color="#00C281"
                sx={{
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </div>
          </div>

          <Button
            disabled={loading}
            fullWidth
            onClick={signin}
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
              Sign In
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
