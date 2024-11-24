
const pool = require('../db');

// Create a new report
async function createReport(req, res) {
    const { user_id, name, detail, types,  status/*, picture, danger, location, $7, POINT($8, $9) */} = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO report (user_id, name, detail, types, status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, name, detail, types, status || 'not_started'/*, danger, picture, location.lon, location.lat*/]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Error creating report' });
    }
}

// Update a report by id
async function reportUpdate(req, res) {
    const { id } = req.params;
    const { name, detail, types, danger, status/*, picture, location*/ } = req.body;
    try {
        const result = await pool.query(
            `UPDATE report 
             SET name = $1, detail = $2, types = $3, danger = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
            [name, detail, types, danger, status, /*picture, location.lon, location.lat,, picture = $6, location = POINT($7, $8),*/ id]
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
        res.status(500).json({ error: 'Error getting reports' });
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

// Get all reports for a specific user
async function getUserReport(req, res) {
    const { user_id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM report WHERE user_id = $1`, [user_id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting user reports:', error);
        res.status(500).json({ error: 'Error getting user reports' });
    }
}

// Delete a report by ID
async function deleteReport(req, res) {
    const { user_id } = req.params;
    const { id } = req.body;
  
    try {
        const result = await pool.query(
            'DELETE FROM report WHERE user_id = $1 AND id = $2 RETURNING *',
            [user_id, id]
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
    getUserReport,
    deleteReport
};
