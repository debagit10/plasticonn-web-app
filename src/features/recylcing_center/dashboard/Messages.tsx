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
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7 w-125 ">
      <div className="">
        <div className="flex justify-between">
          <Typography fontSize={28} fontWeight={400} color="#052E1E">
            Messages
          </Typography>

          <div className="p-2.5 rounded-lg w-17.5 h-9.5 text-center flex items-center justify-center bg-[#EA43351A]">
            <Typography fontSize={18} fontWeight={300} color="#EA4335">
              2 new
            </Typography>
          </div>
        </div>

        <div className="mt-5">
          <Divider />
        </div>

        <div className="overflow-hidden overflow-y-scroll h-162.5 mt-5 mb-10 ">
          {messages.map((message, index) => (
            <div className="mt-3">
              <div
                onClick={() =>
                  setSelectedIndex(selectedIndex === index ? null : index)
                }
                key={index}
                className={`rounded-[18px] p-4.5 flex gap-4.5 border ${message.read ? "bg-[#1A1A1A0D] border-[#1A1A1A80]" : "bg-[#00C2810A] border-[#00C281]"}`}
              >
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-4.5 h-4.5 bg-[#00C281] rounded-full" />

                      <Typography
                        fontSize={18}
                        fontWeight={400}
                        color="#1A1A1A"
                      >
                        {message.from}
                      </Typography>
                    </div>

                    <Typography
                      fontSize={14}
                      fontWeight={400}
                      color="#1A1A1A99"
                    >
                      {message.time}
                    </Typography>
                  </div>

                  <Typography
                    fontSize={16}
                    fontWeight={300}
                    color="#1A1A1A"
                    className={selectedIndex !== index ? "line-clamp-2" : ""}
                  >
                    {message.text}
                  </Typography>
                </div>
              </div>

              <div>
                {selectedIndex === index && (
                  <div className="my-4 transition-all duration-300">
                    <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
                      Reply
                    </Typography>
                    <TextField
                      placeholder="e.g Green valley collection center"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      sx={{
                        //marginTop: "20px",
                        // overall height
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#1A1A1A0D",

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

                    <div className="flex gap-4 mt-5">
                      <Button
                        onClick={() => setSelectedIndex(null)}
                        variant="outlined"
                        sx={{
                          width: "200px",
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
                        startIcon={<IoNavigateOutline />}
                        sx={{
                          width: "200px",
                          height: "48px",
                          padding: "12px",
                          borderRadius: "12px",
                          background:
                            "linear-gradient(to top right, #00C281, #005C3D)",
                          color: "white",
                        }}
                      >
                        <Typography
                          fontWeight={400}
                          fontSize={16}
                          sx={{ textTransform: "capitalize" }}
                        >
                          Send Reply
                        </Typography>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <All_Messages />
      </div>
    </div>
  );
};

export default Messages;
