import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { IoClose, IoNavigateOutline } from "react-icons/io5";
import message from "../../../assets/messages.png";

const All_Messages = () => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [open, setOpen] = useState(false);

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
  ];

  return (
    <div className="relative">
      <div
        className="cursor-pointer flex justify-center items-center gap-2.5 border border-[#1A1A1A80] bg-[#1A1A1A0D] px-4.5 py-3.75 rounded-xl"
        onClick={() => setOpen(true)}
      >
        <img src={message} />
        <Typography fontWeight={400} fontSize={18} color="#1A1A1A">
          View All Messages
        </Typography>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 ">
          <div
            className="bg-[#FAFAFA] p-9 rounded-xl 
               shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
               w-215 max-w-[95%]"
          >
            <div
              className="flex justify-end cursor-pointer ml-[97%] w-4.5 h-4.5 mb-4"
              onClick={() => setOpen(false)}
            >
              <IoClose size={14} />
            </div>

            <div className="flex justify-between">
              <Typography fontSize={26} fontWeight={500} color="#00C281">
                Messages
              </Typography>

              <Typography
                fontSize={16}
                fontWeight={400}
                color="#1A1A1A"
                sx={{ textDecoration: "underline" }}
              >
                Mark all as read
              </Typography>
            </div>

            <div className="overflow-hidden overflow-y-scroll h-150 mt-5 mb-10 ">
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
                        className={
                          selectedIndex !== index ? "line-clamp-2" : ""
                        }
                      >
                        {message.text}
                      </Typography>
                    </div>
                  </div>

                  <div>
                    {selectedIndex === index && (
                      <div className="my-4 transition-all duration-300">
                        <Typography
                          fontWeight={400}
                          fontSize={18}
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
                            fullWidth
                            sx={{
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
                            fullWidth
                            sx={{
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
          </div>
        </div>
      )}
    </div>
  );
};

export default All_Messages;
