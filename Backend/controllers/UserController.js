// server/controllers/UserController.js
const pool = require('../db');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Incorrect email or password provided" });
    }

    var user = result.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password provided" });
    }

    // Generate and return a token or set a session cookie here

    res.status(200).json({ message: "Login Successful", account: user});
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function signup(req, res) {
  const { name, email, password } = req.body;
  // Dapatkan nama file dari file yang diunggah
  //const profileImage = req.file ? req.file.filename : null;

  try {
      const emailCheck = await pool.query('SELECT COUNT(*) FROM users WHERE email = $1', [email]);

      if (emailCheck.rows[0].count > 0) {
          return res.status(400).json({ error: "Email is already in use" });
      }

      //const userCount = await pool.query('SELECT COUNT(*) FROM users');

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword]
      );

      const newUser = result.rows[0];
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: "An error occurred" });
  }
}

async function getAllUser(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM users;'
    );
    if (!result.rows.length) {
      res.status(404).send("No users found");
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

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No user found for the given user ID" });
    }

    const user = result.rows[0];

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getUserById:', error);
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
    getAllUser, 
    getUserById, 
    logout 
};