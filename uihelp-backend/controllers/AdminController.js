// server/controllers/AdminController.js
const pool = require('../db').default;
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM admin WHERE email = $1',
            [email]
        );

        if (result.rowCount === 0) {
            return res.status(401).json({ error: "Incorrect email or password provided" });
        }

        var admin = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect password provided" });
        }

        // Generate and return a token or set a session cookie here

        res.status(200).json({ message: "Login Successful", account: admin });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function signup(req, res) {
    const { name, email, password } = req.body;
    // Dapatkan nama file dari file yang diunggah

    try {
        const emailCheck = await pool.query('SELECT COUNT(*) FROM admin WHERE email = $1', [email]);

        if (emailCheck.rows[0].count > 0) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        //const adminCount = await pool.query('SELECT COUNT(*) FROM admin');

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        const newAdmin = result.rows[0];
        res.status(201).json(newAdmin);
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

async function logout(req, res) {
    try {
        // Clear the session or remove the authentication token
        // This will effectively log the user out
        req.session.destroy(); // Assuming you're using session-based authentication
        // or
        // res.clearCookie('authToken'); // Assuming you're using token-based authentication

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = { 
    login, 
    signup, 
    getAllAdmin, 
    getAdminById, 
    logout 
};