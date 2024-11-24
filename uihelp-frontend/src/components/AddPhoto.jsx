import React, { useRef } from "react";
import Webcam from "react-webcam";
import close from "../assets/close.png";

const AddPhoto = ({ onClose, onCapture }) => {
    const webcamRef = useRef(null);

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // Kirim foto yang diambil ke ReportForm
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onCapture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className="absolute bg-black bg-opacity-50 w-full min-h-screen flex justify-center items-center">
            <div className="relative w-4/5 lg:w-1/2 h-fit flex-col justify-center items-center bg-white p-10 rounded-lg shadow-xl">
                <img
                    src={close}
                    className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
                    onClick={onClose}
                    alt="Close"
                />
                <div className="border border-black w-full h-96 rounded-xl mb-2 flex justify-center items-center">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full rounded-xl"
                    />
                </div>
                <div className="w-full h-fit flex flex-col justify-center px-4 gap-5">
                    <button
                        onClick={capturePhoto}
                        className="bg-[#ff4b4b] text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-400 hover:bg-[#e04343] transition duration-300"
                    >
                        Capture
                    </button>
                    <label
                        className="bg-cyan-600 text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-400 transition duration-300 text-center cursor-pointer"
                    >
                        Choose from device
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AddPhoto;