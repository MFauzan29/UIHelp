import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Atur ikon default Leaflet agar marker muncul
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const UserLocationMap = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Mendapatkan lokasi pengguna
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });

                        // Reverse geocoding untuk mendapatkan alamat
                        try {
                            const response = await axios.get(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                            );
                            setAddress(response.data.address);
                        } catch (err) {
                            console.error("Error fetching address:", err);
                            setError("Gagal mendapatkan detail lokasi.");
                        }
                    },
                    (err) => {
                        setError("Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.");
                        console.error(err);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            } else {
                setError("Browser Anda tidak mendukung Geolocation API.");
            }
        };

        fetchLocation();
    }, []);

    return (
        <div className="w-full h-80 bg-gray-200 border rounded-lg flex flex-col justify-center items-center">
            {userLocation ? (
                <MapContainer
                    center={[userLocation.latitude, userLocation.longitude]}
                    zoom={15}
                    style={{ width: "100%", height: "100%" }}
                >
                    {/* Lapisan Peta OpenStreetMap */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Marker Lokasi Pengguna */}
                    <Marker position={[userLocation.latitude, userLocation.longitude]}>
                        <Popup>
                            Anda berada di sini: <br />
                            Lat: {userLocation.latitude.toFixed(5)}, Lng:{" "}
                            {userLocation.longitude.toFixed(5)} <br />
                            {address ? (
                                <>
                                    <b>Alamat:</b> {`${address.road || "Jalan tidak diketahui"}, ${address.city || address.village || "Kota tidak diketahui"}, ${address.state || "Provinsi tidak diketahui"}, ${address.country || "Negara tidak diketahui"}`}
                                </>
                            ) : (
                                <p>Memuat detail lokasi...</p>
                            )}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
            ) : (
                <p className="text-gray-600 text-sm">Memuat lokasi Anda...</p>
            )}
        </div>
    );
};

export default UserLocationMap;
