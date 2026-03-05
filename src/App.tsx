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
        setUser(res.data.data.collector);
      } catch (err) {
        clearUser();
      } finally {
        setInitialized(true);
      }
    };

    fetchProfile();
  }, [setUser, clearUser]);

  if (!initialized) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
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
