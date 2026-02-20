import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import React from "react";
// import ProtectedRoute from "./auth/ProtectedRoute";
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));

function App() {
  return (
    <Routes>
      {/* <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route> */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
