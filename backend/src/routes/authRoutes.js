const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rota protegida
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router; 