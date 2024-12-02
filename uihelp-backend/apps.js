// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoute = require('./routes/ReportRoutes');
const adminRoute = require('./routes/AdminRoutes');
const dotenv = require('dotenv');
const pool = require('./db');  // Impor pool untuk koneksi ke database

const app = express();
const PORT = 5000;

// dotenv.config(); // Pastikan untuk memuat variabel lingkungan dari .env

// Menguji koneksi ke database
pool.connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Error connecting to the database:', err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/uploads', express.static('uploads'));
app.use('/report', reportRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
