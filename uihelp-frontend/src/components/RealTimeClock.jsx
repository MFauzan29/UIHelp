import React, { useEffect, useState } from "react";

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
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 1000,
            }}
            className=""
        >
            {time.toLocaleTimeString()}
        </div>
    );
}

export default RealTimeClock;
