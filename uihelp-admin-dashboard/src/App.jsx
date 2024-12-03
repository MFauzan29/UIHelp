import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ViewMap from './pages/ViewMap';
import ReportsStatistic from './pages/ReportsStatistic';
import ManageReports from './pages/ManageReports';
import SideBar from './components/SideBar'; // Import Sidebar component

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar on the left */}
        <SideBar />
        
        {/* Main content area */}
        <div className="flex-1 ml-10 lg:ml-0"> {/* Adjust 'ml-64' to match the width of your sidebar */}
          <Routes>
            <Route path="/" element={<Navigate to="/view-map" />} />
            <Route path="/view-map" element={<ViewMap />} />
            <Route path="/statistics" element={<ReportsStatistic />} />
            <Route path="/manage-reports" element={<ManageReports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
