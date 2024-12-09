
const express = require('express');

const {
    login, 
    signup, 
    getAllAdmin, 
    getAdminById, 
    logout, 
    getCurrentUser
} = require('../controllers/AdminController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

router.get('/me', authenticate, getCurrentUser);

router.post('/signup', async (req, res) => {
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
