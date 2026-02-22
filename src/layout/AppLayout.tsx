import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F1F1F1] pt-5">
        <Outlet />
      </main>
    </>
  );
}
