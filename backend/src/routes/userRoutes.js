const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/register', (req, res) => userController.createUser(req, res));

// Rotas protegidas (requerem autenticação)
router.get('/', authMiddleware, (req, res) => userController.getUsers(req, res));
router.get('/:id', authMiddleware, (req, res) => userController.getUserById(req, res));
router.put('/:id', authMiddleware, (req, res) => userController.updateUser(req, res));
router.delete('/:id', authMiddleware, (req, res) => userController.deleteUser(req, res));

module.exports = router; 