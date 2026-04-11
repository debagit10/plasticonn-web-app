import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoNavigateOutline } from "react-icons/io5";
import api from "../../../utils/axiosInstance";
import CenterCard from "../CenterCard";

interface Centers {
  _id: string;
  centerId: string;
  name: string;
  address: string;
  materialsAccepted: string[];
  gps: GPS;
  contactPhone: string;
}

interface GPS {
  coordinates: number[];
}

const Navigate = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [centers, setCenters] = useState<Centers[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const filteredCenters = centers.filter((center) =>
    center.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getCenters = async () => {
    try {
      const response = await api.get(`/api/center/list`);

      setCenters(response.data.data.centers);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
      console.log(errMsg);
    }
  };

  useEffect(() => {
    getCenters();
  }, []);

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
            <div className="flex flex-col gap-1 sm:gap-2">
              <Typography
                fontSize={{ xs: 18, sm: 22, md: 24, lg: 26 }}
                fontWeight={400}
              >
                Navigate to Collection Center
              </Typography>

              {/* <Typography
                fontSize={{ xs: 12, sm: 14, md: 16, lg: 18 }}
                fontWeight={300}
                color="#1A1A1A80"
              >
                Select a collection center to navigate to
              </Typography> */}
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
            <div className="mb-2">
              <TextField
                name="center"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Collection center"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    borderRadius: "16px",
                    backgroundColor: "#7373731A",
                    "& fieldset": { borderColor: "#1A1A1A" },
                    "&.Mui-focused fieldset": { borderColor: "#1A1A1A" },
                  },
                  "& input": { padding: "10px 12px", fontSize: 14 },
                }}
              />
            </div>

            {filteredCenters.length === 0 ? (
              <Typography
                fontSize={16}
                fontWeight={400}
                color="#1A1A1A80"
                className="text-center py-4"
              >
                No centers found
              </Typography>
            ) : (
              filteredCenters.map((center, index) => (
                <CenterCard
                  key={center._id}
                  center={center}
                  index={index}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              ))
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navigate;
