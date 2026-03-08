import { Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import api from "../../../utils/axiosInstance";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { formatDayAndTime } from "../../../utils/DayAndTime";
import { calculateCO2Saved } from "../../../utils/C02saved";

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

const RecentDrops = () => {
  //const [loading, setLoading] = useState(false);
  const [drops, setDrops] = useState<Drops[]>([]);

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
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-17 w-262.5">
      <div className="">
        <div className="flex justify-between">
          <Typography fontSize={28} fontWeight={400} color="#052E1E">
            Recent Drop offs
          </Typography>
        </div>

        <div className="mt-5">
          <Divider />
        </div>
      </div>

      {drops.map((drop) => (
        <div className="rounded-xl p-6.5 border-[0.4px] flex flex-col cursor-pointer transition-all duration-200 hover:shadow-md">
          <div className="flex justify-between">
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A">
              {drop.drop_id}
            </Typography>
            <div
              className="p-2.5 rounded-xl w-31.25 h-11.5 text-center flex items-center justify-center"
              style={{
                backgroundColor:
                  drop.status === "verified"
                    ? "#00C281"
                    : drop.status === "pending"
                      ? "#FF9D0D1A"
                      : "#1A1A1A1A",
              }}
            >
              <Typography
                fontSize={20}
                fontWeight={300}
                color={
                  drop.status === "verified"
                    ? "white"
                    : drop.status === "pending"
                      ? "#FF9D0D"
                      : "#1A1A1A"
                }
              >
                {drop.status === "verified"
                  ? "Verified"
                  : drop.status === "pending"
                    ? "Pending"
                    : "Rejected"}
              </Typography>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <HiOutlineOfficeBuilding size={20} />
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
              {drop.center_id.name}
            </Typography>
          </div>

          <div className="flex gap-3 items-center">
            <GoClock size={20} />
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
              {formatDayAndTime(drop.createdAt)}
            </Typography>
          </div>

          <div>
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
              {" "}
              CO₂ Saved
            </Typography>
            <Typography fontWeight={400} fontSize={24} color="#00C281">
              {calculateCO2Saved(drop.amount)}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDrops;
