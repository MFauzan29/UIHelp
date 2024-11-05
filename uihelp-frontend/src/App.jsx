import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReportForm from "./pages/ReportForm";
import HomePage from "./pages/HomePage";
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report-form" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
