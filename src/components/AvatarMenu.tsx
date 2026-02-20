import user from "../assets/user.png";

const AvatarMenu = () => {
  return (
    <div className="bg-linear-to-b from-[#005C3D] to-[#00C281] py-2 px-3 rounded-[30px] flex items-center">
      <img src={user} width={28} height={28} />
    </div>
  );
};

export default AvatarMenu;
