import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import axios from "axios";
import dayjs from "dayjs";

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ReportsStatistic = () => {

    const accidents = [
        "Kebakaran",
        "Banjir",
        "Binatang Buas",
        "Laka Lantas",
        "Pohon Tumbang",
        "Kendaraan Rusak",
        "Pencurian",
        "Darurat Kesehatan",
    ];

    const [happeningAccidents, setHappeningAccidents] = useState([]);

    useEffect(() => {
        const fetchAccidents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/report/');
                const data = response.data;

                const formattedData = data.map((item) => ({
                    id: item.id,
                    name: item.types,
                    desc: item.detail,
                    dateTime: dayjs(item.created_at).toISOString(),
                    status: item.status,
                    lat: parseFloat(item.location.split(',')[0]),
                    lng: parseFloat(item.location.split(',')[1]),
                    img: item.picture || DEFAULT_IMAGE,
                }));

                setHappeningAccidents(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAccidents();
    }, []);

    // Menghitung jumlah setiap jenis kecelakaan
    const accidentCounts = accidents.map(
        (type) => happeningAccidents.filter((accident) => accident.name === type).length
    );

    // Menghitung jumlah status
    const statusCounts = ["Pending", "In Process", "Handled"].map(
        (status) => happeningAccidents.filter((accident) => accident.status === status).length
    );

    // Persentase handled
    const handledPercentage = (
        (statusCounts[2] / happeningAccidents.length) *
        100
    ).toFixed(2);

    // Data untuk diagram lingkaran (Jenis Kecelakaan)
    const doughnutData = {
        labels: accidents,
        datasets: [
            {
                data: accidentCounts,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#66BB6A",
                    "#EF5350",
                ],
            },
        ],
    };

    // Data untuk diagram lingkaran (Status)
    const statusDoughnutData = {
        labels: ["Pending", "In Process", "Handled"],
        datasets: [
            {
                data: statusCounts,
                backgroundColor: ["#FF6384", "#FFCE56", "#66BB6A"],
            },
        ],
    };

    // Data untuk diagram batang
    const barData = {
        labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ],
        datasets: [
            {
                label: "Jumlah Kecelakaan",
                data: Array(12)
                    .fill(0)
                    .map((_, i) =>
                        happeningAccidents.filter(
                            (accident) => new Date(accident.dateTime).getMonth() === i
                        ).length
                    ),
                backgroundColor: "#36A2EB",
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Reports Statistic</h1>

            {/* Diagram Lingkaran: Jenis Kecelakaan */}
            <div className="mb-12">
                <div className="w-full flex justify-start items-center gap-2">
                    <h2 className="text-2xl font-semibold">Persentase Jenis Kecelakaan</h2>
                    <p className="italic font-semibold text-slate-500">(per 2024)</p>
                </div>

                <div className="max-w-sm mx-auto">
                    <Doughnut data={doughnutData} />
                </div>
            </div>

            {/* Diagram Lingkaran: Status Reports */}
            <div className="mb-12">
                <div className="w-full flex justify-start items-center gap-2">
                    <h2 className="text-2xl font-semibold">Persentase Status Reports</h2>
                    <p className="italic font-semibold text-slate-500">(Pending, In Process, Handled)</p>
                </div>

                <div className="max-w-sm mx-auto">
                    <Doughnut data={statusDoughnutData} />
                </div>
            </div>

            {/* Persentase Handled */}
            <div className="mb-20">
                <h2 className="text-lg font-semibold">Persentase Keberhasilan</h2>
                <p className="text-xl font-bold text-green-600">{handledPercentage}%</p>
            </div>

            {/* Diagram Batang: Kecelakaan per Bulan */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Peningkatan Kecelakaan per Bulan</h2>
                <div className="max-w-2xl mx-auto">
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportsStatistic;
