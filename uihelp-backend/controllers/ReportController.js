
const pool = require('../db');

const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

// Create a new report
async function createReport(req, res) {
    const { name, types, detail, picture, location } = req.body;
    let fileUrl = null;

    try {
        // Jika gambar dalam format base64 diterima
        if (picture) {
            const result = await uploadToCloudinary(picture); // Mengirim gambar base64 ke Cloudinary
            fileUrl = result.secure_url; // Mendapatkan URL aman dari respon Cloudinary
        }

        // Menyimpan data laporan ke database
        const query = `
        INSERT INTO report (name, types, detail, picture, location)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
        const values = [name, detail, types, fileUrl, location]; // Gambar disimpan sebagai URL, bukan base64

        const { rows } = await pool.query(query, values);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// Update a report by id
async function reportUpdate(req, res) {
    const { id } = req.params;
    const { name, detail, types, status/*, location*/ } = req.body;
    try {
        const result = await pool.query(
            `UPDATE report 
             SET name = $1, detail = $2, types = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`,
            [name, detail, types, status, /*picture, location.lon, location.lat, = $6, location = POINT($7, $8),*/ id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Report not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ error: 'Error updating report' });
    }
}

// Get all reports
async function getAllReport(req, res) {
    try {
        const result = await pool.query(`SELECT * FROM report`);
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting reports:', error);

        // Kembalikan error asli untuk debugging (hanya gunakan di development)
        res.status(500).json({
            error: 'Error getting reports',
            message: error.message,
            stack: error.stack, // Informasi detail stack trace
        });
    }
}


// Get report by ID
async function getReportById(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM report WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Report not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error getting report by ID:', error);
        res.status(500).json({ error: 'Error getting report by ID' });
    }
}

// Delete a report by ID
async function deleteReport(req, res) {
    const { id } = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM report WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Report not found' });
        } else {
            res.json({ message: 'Report deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ error: 'Error deleting report' });
    }
}

module.exports = {
    createReport,
    reportUpdate,
    getAllReport,
    getReportById,
    deleteReport
};
