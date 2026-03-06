import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoNavigateOutline } from "react-icons/io5";
import api from "../../../utils/axiosInstance";
import CenterCard from "../CenterCard";
// const centers = [
//   {
//     name: "EcoHub Center",
//     distance: "0.8 km",
//     open: true,
//     materials: ["PET", "PVC", "PTDE"],
//   },
//   {
//     name: "Green Point Station",
//     distance: "1.2 km",
//     open: true,
//     materials: ["PET", "PP"],
//   },
//   {
//     name: "RecycleMax Downtown",
//     distance: "2.5 km",
//     open: false,
//     materials: ["PET", "PP", "HDPE", "LDPE"],
//   },
// ];

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

  const [centers, setCenters] = useState<Centers[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

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
              <CenterCard
                key={center._id}
                center={center}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navigate;
