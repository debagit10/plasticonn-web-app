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
      {/* TRIGGER BUTTON */}
      <div
        className="
      cursor-pointer flex items-center justify-center gap-2
      border border-[#1A1A1A80] bg-[#1A1A1A0D]
      px-4 py-3 rounded-xl
    "
        onClick={() => setOpen(true)}
      >
        <img src={message} className="w-4 h-4 sm:w-5 sm:h-5" />

        <Typography
          fontWeight={400}
          className="text-sm sm:text-base lg:text-lg"
          color="#1A1A1A"
        >
          View All Messages
        </Typography>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="
          bg-[#FAFAFA] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          
          w-full sm:w-[90%] lg:w-[70%] xl:w-[60%]
          
          max-h-[85vh]
          flex flex-col
        "
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-5 sm:p-7 border-b">
              <Typography
                className="text-lg sm:text-xl lg:text-2xl"
                fontWeight={500}
                color="#00C281"
              >
                Messages
              </Typography>

              <div
                className="cursor-pointer p-2"
                onClick={() => setOpen(false)}
              >
                <IoClose size={18} />
              </div>
            </div>

            {/* MARK ALL */}
            <div className="flex justify-end px-5 sm:px-7 pt-3">
              <Typography
                className="text-sm sm:text-base"
                fontWeight={400}
                color="#1A1A1A"
                sx={{ textDecoration: "underline" }}
              >
                Mark all as read
              </Typography>
            </div>

            {/* MESSAGE LIST */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-4 flex flex-col gap-3">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    onClick={() =>
                      setSelectedIndex(selectedIndex === index ? null : index)
                    }
                    className={`
                  rounded-xl p-3 sm:p-4 flex gap-3 border cursor-pointer
                  ${
                    message.read
                      ? "bg-[#1A1A1A0D] border-[#1A1A1A80]"
                      : "bg-[#00C2810A] border-[#00C281]"
                  }
                `}
                  >
                    <div className="flex flex-col w-full">
                      {/* TOP */}
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#00C281] rounded-full" />

                          <Typography
                            className="text-sm sm:text-base"
                            fontWeight={400}
                            color="#1A1A1A"
                          >
                            {message.from}
                          </Typography>
                        </div>

                        <Typography
                          className="text-xs sm:text-sm"
                          color="#1A1A1A99"
                        >
                          {message.time}
                        </Typography>
                      </div>

                      {/* TEXT */}
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

                  {/* REPLY */}
                  {selectedIndex === index && (
                    <div className="my-4 transition-all duration-300">
                      <Typography
                        className="text-sm sm:text-base"
                        fontWeight={400}
                        color="#1A1A1A"
                      >
                        Reply
                      </Typography>

                      <TextField
                        placeholder="e.g Green valley collection center"
                        variant="outlined"
                        fullWidth
                        multiline
                        sx={{
                          mt: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#1A1A1A0D",
                          },
                        }}
                      />

                      {/* BUTTONS */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default All_Messages;
