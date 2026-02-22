import { TextField, Typography } from "@mui/material";

const Personal = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={400} fontSize={28} color="#1A1A1A">
          Personal Information
        </Typography>
        <Typography fontWeight={300} fontSize={24} color="#1A1A1A80">
          Update your personal details
        </Typography>
      </div>

      <div className="flex gap-9">
        <div>
          <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
            Center Name
          </Typography>
          <TextField
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g Green valley collection center"
            variant="outlined"
            size="small"
            sx={{
              width: "670px",
              // overall height
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
        </div>
        <div>
          <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
            Center Name
          </Typography>
          <TextField
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g Green valley collection center"
            variant="outlined"
            size="small"
            sx={{
              width: "670px",
              // overall height
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
        </div>
      </div>

      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Center Name
        </Typography>
        <TextField
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g Green valley collection center"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            //width: "650px",
            // overall height
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
      </div>
      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Center Name
        </Typography>
        <TextField
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g Green valley collection center"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            //width: "650px",
            // overall height
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
      </div>
      <div>
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          Center Name
        </Typography>
        <TextField
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g Green valley collection center"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            //width: "650px",
            // overall height
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
      </div>
    </div>
  );
};

export default Personal;
