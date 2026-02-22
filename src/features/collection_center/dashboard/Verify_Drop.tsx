import cube from "../../../assets/cube.png";
import { Typography, Divider, TextField, Button } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import { BsPatchCheck } from "react-icons/bs";

interface Drop {
  collector: string;
  type: string;
  timestamp: string;
}

const Verify_Drop = ({
  selected,
  drop,
  onDeselect,
}: {
  selected: boolean;
  drop: Drop;
  onDeselect: () => void;
}) => {
  return (
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col  w-125 h-162.5">
      <div>
        <div className="flex justify-between items-center">
          <Typography fontSize={28} fontWeight={400} color="#052E1E">
            Verify Drop
          </Typography>

          {selected && (
            <button
              onClick={() => onDeselect()}
              className="w-8 h-8 flex items-center justify-center 
                 rounded-lg hover:bg-[#1A1A1A0D] transition-all duration-200"
            >
              <MdOutlineCancel size={18} />
            </button>
          )}
        </div>

        <div className="my-5">
          <Divider />
        </div>
      </div>

      {selected ? (
        <div className="flex flex-col gap-6.5">
          <div>
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Collector
            </Typography>
            <TextField
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              value={drop.collector}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                //width: "650px",
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "48px",
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
          <div>
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Type
            </Typography>
            <TextField
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              value={drop.type}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                //width: "650px",
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "48px",
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

          <div>
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Time
            </Typography>
            <TextField
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              value={drop.timestamp}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                //width: "650px",
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "48px",
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

          <div>
            <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
              Verified Weight
            </Typography>
            <TextField
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              placeholder="Input the weight here"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                //width: "650px",
                // overall height
                "& .MuiOutlinedInput-root": {
                  height: "48px",
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

          <div className="flex gap-3">
            <Button
              startIcon={<BsPatchCheck />}
              fullWidth
              sx={{
                backgroundColor: "#00C281",
                color: "white",
                textTransform: "capitalize",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
                Verify
              </Typography>
            </Button>

            <Button
              //onClick={() => setSelected(false)}
              startIcon={<MdOutlineCancel />}
              fullWidth
              sx={{
                backgroundColor: "#EA4335",
                color: "white",
                textTransform: "capitalize",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
                Reject
              </Typography>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5.75 text-center mt-[30%] ">
          <div className="flex justify-center">
            <img src={cube} className="w-14 h-14" />
          </div>
          <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
            Select a submission from the queue to begin verification
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Verify_Drop;
