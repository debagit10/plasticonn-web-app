import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";
import api from "./utils/axiosInstance";
import { useAuthStore } from "./utils/useAuth";
const DashboardPage = React.lazy(() => import("./pages/Dashboard"));
const SettingsPage = React.lazy(() => import("./pages/Settings"));
const SignIn = React.lazy(() => import("./pages/auth/SignIn"));
const SignUp = React.lazy(() => import("./pages/auth/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));

function App() {
  const { setUser, clearUser, initUser } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      clearUser();
      setInitialized(true);
      return;
    }

    const parsed = JSON.parse(stored);

    initUser(parsed);

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/${parsed.role}/profile/${parsed.id}`);
        if (parsed.role === "collector") {
          setUser(res.data.data.collector);
        }

        if (parsed.role === "center") {
          setUser(res.data.data.center);
        }
      } catch (err) {
        clearUser();
      } finally {
        setInitialized(true);
      }
    };

    fetchProfile();
  }, [setUser, clearUser]);

  if (!initialized)
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/logo.png"
          alt="Plasticonn logo"
          className="
          w-30 h-30 
          animate-spin
          [animation-duration:4s]
          hover:animate-none opacity-60
        "
        />
      </div>
    );

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/join" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
