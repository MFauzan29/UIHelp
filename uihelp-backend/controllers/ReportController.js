
const pool = require('../db');

const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

// Create a new report
async function createReport(req, res) {
    const { name, types, detail, picture, location } = req.body; // Ambil data dari req.body
    let fileUrl = null;

    try {
        // Validasi input
        if (!name || !detail || !types) {
            return res.status(400).json({
                success: false,
                message: 'Name, detail, and types are required.',
            });
        }

        // Jika gambar dalam format base64 diterima, unggah ke Cloudinary
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
        const values = [name, types, detail, fileUrl, location]; // Pastikan urutan values sesuai query

        const { rows } = await pool.query(query, values);
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// Update a report by id
async function reportUpdate(req, res) {
    const { id } = req.params;
    const {status} = req.body;
    try {
        const result = await pool.query(
            `UPDATE report 
             SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
            [ status, id]
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
