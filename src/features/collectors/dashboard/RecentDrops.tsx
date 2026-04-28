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
  __v: number;
}

const RecentDrops = () => {
  const [drops, setDrops] = useState<Drops[]>([]);

  const getDrops = async () => {
    try {
      const response = await api.get(`/api/drop/get`);
      setDrops(response.data.data.drops);
      console.log(response.data.data.drops);
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
    w-full bg-[#FAFAFA]
    p-4 sm:p-6 lg:p-8
    rounded-xl shadow-[0_2px_6px_#1A1A1A26]
    flex flex-col gap-4 sm:gap-6
  "
    >
      {/* Header */}
      <div>
        <Typography
          fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
          fontWeight={400}
          color="#052E1E"
        >
          Recent Drop offs
        </Typography>

        <div className="mt-3">
          <Divider />
        </div>
      </div>

      {/* Empty */}
      {drops.length <= 0 && (
        <div className="flex justify-center py-6">
          <Typography fontSize={{ xs: 14, sm: 16 }} color="#1A1A1A80">
            You currently have no drop-offs
          </Typography>
        </div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-4">
        {drops.map((drop) => (
          <div
            key={drop._id}
            className="
          rounded-xl border border-[#1A1A1A20]
          p-4 sm:p-5
          flex flex-col sm:flex-row gap-4 sm:gap-5
          transition hover:shadow-md
        "
          >
            {/* IMAGE */}
            <div className="w-full sm:w-28 h-28 shrink-0">
              {drop.center_id.image ? (
                <img
                  src={drop.center_id.image.url}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div
                  className="w-full h-full rounded-xl"
                  style={{
                    background: "linear-gradient(to bottom, #005C3D, #00C281)",
                  }}
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 gap-3">
              {/* TOP ROW */}
              <div className="flex justify-between items-start">
                <Typography
                  fontWeight={500}
                  fontSize={{ xs: 14, sm: 16, md: 18 }}
                >
                  {drop.drop_id}
                </Typography>

                <div
                  className="px-2 py-1 rounded-lg text-xs sm:text-sm"
                  style={{
                    backgroundColor:
                      drop.status === "accepted" || drop.status === "verified"
                        ? "#00C281"
                        : drop.status === "pending"
                          ? "#FF9D0D1A"
                          : "#1A1A1A1A",
                    color:
                      drop.status === "accepted" || drop.status === "verified"
                        ? "white"
                        : drop.status === "pending"
                          ? "#FF9D0D"
                          : "#1A1A1A",
                  }}
                >
                  {drop.status === "accepted" || drop.status === "verified"
                    ? "Accepted"
                    : drop.status === "pending"
                      ? "Pending"
                      : "Rejected"}
                </div>
              </div>

              {/* CENTER INFO */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[#1A1A1A80]">
                <div className="flex items-center gap-2">
                  <HiOutlineOfficeBuilding size={16} />
                  <Typography fontSize={{ xs: 12, sm: 14 }}>
                    {drop.center_id?.name}
                  </Typography>
                </div>

                <div className="flex items-center gap-2">
                  <GoClock size={16} />
                  <Typography fontSize={{ xs: 12, sm: 14 }}>
                    {formatDayAndTime(drop.createdAt)}
                  </Typography>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex justify-between items-end">
                <div>
                  <Typography fontSize={12} color="#1A1A1A80">
                    CO₂ Saved
                  </Typography>

                  <Typography
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                    color="#00C281"
                    fontWeight={500}
                  >
                    {calculateCO2Saved(drop.amount)}
                  </Typography>
                </div>

                {/* OPTIONAL: amount */}
                <Typography className="text-xs sm:text-sm text-[#1A1A1A80]">
                  {drop.amount} kg
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDrops;
