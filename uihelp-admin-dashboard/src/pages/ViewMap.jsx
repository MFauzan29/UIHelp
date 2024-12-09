import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import dayjs from 'dayjs';


// asset imports
import firelogo from "../assets/accidents/firelogo.png";
import floodlogo from "../assets/accidents/floodlogo.png";
import animallogo from "../assets/accidents/animallogo.png";
import crashlogo from "../assets/accidents/crashlogo.png";
import fallentree from "../assets/accidents/fallentree.png";
import brokencar from "../assets/accidents/brokencar.png";
import criminal from "../assets/accidents/criminal.png";
import health from "../assets/accidents/health.png";

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

    const [happeningAccidents, setHappeningAccidents] = useState([]);

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
                                    <p className={`text-sm font-semibold ${accident.status === "In Progress" ? "text-yellow-500" :
                                        accident.status === "Handled" ? "text-green-500" :
                                            accident.status === "Pending" ? "text-red-500" : ""}`}>{accident.status}</p>
                                </div>
                                <p className="font-normal text-sm">{accident.desc}</p>
                                <img src={accident.img} alt="" />
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
