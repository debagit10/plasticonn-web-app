import { Typography, Divider } from "@mui/material";
import profile from "../../../assets/profile.png";
import time from "../../../assets/time.png";
import Verify_Drop from "./Verify_Drop";
import { useState } from "react";

const drops = [
  {
    collector: "Sarah Johnson",
    type: "PET",
    timestamp: "2025-11-10 14:32",
  },
  {
    collector: "Mike Adeniyi",
    type: "HDPE",
    timestamp: "2025-11-08 13:15",
  },
  {
    collector: "Emma Davis",
    type: "LDPE",
    timestamp: "2025-11-05 11:45",
  },
];

const Queue = () => {
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const [drop, setDrop] = useState({ collector: "", type: "", timestamp: "" });

  return (
    <div className="flex justify-between gap-10">
      <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-17 w-262.5">
        <div>
          <div className="">
            <Typography fontSize={28} fontWeight={400} color="#052E1E">
              Verification Queue
            </Typography>
          </div>

          <div className="mt-5">
            <Divider />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {drops.map((drop, index) => (
            <div
              className={`rounded-xl p-6.5 border-[0.4px] flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:shadow-md ${selectedIndex === index ? "bg-[#00C2810D] border-[#00C281]" : "bg-white border-[#1A1A1A]"}`}
              onClick={() => {
                if (selectedIndex !== index) {
                  setSelected(true);

                  setDrop({
                    collector: drop.collector,
                    type: drop.type,
                    timestamp: drop.timestamp,
                  });

                  setSelectedIndex(index);
                }
              }}
            >
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <img src={profile} className="w-6.5 h-6.5" />
                  <Typography fontWeight={400} fontSize={24} color="#1A1A1A">
                    {drop.collector}
                  </Typography>
                </div>

                <div className="p-2.5 rounded-xl w-31.25 h-11.5 text-center flex items-center justify-center bg-[#00C2811A]">
                  <Typography fontSize={20} fontWeight={300} color="#00C281">
                    {drop.type}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <img src={time} className="w-6.5 h-6.5" />
                <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
                  {drop.timestamp}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Verify_Drop
        selected={selected}
        drop={drop}
        onDeselect={() => {
          setSelected(false);
          setSelectedIndex(null);
        }}
      />
    </div>
  );
};

export default Queue;
