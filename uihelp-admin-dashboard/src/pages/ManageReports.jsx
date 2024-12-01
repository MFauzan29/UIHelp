import React, { useState } from 'react';
import AccidentModal from '../components/AccidentModal';

// import assets
import kebakaran_ex from '../assets/kebarakan-ex.jpg';
import kecelakaan_ex from '../assets/kecelakaan-ex.jpg';

const ManageReports = () => {
    const happeningAccidents = [
        {
            name: "Kebakaran",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "2024-12-11 10:20",
            status: "In Process",
            lat: -6.361,
            lng: 106.826,
            img: kebakaran_ex,
        },
        {
            name: "Laka Lantas",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "2024-12-10 10:20",
            status: "Pending",
            lat: -6.362,
            lng: 106.827,
            img: kecelakaan_ex,
        },
        {
            name: "Binatang Buas",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "2024-12-10 10:20",
            status: "In Process",
            lat: -6.363,
            lng: 106.828,
            img: kebakaran_ex,
        },
        {
            name: "Darurat Kesehatan",
            desc: "Semuanya begitu cepat. Tidak ada korban jiwa, namun ada beberapa kerusakan bangunan",
            dateTime: "2024-11-01 10:20",
            status: "Handled",
            lat: -6.363,
            lng: 106.824,
            img: kebakaran_ex,
        },
    ];

    const [selectedAccident, setSelectedAccident] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const groupAccidents = (accidents) => {
        const now = new Date();
        return {
            today: accidents.filter((acc) =>
                new Date(acc.dateTime).toDateString() === now.toDateString()
            ),
            last7Days: accidents.filter((acc) => {
                const accDate = new Date(acc.dateTime);
                return accDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) && accDate.toDateString() !== now.toDateString();
            }),
            last30Days: accidents.filter((acc) => {
                const accDate = new Date(acc.dateTime);
                return accDate > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) && accDate <= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            }),
            older: accidents.filter((acc) => {
                const accDate = new Date(acc.dateTime);
                return accDate <= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            }),
        };
    };

    const sortedAccidents = groupAccidents(
        [...happeningAccidents].sort(
            (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        )
    );

    const openModal = (accident) => {
        setSelectedAccident(accident);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 pl-16 lg:pl-0">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Manage Accidents</h1>

            {Object.entries(sortedAccidents).map(([key, accidents]) => (
                <div key={key} className="mb-6">
                    <h2 className="text-lg font-semibold mb-2 capitalize">{key}</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-100 border-b">
                                    <th className="px-4 py-2 border border-gray-300">Name</th>
                                    <th className="px-4 py-2 border border-gray-300">Description</th>
                                    <th className="px-4 py-2 border border-gray-300">Date/Time</th>
                                    <th className="px-4 py-2 border border-gray-300">Status</th>
                                    <th className="px-4 py-2 border border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accidents.map((accident, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{accident.name}</td>
                                        <td className="px-4 py-2 border border-gray-300">{accident.desc}</td>
                                        <td className="px-4 py-2 border border-gray-300">{accident.dateTime}</td>
                                        <td className="px-4 py-2 border border-gray-300">{accident.status}</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <button
                                                onClick={() => openModal(accident)}
                                                className="text-blue-500 underline hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <AccidentModal
                    accident={selectedAccident}
                    onClose={() => setIsModalOpen(false)}
                    onDelete={(accident) => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default ManageReports;
