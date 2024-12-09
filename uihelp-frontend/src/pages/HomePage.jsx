import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import * as L from "leaflet";
import dayjs from "dayjs";

import RealTimeClock from "../components/RealTimeClock";
import ReportButton from "../components/ReportButton";

// asset imports
import firelogo from "../assets/accidents/firelogo.png";
import floodlogo from "../assets/accidents/floodlogo.png";
import animallogo from "../assets/accidents/animallogo.png";
import crashlogo from "../assets/accidents/crashlogo.png";
import fallentree from "../assets/accidents/fallentree.png";
import brokencar from "../assets/accidents/brokencar.png";
import criminal from "../assets/accidents/criminal.png";
import health from "../assets/accidents/health.png";
import arrow from '../assets/arrow.svg'

Modal.setAppElement("#root");

export default function HomePage() {

  // accidents data
  const [happeningAccidents, setHappeningAccidents] = useState([])

  const accidents = [
    { name: "Kebakaran", img: firelogo },
    { name: "Banjir", img: floodlogo },
    { name: "Binatang Buas", img: animallogo },
    { name: "Laka Lantas", img: crashlogo },
    { name: "Pohon Tumbang", img: fallentree },
    { name: "Kendaraan Rusak", img: brokencar },
    { name: "Pencurian", img: criminal },
    { name: "Darurat Kesehatan", img: health }
  ];

  useEffect(() => {
    // Fetch data from the API when the component is mounted
    const fetchAccidents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/report/");
        const data = response.data;
        const formattedData = data.map((item) => ({
          name: item.types,
          desc: item.detail,
          dateTime: dayjs(item.created_at).format("DD:MM:YYYY HH:mm"),
          status: item.status,
          lat: parseFloat(item.location.split(",")[0]), // Convert lat from string to float
          lng: parseFloat(item.location.split(",")[1]), // Convert lng from string to float
          img: item.picture, // Placeholder image (update as needed)
        }));
        setHappeningAccidents(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAccidents();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for controlling sidebar visibility
  const [selectedAccident, setSelectedAccident] = useState(null); // State for selected accident
  const navigate = useNavigate();

  const handleMouseEnter = (temp) => setHovered(temp);
  const handleMouseLeave = () => setHovered(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle accident card click
  const handleAccidentClick = (accident) => {
    setSelectedAccident(accident); // Update selected accident
  };

  // Create icon function for regular and selected markers
  const createIcon = (accidentName) => {
    let iconUrl;
    let iconSize = [30, 30]; // Default size

    if (selectedAccident && selectedAccident.name === accidentName) {
      iconSize = [50, 50]; // Set to a larger size when selected
    }

    switch (accidentName) {
      case "Kebakaran":
        iconUrl = firelogo;
        break;
      case "Banjir":
        iconUrl = floodlogo;
        break;
      case "Binatang Buas":
        iconUrl = animallogo;
        break;
      case "Laka Lantas":
        iconUrl = crashlogo;
        break;
      case "Pohon Tumbang":
        iconUrl = fallentree;
        break;
      case "Kendaraan Rusak":
        iconUrl = brokencar;
        break;
      case "Pencurian":
        iconUrl = criminal;
        break;
      case "Darurat Kesehatan":
        iconUrl = health;
        break;
      default:
        iconUrl = firelogo;
    }

    return new L.Icon({
      iconUrl,
      iconSize, // Use the dynamic size based on selection
    });
  };

  // Define UI bounds
  const bounds = [
    [-6.3725, 106.8168], // Southwest corner (UI lower-left)
    [-6.3515, 106.8355], // Northeast corner (UI upper-right)
  ];

  return (
    <div className="relative w-auto h-screen flex justify-center items-center bg-[#FFFBE6] font-sans">
      <RealTimeClock />
      <ReportButton onClick={openModal} />

      <div className={`absolute top-20 left-3 z-10 shadow-lg bg-white rounded-xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[26rem]' : 'w-56'}`}>
        <div className="flex justify-between items-center">
          <p className={`ml-5 py-2 font-semibold text-xl w-full border-b-2 ${sidebarOpen ? 'block' : 'block'}`}>Daftar Insiden</p>
          <img
            src={arrow}
            className={`${sidebarOpen ? 'rotate-180' : 'rotate-0'} cursor-pointer transition-transform duration-500 ease-in-out`}
            alt=""
            onClick={toggleSidebar}
          />
        </div>

        <div className={`w-full max-h-[26rem] overflow-scroll ${sidebarOpen ? '' : 'hidden'}`}>
          {
            !happeningAccidents ?
              <div className="text-base font-medium italic p-2 text-slate-500">No accidents occurred </div>
              :
              happeningAccidents.map((accident, i) => (
                <div key={i} className="w-full h-26 border-b py-2 px-5 flex justify-between items-center gap-2 cursor-pointer" onClick={() => handleAccidentClick(accident)}>
                  <div className="foto-kejadian w-2/5 h-20 rounded-md overflow-hidden">
                    <img src={accident.img} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="w-3/5 h-full py-2 pl-3 flex flex-col items-start">
                    <div className="w-full flex justify-between">
                      <p className="font-semibold text-base">{accident.name}</p>
                      <p className={`font-normal text-xs ${accident.status === "In Progress" ? "text-yellow-500" :
                        accident.status === "Handled" ? "text-green-500" :
                          accident.status === "Pending" ? "text-red-500" : ""}`}>{accident.status}</p>
                    </div>

                    <p alt={accident.desc} className="text-xs text-slate-500 font-normal italic overflow-hidden text-ellipsis text-justify">
                      {accident.desc}
                    </p>
                    <div className="w-full flex justify-end font-normal text-[0.7rem] mt-2">
                      {accident.dateTime}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
        }}
      >
        <h2 className="text-center font-bold py-3">Report Your Incident</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {accidents.map((accident, i) => (
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(accident.name)}
              onMouseLeave={handleMouseLeave}
              key={i}
            >
              <img
                src={accident.img}
                alt={accident.name + "Accident"}
                className="rounded-full w-20 h-20 object-cover border-2 border-black transition-transform duration-300 ease-in-out transform hover:scale-125"
                onClick={() => {
                  toast.success("Masuk Ke Report Form");
                  setTimeout(() => {
                    navigate("/report-form", { state: { accidentName: accident.name } });
                  }, 2000);
                }}
              />
              {hovered === accident.name && (
                <div
                  className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-70 bg-black rounded-full px-1"
                  style={{ pointerEvents: "none" }}
                >
                  <p className="text-white text-center">{accident.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-red-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Map */}
      <MapContainer
        center={[-6.361043581175633, 106.82687215519378]}
        zoom={14.5}
        maxBounds={bounds}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          zIndex: 0,
        }}
        dragging={true} // Aktifkan dragging
        zoomControl={true} // Aktifkan kontrol zoom
        scrollWheelZoom={true} // Aktifkan zoom dengan scroll
        doubleClickZoom={true} // Aktifkan zoom dengan double click
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Static Markers */}
        {happeningAccidents.map((accident, i) => (
          <Marker
            key={i}
            position={[accident.lat, accident.lng]}
            icon={createIcon(accident.name)} // Use the dynamic icon size
          >
            <Popup>
              <div className="w-full">
                <div className="w-full flex justify-between items-center">
                  <p className="font-semibold text-xl">{accident.name}</p>
                  <p className={`text-sm font-semibold ${accident.status === "In Progress" ? "text-yellow-500" :
                    accident.status === "Handled" ? "text-green-500" :
                      accident.status === "Pending" ? "text-red-500" : ""}`}>{accident.status}</p>
                </div>
                <p className="font-normal text-sm">{accident.desc}</p>
                <div className="w-72 object-cover">
                  <img src={accident.img} alt="" />
                </div>
                <div className="w-full flex items-center gap-2 mt-2">
                  <p>Reported at:</p>
                  <p className="font-normal">{accident.dateTime}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
