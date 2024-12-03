import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccidentModal = ({ accident, onClose, onUpdateList }) => {
    const [status, setStatus] = useState(accident.status);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    console.log("status report", accident.status);
    useEffect(() => {
        console.log("status yang diupdate: ", status);
    }, [status])
    
    

    const updateAccident = async () => {
        setIsUpdating(true);
        
        
        try {
            const response = await axios.put(
                `http://localhost:5000/report/${accident.id}/update`,
                {status}
            );
            onUpdateList((prev) =>
                prev.map((item) =>
                    item.id === accident.id ? response.data : item
                )
            );
            onClose();
        } catch (error) {
            console.error('Error updating report:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteAccident = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:5000/report/${accident.id}/delete`, {
                data: { id: accident.id },
            });
            onUpdateList((prev) => prev.filter((item) => item.id !== accident.id));
            onClose();
        } catch (error) {
            console.error('Error deleting report:', error);
        } finally {
            setIsDeleting(false);
        }
    };

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
                    <p>
                        <strong>Name:</strong> {accident.name}
                    </p>
                    <p>
                        <strong>Description:</strong> {accident.desc}
                    </p>
                    <p>
                        <strong>Date/Time:</strong> {new Date(accident.dateTime).toLocaleString()}
                    </p>
                    <p>
                        <strong>Coordinates:</strong> {`Lat: ${accident.lat}, Lng: ${accident.lng}`}
                    </p>
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
                        <option value="In Progress">In Progress</option>
                        <option value="Handled">Handled</option>
                    </select>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end">
                    {/* Tombol Update */}
                    <button
                        onClick={updateAccident}
                        disabled={isUpdating}
                        className={`${
                            isUpdating ? "bg-green-300" : "bg-green-500"
                        } text-white px-4 py-2 rounded mr-2`}
                    >
                        {isUpdating ? "Updating..." : "Save Changes"}
                    </button>

                    {/* Tombol Delete */}
                    <button
                        onClick={deleteAccident}
                        disabled={isDeleting}
                        className={`${
                            isDeleting ? "bg-red-300" : "bg-red-500"
                        } text-white px-4 py-2 rounded mr-2`}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>

                    {/* Tombol Close */}
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
