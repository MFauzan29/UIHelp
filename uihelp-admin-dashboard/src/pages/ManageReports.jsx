import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import AccidentModal from '../components/AccidentModal';

const DEFAULT_IMAGE = 'https://via.placeholder.com/150';

const ManageReports = () => {
    const [happeningAccidents, setHappeningAccidents] = useState([]);
    const [selectedAccident, setSelectedAccident] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    }, [isModalOpen]);

    const groupAccidents = (accidents) => {
        const now = dayjs();
        return {
            today: accidents.filter((acc) =>
                dayjs(acc.dateTime).isSame(now, 'day')
            ),
            last7Days: accidents.filter((acc) =>
                dayjs(acc.dateTime).isAfter(now.subtract(7, 'day')) && !dayjs(acc.dateTime).isSame(now, 'day')
            ),
            last30Days: accidents.filter((acc) =>
                dayjs(acc.dateTime).isAfter(now.subtract(30, 'day')) && dayjs(acc.dateTime).isBefore(now.subtract(7, 'day'))
            ),
            older: accidents.filter((acc) =>
                dayjs(acc.dateTime).isBefore(now.subtract(30, 'day'))
            ),
        };
    };

    const sortedAccidents = groupAccidents(
        [...happeningAccidents].sort((a, b) =>
            dayjs(b.dateTime).diff(dayjs(a.dateTime))
        )
    );

    const openModal = (accident) => {
        setSelectedAccident(accident);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAccident(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 pl-16 lg:pl-5">
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
                                {accidents.map((accident) => (
                                    <tr key={accident.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 border border-gray-300">{accident.name}</td>
                                        <td className="px-4 py-2 border border-gray-300">{accident.desc}</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {dayjs(accident.dateTime).format('DD-MM-YYYY HH:mm')}
                                        </td>
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

            {isModalOpen && selectedAccident && (
                <AccidentModal
                    accident={selectedAccident}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ManageReports;
