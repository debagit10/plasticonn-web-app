import { Typography, Divider } from "@mui/material";
import { GoClock } from "react-icons/go";
import DropOff from "../modals/Dropoff";

const drops = [
  {
    center: "EcoHub Central",
    status: "verified",
    timestamp: "2025-11-10",
    co2: "12.4 kg",
  },
  {
    center: "Green Point Station",
    status: "pending",
    timestamp: "2025-11-08",
    co2: "9.1 kg",
  },
  {
    center: "RecycleMax Downtown",
    status: "verified",
    timestamp: "2025-11-05",
    co2: "15.6 kg",
  },
  {
    center: "EcoHub Central",
    status: "rejected",
    timestamp: "2025-11-02",
    co2: "0 kg",
  },
];

const RecentDrops = () => {
  return (
    <div className="bg-[#FAFAFA] p-9 rounded-xl shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-17 w-262.5">
      <div className="">
        <div className="flex justify-between">
          <Typography fontSize={28} fontWeight={400} color="#052E1E">
            Recent Drop offs
          </Typography>

          <DropOff />
        </div>

        <div className="mt-5">
          <Divider />
        </div>
      </div>

      {drops.map((drop) => (
        <div className="rounded-xl p-6.5 border-[0.4px] flex flex-col cursor-pointer transition-all duration-200 hover:shadow-md">
          <div className="flex justify-between">
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A">
              {drop.center}
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
            <GoClock size={26} />
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
              {drop.timestamp}
            </Typography>
          </div>

          <div>
            <Typography fontWeight={400} fontSize={24} color="#1A1A1A80">
              {" "}
              CO₂ Impact
            </Typography>
            <Typography fontWeight={400} fontSize={24} color="#00C281">
              {drop.co2}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDrops;
