// server/controllers/AdminController.js
const pool = require('../db');
const bcrypt = require('bcrypt');

// Login Controller
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM admin WHERE email = $1',
            [email]
        );

        if (result.rowCount === 0) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        const admin = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        // Generate token (example using JWT)
        const jwt = require('jsonwebtoken');
        const secret = process.env.JWT_SECRET || 'defaultSecretKey';
        const token = jwt.sign({ id: admin.id, email: admin.email }, secret, {
            expiresIn: '1d', // Token valid for 1 day
        });
        console.log(token);
        

        res.status(200).json({
            message: "Login Successful",
            token,
            account: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function getCurrentUser(req, res) {
    try {
        const userId = req.user.id; // ID pengguna dari token (diatur di middleware)
        
        const result = await pool.query(
            'SELECT id, email, name FROM admin WHERE id = $1',
            [userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result.rows[0]); // Kembalikan data pengguna
    } catch (error) {
        console.error("Error in getCurrentUser:", error.message);
        res.status(500).json({ error: "An error occurred" });
    }
}


// Signup Controller
async function signup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    

    // Validasi Input Secara Manual
    if (!name || name.trim().length < 3 || name.trim().length > 50) {
        return res.status(400).json({ error: "Name must be between 3 and 50 characters" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if (!password || password.length < 8 || password.length > 100) {
        return res.status(400).json({ error: "Password must be between 8 and 100 characters" });
    }

    try {
        // Cek apakah email sudah digunakan
        const emailCheckQuery = 'SELECT COUNT(*) FROM admin WHERE email = $1';
        const emailCheck = await pool.query(emailCheckQuery, [email]);

        if (parseInt(emailCheck.rows[0].count, 10) > 0) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Masukkan admin baru ke database
        const insertAdminQuery = 'INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(insertAdminQuery, [name.trim(), email.trim(), hashedPassword]);

        const newAdmin = result.rows[0];

        // Kirim respons sukses
        res.status(201).json({
            message: "Signup successful",
            account: {
                id: newAdmin.id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
        });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function getAllAdmin(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM admin;'
        );
        if (!result.rows.length) {
            res.status(404).send("No admin found");
        } else {
            res.send(result.rows);
        }
    } catch (error) {
        console.error('Error in fetch:', error);
        res.status(500).send({
            err: error,
        });
    }
}

async function getAdminById(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM admin WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No admin found for the given admin ID" });
        }

        const admin = result.rows[0];

        res.status(200).json({ admin });
    } catch (error) {
        console.error('Error in getAdminById:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

// Logout Controller
async function logout(req, res) {
    try {
        // For token-based authentication, instruct the client to remove the token
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


module.exports = {
    login,
    getCurrentUser,
    signup,
    getAllAdmin,
    getAdminById,
    logout
};