import { Typography, Divider } from "@mui/material";
import profile from "../../../assets/profile.png";
import time from "../../../assets/time.png";
import Verify_Drop from "./Verify_Drop";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";

interface Location {
  type: "Point";
  coordinates: [number, number];
}

interface PopulatedRef {
  _id: string;
  name: string;
}

interface Drops {
  _id: string;
  drop_id: string;
  location: Location;
  collector_id: PopulatedRef;
  center_id: PopulatedRef;
  amount: number;
  types: string[];
  condition: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Queue = () => {
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const [drops, setDrops] = useState<Drops[]>([]);
  const [drop, setDrop] = useState({
    collector: "",
    type: [""],
    timestamp: "",
    id: "",
  });

  const getDrops = async () => {
    try {
      const response = await api.get(`/api/drop/get`);

      setDrops(response.data.data.drops);

      // setLoading(false);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    getDrops();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* LEFT PANEL */}
      <div
        className="
      bg-[#FAFAFA] rounded-xl shadow-[0_2px_6px_#1A1A1A26]
      flex flex-col gap-10
      
      w-full 
      lg:w-[60%] 
      
      p-5 sm:p-7 lg:p-9
    "
      >
        <div>
          <Typography
            fontSize={20}
            fontWeight={400}
            color="#052E1E"
            className="sm:text-2xl lg:text-[28px]"
          >
            Verification Queue
          </Typography>

          <div className="mt-3 sm:mt-5">
            <Divider />
          </div>
        </div>

        {drops.filter((drop) => drop.status === "pending").length <= 0 && (
          <div className="text-center">
            <Typography
              fontSize={16}
              fontWeight={400}
              color="#052E1E"
              className="sm:text-lg"
            >
              You currently have no drops
            </Typography>
          </div>
        )}

        <div className="flex flex-col gap-5 sm:gap-7 lg:gap-10">
          {drops
            .filter((drop) => drop.status === "pending")
            .map((drop, index) => (
              <div
                key={index}
                className={`
              rounded-xl border-[0.4px] cursor-pointer transition-all duration-200 
              hover:shadow-md flex flex-col gap-3
              
              p-4 sm:p-5 lg:p-6.5
              
              ${
                selectedIndex === index
                  ? "bg-[#00C2810D] border-[#00C281]"
                  : "bg-white border-[#1A1A1A]"
              }
            `}
                onClick={() => {
                  if (selectedIndex !== index) {
                    setSelected(true);

                    setDrop({
                      collector: drop.collector_id.name,
                      type: drop.types,
                      timestamp: drop.createdAt,
                      id: drop._id,
                    });

                    setSelectedIndex(index);
                  }
                }}
              >
                <div className="flex justify-between items-start sm:items-center gap-3">
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <img src={profile} className="w-5 h-5 sm:w-6.5 sm:h-6.5" />
                    <Typography
                      fontWeight={400}
                      fontSize={16}
                      color="#1A1A1A"
                      className="sm:text-lg lg:text-2xl"
                    >
                      {drop.collector_id.name}
                    </Typography>
                  </div>

                  <div className="px-3 py-1.5 sm:p-2.5 rounded-xl text-center flex items-center justify-center bg-[#00C2811A]">
                    <Typography
                      fontSize={14}
                      fontWeight={300}
                      color="#00C281"
                      className="sm:text-base lg:text-xl"
                    >
                      {drop.types.join(", ")}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 items-center">
                  <img src={time} className="w-5 h-5 sm:w-6.5 sm:h-6.5" />
                  <Typography
                    fontWeight={400}
                    fontSize={14}
                    color="#1A1A1A80"
                    className="sm:text-base lg:text-2xl"
                  >
                    {drop.createdAt}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[40%]">
        <Verify_Drop
          selected={selected}
          drop={drop}
          onDeselect={() => {
            setSelected(false);
            setSelectedIndex(null);
          }}
          onSuccess={() => getDrops()}
        />
      </div>
    </div>
  );
};

export default Queue;
