
const express = require('express');

const {
    login, 
    signup, 
    getAllAdmin, 
    getAdminById, 
    logout 
} = require('../controllers/AdminController');

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

router.post('/signUp', async (req, res) => {
    await signup(req, res);
});

router.get('/getAllAdmin', async (req, res) => {
    await getAllAdmin(req, res);
});

router.get('/:id', async (req, res) => {
    await getAdminById(req, res);
});

router.post('/logout', async (req, res) => {
    await logout(req, res);
});

module.exports = router;
