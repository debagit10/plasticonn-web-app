import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import React from "react";
import ProtectedRoute from "./auth/ProtectedRoute";
const DashboardPage = React.lazy(() => import("./pages/Dashboard"));
const SettingsPage = React.lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Routes>
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
