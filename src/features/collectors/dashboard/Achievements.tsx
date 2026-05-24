import { Avatar, Divider, Stack, Typography } from "@mui/material";
import api from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { getInitials } from "../../../utils/getInitials";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        label: "Gold",
        bg: "#FEF3C7",
        color: "#D97706",
        icon: "🥇",
      };

    case 2:
      return {
        label: "Silver",
        bg: "#E5E7EB",
        color: "#6B7280",
        icon: "🥈",
      };

    case 3:
      return {
        label: "Bronze",
        bg: "#FCD7C7",
        color: "#C2410C",
        icon: "🥉",
      };

    default:
      return {
        label: `#${rank}`,
        bg: "#F3F4F6",
        color: "#374151",
        icon: null,
      };
  }
};

interface Leaderboard {
  email: string;
  name: string;
  image: string | null;
  rank: number;
  totalPlastics: number;
  _id: string;
}

const Achievements = () => {
  const [data, setLeaderboard] = useState<Leaderboard[]>([]);

  console.log(api.getUri());

  const getLeaderboard = async () => {
    try {
      const response = await api.get(`/api/leaderboard`);

      setLeaderboard(response.data.data);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className=" w-full min-h-37.5 sm:min-h-45 lg:min-h-55 bg-[#FAFAFA] py-4 sm:py-6 lg:py-8 px-4 sm:px-5 lg:px-6 rounded-xl shadow-[0_2px_6px_#1A1A1A26] ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography
          fontSize={{ xs: 18, sm: 22, md: 24, lg: 28 }}
          fontWeight={400}
          color="#052E1E"
        >
          {" "}
          Leaderboard{" "}
        </Typography>

        <div className="flex items-center gap-2">
          {/* <EmojiEventsIcon sx={{ color: "#F59E0B" }} /> */}

          <Typography
            fontSize={{ xs: 14, sm: 16 }}
            color="#4B5563"
            fontWeight={500}
          >
            Top 20 Collectors
          </Typography>
        </div>
      </div>

      <Divider sx={{ marginY: "1rem" }} />

      {/* Leaderboard */}
      <Stack spacing={2}>
        {data.map((collector, index) => {
          const rank = index + 1;
          const rankStyle = getRankStyle(rank);

          return (
            <div
              key={collector._id}
              className="
                flex
                items-center
                justify-between
                bg-white
                rounded-2xl
                px-4
                py-3
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
              "
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-semibold
                    text-sm
                  "
                  style={{
                    backgroundColor: rankStyle.bg,
                    color: rankStyle.color,
                  }}
                >
                  {rankStyle.icon || rank}
                </div>

                {/* Avatar */}
                <Avatar
                  src={collector.image || getInitials(collector.name)}
                  alt={collector.name}
                  sx={{
                    width: { xs: 45, sm: 52 },
                    height: { xs: 45, sm: 52 },
                  }}
                />

                {/* Name */}
                <div>
                  <Typography
                    fontWeight={600}
                    fontSize={{ xs: 14, sm: 16 }}
                    color="#111827"
                  >
                    {collector.name}
                  </Typography>

                  <Typography fontSize={{ xs: 12, sm: 14 }} color="#6B7280">
                    Collector
                  </Typography>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                {/* {rank <= 3 && (
                  <Chip
                    label={rankStyle.label}
                    sx={{
                      backgroundColor: rankStyle.bg,
                      color: rankStyle.color,
                      fontWeight: 600,
                    }}
                  />
                )} */}

                <Typography
                  fontWeight={700}
                  fontSize={{ xs: 14, sm: 18 }}
                  color="#00C281"
                >
                  {collector.totalPlastics.toLocaleString()} plastics
                </Typography>
              </div>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default Achievements;
