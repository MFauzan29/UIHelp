import React from "react";

const ReportButton = ({ onClick }) => {
    return (
        <button
            className="absolute z-10 bottom-5 left-3 bg-red-600 hover:bg-orange-800 text-white text-xl font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outlin"
            onClick={onClick}
        >
            Report Accident
        </button>
    );
};

export default ReportButton;
