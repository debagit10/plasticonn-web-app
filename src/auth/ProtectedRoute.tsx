import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

export default function ProtectedRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    window.location.replace("/");
  }

  return <Outlet />;
}
