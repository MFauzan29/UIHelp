import React, { useState } from 'react';

const AccidentModal = ({ accident, onClose, onDelete }) => {
    const [status, setStatus] = useState(accident.status);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-md w-1/2">
                <h2 className="text-xl font-bold mb-4">Edit Accident</h2>

                {/* Gambar */}
                <div className="mb-4 flex justify-center">
                    <img
                        src={accident.img}
                        alt={accident.name}
                        className="w-48 h-48 object-cover rounded-md"
                    />
                </div>

                {/* Detail Informasi */}
                <div className="mb-4">
                    <p><strong>Name:</strong> {accident.name}</p>
                    <p><strong>Description:</strong> {accident.desc}</p>
                    <p><strong>Date/Time:</strong> {accident.dateTime}</p>
                    <p><strong>Coordinates:</strong> {`Lat: ${accident.lat}, Lng: ${accident.lng}`}</p>
                </div>

                {/* Dropdown Status */}
                <div className="mb-4">
                    <label htmlFor="status" className="block font-semibold mb-2">
                        Status:
                    </label>
                    <select
                        id="status"
                        className="border px-4 py-2 w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Process">In Process</option>
                        <option value="Handled">Handled</option>
                    </select>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end">
                    <button
                        onClick={() => onDelete(accident)}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccidentModal;
