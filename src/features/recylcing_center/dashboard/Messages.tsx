import { Typography, Divider, TextField, Button } from "@mui/material";
import { useState } from "react";
import { IoNavigateOutline } from "react-icons/io5";
import All_Messages from "../modals/Messages";

const Messages = () => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const messages = [
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
    {
      from: "New submission",
      text: "Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. Sarah Johnson submitted 5.2 kg of PET plastic. ",
      time: "10 mins ago",
      read: false,
    },
  ];

  return (
    <div
      className="
    bg-[#FAFAFA] rounded-xl shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col gap-6 sm:gap-7
    
    w-full
    p-5 sm:p-7 lg:p-9
  "
    >
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center">
          <Typography
            className="text-xl sm:text-2xl lg:text-[28px]"
            fontWeight={400}
            color="#052E1E"
          >
            Messages
          </Typography>

          <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#EA43351A]">
            <Typography
              className="text-sm sm:text-base lg:text-lg"
              fontWeight={300}
              color="#EA4335"
            >
              2 new
            </Typography>
          </div>
        </div>

        <div className="mt-3 sm:mt-5">
          <Divider />
        </div>
      </div>

      {/* MESSAGE LIST */}
      <div className="mt-4 sm:mt-5 flex flex-col gap-3 max-h-100 sm:max-h-125 lg:max-h-162.5 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div key={index}>
            <div
              onClick={() =>
                setSelectedIndex(selectedIndex === index ? null : index)
              }
              className={`
            rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 border cursor-pointer transition-all
            ${
              message.read
                ? "bg-[#1A1A1A0D] border-[#1A1A1A80]"
                : "bg-[#00C2810A] border-[#00C281]"
            }
          `}
            >
              <div className="flex flex-col w-full">
                {/* TOP ROW */}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#00C281] rounded-full" />

                    <Typography
                      className="text-sm sm:text-base lg:text-lg"
                      fontWeight={400}
                      color="#1A1A1A"
                    >
                      {message.from}
                    </Typography>
                  </div>

                  <Typography
                    className="text-xs sm:text-sm"
                    fontWeight={400}
                    color="#1A1A1A99"
                  >
                    {message.time}
                  </Typography>
                </div>

                {/* MESSAGE TEXT */}
                <Typography
                  className={`text-sm sm:text-base mt-1 ${
                    selectedIndex !== index ? "line-clamp-2" : ""
                  }`}
                  fontWeight={300}
                  color="#1A1A1A"
                >
                  {message.text}
                </Typography>
              </div>
            </div>

            {/* REPLY BOX */}
            {selectedIndex === index && (
              <div className="my-4 transition-all duration-300">
                <Typography
                  fontWeight={400}
                  className="text-sm sm:text-base"
                  color="#1A1A1A"
                >
                  Reply
                </Typography>

                <TextField
                  placeholder="e.g Green valley collection center"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  sx={{
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#1A1A1A0D",
                      "& fieldset": {
                        borderColor: "#1A1A1A",
                        borderWidth: "0.2px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1A1A1A",
                      },
                    },
                  }}
                />

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                  <Button
                    onClick={() => setSelectedIndex(null)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      height: "48px",
                      borderRadius: "12px",
                      borderColor: "#1A1A1A80",
                      color: "#1A1A1A",
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    startIcon={<IoNavigateOutline />}
                    fullWidth
                    sx={{
                      height: "48px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(to top right, #00C281, #005C3D)",
                      color: "white",
                    }}
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <All_Messages />
      </div>
    </div>
  );
};

export default Messages;
