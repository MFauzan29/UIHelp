const express = require('express');

const {
    createReport,
    reportUpdate,
    getAllReport,
    getReportById,
    getUserReport,
    deleteReport
} = require('../controllers/ReportController');

const router = express.Router();

router.post('/:user_id/create', async (req, res) => {
    await createReport(req, res);
 
});

router.put('/:id/update', async (req, res) => {
   await reportUpdate(req, res);
});

router.get('/', async (req, res) => {
   await getAllReport(req, res);
   
});

router.get('/:id', async (req, res) => {
   await getReportById(req, res);
   
});

router.get('/user/:user_id', async (req, res) => {
   await getUserReport(req, res);
});

router.delete('/user/:user_id/delete', async (req, res) => {
   await deleteReport(req, res);
});

module.exports = router;