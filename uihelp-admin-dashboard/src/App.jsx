import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ViewMap from './pages/ViewMap';
import ReportsStatistic from './pages/ReportsStatistic';
import ManageReports from './pages/ManageReports';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import Register from './pages/Register'; 
import { AuthProvider, useAuth } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Tambahkan route untuk Register */}
          <Route path="*" element={<ProtectedLayout />} /> {/* Semua page kecuali login/register */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Layout untuk halaman setelah login
const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect ke login jika belum login
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-10 lg:ml-0">
        <Routes>
          <Route path="/view-map" element={<ViewMap />} />
          <Route path="/statistics" element={<ReportsStatistic />} />
          <Route path="/manage-reports" element={<ManageReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
