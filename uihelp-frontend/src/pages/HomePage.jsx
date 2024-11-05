import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as L from "leaflet";

const getXmlString = () => {
  return `<osm version="0.6" generator="openstreetmap-cgimap 2.0.1 (2051430 spike-08.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
<way id="401969868" visible="true" version="11" changeset="146564185" timestamp="2024-01-22T18:05:22Z" user="Farras" uid="136807">
<nd ref="4043765377"/>
<nd ref="8682054580"/>
<nd ref="8682054597"/>
<nd ref="8682054581"/>
<nd ref="8682054582"/>
<nd ref="8682054583"/>
<nd ref="8682054584"/>
<nd ref="8682054585"/>
<nd ref="8682054586"/>
<nd ref="8682054587"/>
<nd ref="8682054588"/>
<nd ref="8682054589"/>
<nd ref="8682054590"/>
<nd ref="8682054591"/>
<nd ref="8682054592"/>
<nd ref="8682054593"/>
<nd ref="8682054579"/>
<nd ref="8682054578"/>
<nd ref="8682054577"/>
<nd ref="9001064904"/>
<nd ref="9001064905"/>
<nd ref="9001064906"/>
<nd ref="7953564740"/>
<nd ref="7953564726"/>
<nd ref="7953564727"/>
<nd ref="1340723552"/>
<nd ref="1340723557"/>
<nd ref="1340723566"/>
<nd ref="1340723577"/>
<nd ref="1340723568"/>
<nd ref="9001064907"/>
<nd ref="9001064908"/>
<nd ref="8682054594"/>
<nd ref="8682054545"/>
<nd ref="8682054547"/>
<nd ref="8682054596"/>
<nd ref="5006589198"/>
<nd ref="8682054598"/>
<nd ref="8682054599"/>
<nd ref="8682054600"/>
<nd ref="4043765374"/>
<nd ref="8682054603"/>
<nd ref="8682054604"/>
<nd ref="2975838074"/>
<nd ref="8682054602"/>
<nd ref="8682054601"/>
<nd ref="8682054605"/>
<nd ref="2975832612"/>
<nd ref="5006575188"/>
<nd ref="6869569998"/>
<nd ref="8682054606"/>
<nd ref="8682054607"/>
<nd ref="5006561068"/>
<nd ref="5006561053"/>
<nd ref="8682054608"/>
<nd ref="8682054609"/>
<nd ref="4319854733"/>
<nd ref="4043765345"/>
<nd ref="4319854732"/>
<nd ref="8682054610"/>
<nd ref="8682054611"/>
<nd ref="4043765348"/>
<nd ref="8682054612"/>
<nd ref="8682054614"/>
<nd ref="8682054613"/>
<nd ref="4043765349"/>
<nd ref="8682054615"/>
<nd ref="8682054616"/>
<nd ref="4043765350"/>
<nd ref="4043765353"/>
<nd ref="4043765355"/>
<nd ref="8682061217"/>
<nd ref="4043765347"/>
<nd ref="8682061221"/>
<nd ref="8682061220"/>
<nd ref="8682061219"/>
<nd ref="8682061218"/>
<nd ref="4043826543"/>
<nd ref="4043765346"/>
<nd ref="4043765352"/>
<nd ref="4043765354"/>
<nd ref="4043765356"/>
<nd ref="4043765358"/>
<nd ref="4043765359"/>
<nd ref="4043765360"/>
<nd ref="4043765361"/>
<nd ref="4043765362"/>
<nd ref="4043765363"/>
<nd ref="4043765364"/>
<nd ref="4043765365"/>
<nd ref="8682061222"/>
<nd ref="8682061223"/>
<nd ref="4043765366"/>
<nd ref="4043765367"/>
<nd ref="8682061224"/>
<nd ref="4043765368"/>
<nd ref="4043765369"/>
<nd ref="8682061225"/>
<nd ref="4043765370"/>
<nd ref="4043765372"/>
<nd ref="4043765371"/>
<nd ref="4043765373"/>
<nd ref="4043765375"/>
<nd ref="11540594432"/>
<nd ref="4043765376"/>
<nd ref="8682061226"/>
<nd ref="8682061227"/>
<nd ref="8682061229"/>
<nd ref="8682061228"/>
<nd ref="4043765377"/>
<tag k="addr:city" v="Depok, West Java"/>
<tag k="addr:postcode" v="16424"/>
<tag k="addr:street" v="Jalan Prof. Dr. Sudjono D Pusponegoro"/>
<tag k="amenity" v="university"/>
<tag k="name" v="Universitas Indonesia"/>
<tag k="operator" v="Universitas Indonesia"/>
<tag k="short_name" v="UI"/>
<tag k="website" v="https://www.ui.ac.id/"/>
<tag k="wikidata" v="Q534515"/>
<tag k="wikipedia" v="id:Universitas Indonesia"/>
</way>
</osm>`;
};

function RealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        fontSize: "1.5rem",
        color: "#333",
        fontWeight: "bold",
        backgroundColor: "#FFF",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      {time.toLocaleTimeString()} {/* Format waktu sesuai keinginan */}
    </div>
  );
}

export default function HomePage() {
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Parsing data dari XML
    const parser = new DOMParser();
    const xmlString = getXmlString();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Ambil node ref dari <way>
    const ndRefs = Array.from(xmlDoc.querySelectorAll("way nd")).map((nd) =>
      nd.getAttribute("ref")
    );
    const coordinates = ndRefs.map((ref) => {
      return [-6.361043581175633, 106.82687215519378]; // Sesuaikan dengan koordinat asli dari node `ref`
    });

    setPositions(coordinates);
  }, []);

  return (
    <div className="w-auto h-dvh flex justify-center items-center bg-[#FFFBE6] gap-4 py-14 font-sans">
      <div className="space-y-2">
        <RealTimeClock />
        <button
          className="bg-red-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            toast.success("Masuk Ke Report Form");
            setTimeout(() => {
              navigate("/report-form");
            }, 2000);
          }}
        >
          Lapor Kejadian
        </button>
      </div>

      <MapContainer
        center={[-6.361043581175633, 106.82687215519378]}
        zoom={14.5}
        style={{
          width: "70%",
          maxWidth: "600px",
          height: "700px",
          borderRadius: "15px",
          overflow: "hidden",
        }}
        dragging={false} // Disable dragging
        zoomControl={false} // Disable zoom control buttons
        scrollWheelZoom={false} // Disable zooming with scroll wheel
        doubleClickZoom={false} // Disable zooming with double-click
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={positions} color="blue" />
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
