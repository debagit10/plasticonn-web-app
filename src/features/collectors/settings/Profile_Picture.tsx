import { Typography } from "@mui/material";
import profile from "../../../assets/avatar.png";

const Profile_Picture = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[18px] p-9 shadow-[0_2px_6px_#1A1A1A26] flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <Typography fontWeight={400} fontSize={28} color="#1A1A1A">
          Profile Picture
        </Typography>
        <Typography fontWeight={300} fontSize={24} color="#1A1A1A80">
          Update your profile photo
        </Typography>
      </div>

      <div className="flex items-center gap-4.5">
        <div className="w-37.5 h-37.5 rounded-full justify-center flex items-center p-2.5 bg-[#00C2811A]">
          <img src={profile} />
        </div>

        <div className="flex flex-col gap-9">
          <Typography color="#1A1A1A80" fontSize={24} fontWeight={400}>
            JPG, GIF or PNG. Max size of 2MB
          </Typography>

          <div className="flex gap-6.5">
            <div className="text-[#1A1A1A80] bg-[#1A1A1A0D] border-[#1A1A1A80] border rounded-xl p-2.5">
              Upload new photo
            </div>

            <div className="text-[#C61919] rounded-xl p-2.5">Remove</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Picture;
