import { Typography } from "@mui/material";
import { HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import {
  HiOutlineBuildingOffice,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";

const Facility_details = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <div className="w-full flex justify-between">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex items-start gap-3">
            <HiOutlineBuildingOffice size={22} className="text-[#1A1A1A]" />
            <div>
              <Typography fontSize={20} fontWeight={500} color="#1A1A1A">
                EcoProcess Recycling Facility
              </Typography>
              <Typography fontSize={14} color="#1A1A1A80">
                Est. 2018 • Industrial Grade Facility
              </Typography>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <HiOutlineMapPin size={20} className="text-[#1A1A1A80]" />
            <div>
              <Typography fontSize={14} color="#1A1A1A80">
                Address
              </Typography>
              <Typography fontSize={15} color="#1A1A1A">
                Agege, Lagos state
              </Typography>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-3">
            <HiOutlinePhone size={20} className="text-[#1A1A1A80]" />
            <div>
              <Typography fontSize={14} color="#1A1A1A80">
                Contact Number
              </Typography>
              <Typography fontSize={15} color="#1A1A1A">
                +234 123 - 4567 - 890
              </Typography>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <HiOutlineEnvelope size={20} className="text-[#1A1A1A80]" />
            <div>
              <Typography fontSize={14} color="#1A1A1A80">
                Email
              </Typography>
              <Typography fontSize={15} color="#1A1A1A">
                contact@greenvalleycenter.com
              </Typography>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col justify-between">
          {/* Status Badge */}
          <div className="flex justify-end">
            <div className="bg-[#0088FF1A] text-[#0088FF] px-3 py-1 rounded-lg text-sm">
              Active
            </div>
          </div>

          <div className="">
            {/* Operating Hours */}
            <div className="flex">
              <HiOutlineClock size={20} className="text-[#1A1A1A80]" />
              <div>
                <Typography fontSize={14} color="#1A1A1A80">
                  Operating Hours
                </Typography>
                <Typography fontSize={15} color="#1A1A1A">
                  Mon–Fri: 8:00 AM – 6:00 PM
                </Typography>
                <Typography fontSize={15} color="#1A1A1A">
                  Saturday: 9:00 AM – 4:00 PM
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility_details;
