import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Import gambar
import firelogo from "../assets/fire.jpg";
import floodlogo from "../assets/flood.png";
import animallogo from "../assets/wildanimal.png";
import crashlogo from "../assets/crash.png";
import fallentree from "../assets/fallentree.png";
import brokencar from "../assets/brokencar.jpg";
import criminal from "../assets/criminal.png";
import health from "../assets/health.png";
import kebakaran_ex from '../assets/kebarakan-ex.jpg';
import kecelakaan_ex from '../assets/kecelakaan-ex.jpg';

const ViewMap = () => {
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

    const happeningAccidents = [
        {
            name: "Kebakaran",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "10-12-2024 10:20",
            status: "In Process",
            lat: -6.361,
            lng: 106.826,
            img: kebakaran_ex
        },
        {
            name: "Laka Lantas",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "10-12-2024 10:20",
            status: "Pending",
            lat: -6.362,
            lng: 106.827,
            img: kecelakaan_ex
        },
        {
            name: "Binatang Buas",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "10-12-2024 10:20",
            status: "In Process",
            lat: -6.363,
            lng: 106.828,
            img: kebakaran_ex
        },
        {
            name: "Darurat Kesehatan",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "10-12-2024 10:20",
            status: "Handled",
            lat: -6.363,
            lng: 106.824,
            img: kebakaran_ex
        },
    ];

    // Create icon function for regular and selected markers
    const createIcon = (accidentName) => {
        let iconUrl;

        // Map accident name to the appropriate icon image
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
                iconUrl = firelogo; // Default to fire logo if no match
        }

        return new L.Icon({
            iconUrl,
            iconSize: [30, 30], // Adjust size if necessary
        });
    };

    return (
        <div className="w-full h-screen">
            {/* Map */}
            <MapContainer
                center={[-6.361043581175633, 106.82687215519378]}
                zoom={14.5}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px",
                    overflow: "hidden",
                    zIndex: 0,
                }}
                dragging={true}
                zoomControl={true}
                scrollWheelZoom={true}
                doubleClickZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Dynamic Markers */}
                {happeningAccidents.map((accident, i) => (
                    <Marker
                        key={i}
                        position={[accident.lat, accident.lng]}
                        icon={createIcon(accident.name)} // Use the dynamic icon based on accident name
                    >
                        <Popup>
                            <div className="w-full">
                                <div className="w-full flex justify-between items-center">
                                    <p className="font-semibold text-xl">{accident.name}</p>
                                    <p
                                        className={`text-sm font-semibold ${accident.status === "In Process"
                                                ? "text-yellow-500"
                                                : accident.status === "Handled"
                                                    ? "text-green-500"
                                                    : accident.status === "Pending"
                                                        ? "text-red-500"
                                                        : ""
                                            }`}
                                    >
                                        {accident.status}
                                    </p>
                                </div>
                                <p className="font-normal text-sm">{accident.desc}</p>
                                <img src={accident.img} alt={accident.name} />
                                <div className="w-full flex items-center gap-2 mt-2">
                                    <p>Reported at:</p>
                                    <p className="font-normal">{accident.dateTime}</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ViewMap;
