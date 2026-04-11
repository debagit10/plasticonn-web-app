import { Typography } from "@mui/material";
import profile from "../../../assets/avatar.png";

const Profile_Picture = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
      {" "}
      <div className="flex flex-col gap-2">
        <Typography fontWeight={400} fontSize={28} color="#1A1A1A">
          Profile Picture
        </Typography>
        <Typography fontWeight={300} fontSize={24} color="#1A1A1A80">
          Update your profile photo
        </Typography>
      </div>
      <div className="flex items-center gap-4.5">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-37.5 lg:h-37.5 rounded-full flex items-center justify-center p-2 bg-[#00C2811A]">
          <img
            src={profile}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          {" "}
          <Typography color="#1A1A1A80" fontSize={24} fontWeight={400}>
            JPG, GIF or PNG. Max size of 2MB
          </Typography>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="text-[#1A1A1A80] bg-[#1A1A1A0D] border rounded-xl p-2.5 text-center">
              Upload new photo
            </div>

            <div className="text-[#C61919] rounded-xl p-2.5 text-center">
              Remove
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Picture;
