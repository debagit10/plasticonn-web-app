import { Typography, Divider, Avatar } from "@mui/material";
import time from "../../../assets/time.png";
import Verify_Drop from "./Verify_Drop";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
import { getInitials } from "../../../utils/getInitials";
import { formatDayAndTime } from "../../../utils/DayAndTime";

interface Location {
  type: "Point";
  coordinates: [number, number];
}

interface PopulatedRef {
  _id: string;
  firstName: string;
  image?: {
    url: string;
    public_id?: string;
  } | null;
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
  image: {
    url: string;
    public_id?: string;
  };
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
    image: "",
  });

  const getDrops = async () => {
    try {
      const response = await api.get(`/api/drop/get`);

      setDrops(response.data.data.drops);

      console.log(drops);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    getDrops();
  }, []);

  console.log(drops);

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

        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {drops
            .filter((drop) => drop.status === "pending")
            .map((drop, index) => (
              <div
                key={index}
                onClick={() => {
                  if (selectedIndex !== index) {
                    setSelected(true);

                    setDrop({
                      collector: drop.collector_id.firstName,
                      type: drop.types,
                      timestamp: drop.createdAt,
                      id: drop._id,
                      image: drop.image?.url,
                    });

                    setSelectedIndex(index);
                  }
                }}
                className={`
          flex flex-col sm:flex-row gap-4 sm:gap-5
          rounded-xl border transition-all duration-200 cursor-pointer
          p-4 sm:p-5 lg:p-6
          
          ${
            selectedIndex === index
              ? "bg-[#00C2810D] border-[#00C281]"
              : "bg-white border-[#1A1A1A20]"
          }

          hover:shadow-md
        `}
              >
                {/* IMAGE */}
                <div className="w-full sm:w-24 md:w-28  shrink-0">
                  {drop.image ? (
                    <img
                      src={drop.image.url}
                      className="
    rounded-2xl object-cover
    
    w-16 h-16
    sm:w-20 sm:h-20
    md:w-24 md:h-24
    lg:w-28 lg:h-28
  "
                    />
                  ) : (
                    <div
                      className="w-16 h-16
    sm:w-20 sm:h-20
    md:w-24 md:h-24
    lg:w-28 lg:h-28 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(to bottom, #005C3D, #00C281)",
                      }}
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 gap-3">
                  {/* TOP */}
                  <div className="flex justify-between items-start gap-3">
                    {/* <img
                      src={drop.collector_id.image?.url}
                      className="rounded-2xl object-cover"
                      alt={`Picture of ${drop.collector_id.firstName}`}
                    /> */}

                    <div className="flex items-center gap-3">
                      <Avatar
                        src={drop?.collector_id?.image?.url || undefined}
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(to bottom, #005C3D, #00C281)",
                        }}
                      >
                        {!drop?.collector_id?.image?.url &&
                          getInitials(`${drop?.collector_id.firstName}`)}
                      </Avatar>

                      <Typography
                        fontWeight={500}
                        className="text-sm sm:text-base lg:text-lg"
                        color="#1A1A1A"
                      >
                        {drop.collector_id.firstName}
                      </Typography>
                    </div>

                    <div className="bg-[#00C2811A] text-[#00C281] px-2.5 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap">
                      {drop.types.join(", ")}{" "}
                    </div>
                  </div>

                  {/* TIME */}
                  <div className="flex items-center gap-2 text-[#1A1A1A80]">
                    <img src={time} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <Typography className="text-xs sm:text-sm lg:text-base">
                      {formatDayAndTime(drop.createdAt)}
                    </Typography>
                  </div>
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
