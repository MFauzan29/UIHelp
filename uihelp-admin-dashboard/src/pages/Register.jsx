import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        console.log(name, email, password);
        
        try {
            await axios.post("http://localhost:5000/admin/signup", {
                name,
                email,
                password,
            });
            setSuccess(true); // Display success message
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-xl font-bold mb-4">Signup</h1>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Signup successful! Redirecting to login...</p>}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Register;
