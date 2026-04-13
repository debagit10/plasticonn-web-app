import cube from "../../../assets/cube.png";
import { Typography, Divider, TextField, Button } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import { BsPatchCheck } from "react-icons/bs";
import { useToast } from "../../../utils/useToast";
import api from "../../../utils/axiosInstance";
import Toast from "../../../utils/Toast";

interface Drop {
  collector: string;
  type: string[];
  timestamp: string;
  id: string;
}

const Verify_Drop = ({
  selected,
  drop,
  onDeselect,
  onSuccess,
}: {
  selected: boolean;
  drop: Drop;
  onDeselect: () => void;
  onSuccess: () => void;
}) => {
  const { toast, closeToast, showToast } = useToast();

  const verify = async (status: "accepted" | "rejected") => {
    console.log(status);

    try {
      await api.put(`/api/drop/update/${drop.id}`, { status });

      showToast("Drop status updated", "success");

      setTimeout(() => {
        onDeselect();
        onSuccess();
      }, 2000);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      showToast(errMsg, "error");
    }
  };

  return (
    <div
      className="
    bg-[#FAFAFA] rounded-xl shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col
    
    w-full 
    min-h-125 lg:min-h-162.5
    
    p-5 sm:p-7 lg:p-9
  "
    >
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />

      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center">
          <Typography
            fontSize={20}
            fontWeight={400}
            color="#052E1E"
            className="sm:text-2xl lg:text-[28px]"
          >
            Verify Drop
          </Typography>

          {selected && (
            <button
              onClick={() => onDeselect()}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center 
          rounded-lg hover:bg-[#1A1A1A0D] transition-all duration-200"
            >
              <MdOutlineCancel size={16} className="sm:text-[18px]" />
            </button>
          )}
        </div>

        <div className="my-3 sm:my-5">
          <Divider />
        </div>
      </div>

      {/* CONTENT */}
      {selected ? (
        <div className="flex flex-col gap-5 sm:gap-6.5">
          {/* FIELD */}
          {[
            { label: "Collector", value: drop.collector },
            { label: "Type", value: drop.type },
            { label: "Time", value: drop.timestamp },
          ].map((field, i) => (
            <div key={i}>
              <Typography
                fontWeight={400}
                fontSize={16}
                color="#1A1A1A"
                className="sm:text-lg"
              >
                {field.label}
              </Typography>

              <TextField
                value={field.value}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "#FAFAFA",

                    "& fieldset": {
                      borderColor: "#1A1A1A",
                      borderWidth: "0.2px",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#1A1A1A",
                      borderWidth: "0.2px",
                    },
                  },

                  "& input": {
                    padding: "10px 12px",
                    fontSize: 14,
                  },
                }}
              />
            </div>
          ))}

          {/* VERIFIED WEIGHT */}
          <div>
            <Typography
              fontWeight={400}
              fontSize={16}
              color="#1A1A1A"
              className="sm:text-lg"
            >
              Verified Weight
            </Typography>

            <TextField
              placeholder="Input the weight here"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#FAFAFA",

                  "& fieldset": {
                    borderColor: "#1A1A1A",
                    borderWidth: "0.2px",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#1A1A1A",
                    borderWidth: "0.2px",
                  },
                },

                "& input": {
                  padding: "10px 12px",
                  fontSize: 14,
                },
              }}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              onClick={() => verify("accepted")}
              startIcon={<BsPatchCheck />}
              fullWidth
              sx={{
                backgroundColor: "#00C281",
                color: "white",
                textTransform: "capitalize",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <Typography
                fontSize={14}
                className="sm:text-base"
                color="#FAFAFA"
              >
                Verify
              </Typography>
            </Button>

            <Button
              onClick={() => verify("rejected")}
              startIcon={<MdOutlineCancel />}
              fullWidth
              sx={{
                backgroundColor: "#EA4335",
                color: "white",
                textTransform: "capitalize",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <Typography
                fontSize={14}
                className="sm:text-base"
                color="#FAFAFA"
              >
                Reject
              </Typography>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1 text-center">
          <img src={cube} className="w-10 h-10 sm:w-14 sm:h-14" />

          <Typography
            fontWeight={400}
            fontSize={16}
            color="#1A1A1A80"
            className="sm:text-lg lg:text-2xl"
          >
            Select a submission from the queue to begin verification
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Verify_Drop;
