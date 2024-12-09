import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ConfirmationModal = ({ isOpen, onClose, title, content, confirmButton }) => {

    const { logout } = useAuth();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{content}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        {confirmButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;