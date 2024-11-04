
const express = require('express');

const {
    login,
    signup,
    getAllUser,
    getUserById,
    logout
} = require('../controllers/UserController');

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

router.post('/signUp', async (req, res) => {
    await signup(req, res);
});

router.get('/getAllUser', async (req, res) => {
    await getAllUser(req, res);
});

router.get('/:id', async (req, res) => {
    await getUserById(req, res);
});

router.post('/logout', async (req, res) => {
    await logout(req, res);
});

module.exports = router;
