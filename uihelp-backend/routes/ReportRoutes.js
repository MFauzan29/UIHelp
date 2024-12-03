const express = require('express');
const upload = require('../middleware/multerConfig'); // Updated multer middleware

const {
   createReport,
   reportUpdate,
   getAllReport,
   getReportById,
   deleteReport,
} = require('../controllers/ReportController');

const router = express.Router();

router.post('/create', async (req, res) => {
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

router.delete('/:id/delete', async (req, res) => {
   await deleteReport(req, res);
});

module.exports = router;