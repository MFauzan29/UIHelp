import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                try {
                    // Validasi token dengan endpoint API, misalnya `/admin/me`
                    const response = await axios.get("http://localhost:5000/admin/me", {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });

                    console.log("data from token check: ", response.data);
                    

                    setIsAuthenticated(true);
                    setUser(response.data); // Set user data
                } catch (error) {
                    console.error("Token validation failed:", error.message);
                    localStorage.removeItem("authToken"); // Bersihkan token jika tidak valid
                }
            }
        };

        checkAuth();
    }, []);


    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/admin/login", {
                email,
                password,
            });

            const { token, account } = response.data;
            localStorage.setItem("authToken", token); // Save token to localStorage
            setIsAuthenticated(true);
            setUser(account);
            console.log("ppp", token);
            
        } catch (error) {
            console.error("Login failed:", error.response?.data?.error || error.message);
            throw error; // Rethrow for error handling in Login component
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/admin/logout");
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.error || error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
