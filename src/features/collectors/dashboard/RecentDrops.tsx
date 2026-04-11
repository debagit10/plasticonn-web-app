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
  name?: string;
  firstName?: string;
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
  const [drops, setDrops] = useState<Drops[]>([]);

  const getDrops = async () => {
    try {
      const response = await api.get(`/api/drop/get`);
      setDrops(response.data.data.drops);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getDrops();
  }, []);

  return (
    <div
      className="
        w-full
        bg-[#FAFAFA]
        p-4 sm:p-6 lg:p-8
        rounded-xl
        shadow-[0_2px_6px_#1A1A1A26]
        flex flex-col
        gap-4 sm:gap-6
      "
    >
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <Typography
            fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
            fontWeight={400}
            color="#052E1E"
          >
            Recent Drop offs
          </Typography>
        </div>

        <div className="mt-3">
          <Divider />
        </div>
      </div>

      {/* Empty State */}
      {drops.length <= 0 && (
        <div className="flex justify-center py-6">
          <Typography fontSize={{ xs: 14, sm: 16 }} color="#1A1A1A80">
            You currently have no drop-offs
          </Typography>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {drops.map((drop) => (
          <div
            key={drop._id}
            className="
              rounded-xl
              p-4 sm:p-5
              border border-[#1A1A1A30]
              flex flex-col gap-3
              cursor-pointer
              transition-all duration-200
              hover:shadow-md
            "
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <Typography
                fontWeight={400}
                fontSize={{ xs: 14, sm: 16, md: 18, lg: 20 }}
              >
                {drop.drop_id}
              </Typography>

              <div
                className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    drop.status === "accepted" || drop.status === "verified"
                      ? "#00C281"
                      : drop.status === "pending"
                        ? "#FF9D0D1A"
                        : "#1A1A1A1A",
                }}
              >
                <Typography
                  fontSize={{ xs: 12, sm: 14, md: 16 }}
                  fontWeight={300}
                  color={
                    drop.status === "accepted" || drop.status === "verified"
                      ? "white"
                      : drop.status === "pending"
                        ? "#FF9D0D"
                        : "#1A1A1A"
                  }
                >
                  {drop.status === "accepted" || drop.status === "verified"
                    ? "Accepted"
                    : drop.status === "pending"
                      ? "Pending"
                      : "Rejected"}
                </Typography>
              </div>
            </div>

            {/* Center */}
            <div className="flex gap-2 items-center">
              <HiOutlineOfficeBuilding size={16} />
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                color="#1A1A1A80"
              >
                {drop.center_id?.name}
              </Typography>
            </div>

            {/* Time */}
            <div className="flex gap-2 items-center">
              <GoClock size={16} />
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                color="#1A1A1A80"
              >
                {formatDayAndTime(drop.createdAt)}
              </Typography>
            </div>

            {/* CO2 */}
            <div>
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                color="#1A1A1A80"
              >
                CO₂ Saved
              </Typography>

              <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} color="#00C281">
                {calculateCO2Saved(drop.amount)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDrops;
