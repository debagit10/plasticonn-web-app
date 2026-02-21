import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import location from "../../../assets/location.png";
import { IoCloseOutline } from "react-icons/io5";
import { IoNavigateOutline } from "react-icons/io5";

const centers = [
  {
    name: "EcoHub Center",
    distance: "0.8 km",
    open: true,
    materials: ["PET", "PVC", "PTDE"],
  },
  {
    name: "Green Point Station",
    distance: "1.2 km",
    open: true,
    materials: ["PET", "PP"],
  },
  {
    name: "RecycleMax Downtown",
    distance: "2.5 km",
    open: false,
    materials: ["PET", "PP", "HDPE", "LDPE"],
  },
];

const Navigate = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  return (
    <div>
      <div>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<IoNavigateOutline />}
          sx={{
            width: "200px",
            backgroundColor: "#00C281",
            color: "white",
            textTransform: "capitalize",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <Typography fontSize={16} fontWeight={300} color="#FAFAFA">
            Navigate
          </Typography>
        </Button>

        <Dialog
          open={open}
          PaperProps={{
            sx: {
              paddingY: "24px",
              paddingX: "18px",
              borderRadius: "18px",
              width: "550px",
            },
          }}
        >
          <DialogTitle className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Typography fontSize={26} fontWeight={400} color="#1A1A1A">
                Navigate to Collection Center
              </Typography>
              <Typography fontSize={20} fontWeight={300} color="#1A1A1A">
                Select a collection center to navigate to
              </Typography>
            </div>

            <div
              onClick={() => setOpen(false)}
              className="cursor-pointer w-6.5 h-6.5"
            >
              <IoCloseOutline
                // size={14}
                width={14}
                height={14}
                color="#1A1A1A"
              />
            </div>
          </DialogTitle>
          <DialogContent>
            {centers.map((center, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() =>
                    setSelectedIndex(selectedIndex === index ? null : index)
                  }
                  className={`rounded-xl p-6.5 border-[0.4px] flex flex-col gap-3 mb-4 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedIndex === index ? "bg-[#00C2810D] border-[#00C281]" : "bg-white border-[#1A1A1A]"}`}
                >
                  <div className="flex justify-between">
                    <Typography fontSize={24} fontWeight={400} color="#1A1A1A">
                      {center.name}
                    </Typography>

                    <div
                      className="p-2.5 rounded-xl w-22.5 h-11.5 text-center flex items-center justify-center"
                      style={{
                        backgroundColor: center.open
                          ? "#00C2811A"
                          : "#1A1A1A1A",
                      }}
                    >
                      <Typography
                        fontSize={20}
                        fontWeight={300}
                        color={center.open ? "#00C281" : "#1A1A1A"}
                      >
                        {center.open ? "Open" : "Closed"}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <img src={location} alt="location" />

                    <Typography
                      fontSize={24}
                      fontWeight={400}
                      color="#1A1A1A80"
                    >
                      {center.distance}
                    </Typography>
                  </div>

                  <div className="flex gap-6.75 flex-wrap">
                    {center.materials.map((material, i) => (
                      <div
                        key={i}
                        className="border-[0.5px] border-[#1A1A1A80] rounded-lg p-2 
                             text-center flex items-center justify-center"
                      >
                        <Typography
                          fontSize={14}
                          fontWeight={400}
                          color="#1A1A1A"
                        >
                          {material}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedIndex === index && (
                  <div className="mb-4 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        // window.open(`https://www.google.com/maps?q=${center.lat},${center.lng}`, "_blank");

                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            center.name,
                          )}`,
                          "_blank",
                        );
                      }}
                      className="w-full bg-[#00C281] text-white py-3 rounded-xl
                           transition-all duration-200 hover:opacity-90"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navigate;
