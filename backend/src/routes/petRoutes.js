const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middlewares/authMiddleware');
const employeeMiddleware = require('../middlewares/employeeMiddleware');
const upload = require('../config/multer');

// Rotas públicas
router.get('/', (req, res) => petController.getPets(req, res));
router.get('/:id', (req, res) => petController.getPetById(req, res));

// Rotas protegidas (requerem autenticação e permissão de funcionário)
router.post('/', authMiddleware, employeeMiddleware, upload.array('photos', 5), (req, res) => petController.createPet(req, res));
router.put('/:id', authMiddleware, employeeMiddleware, upload.array('photos', 5), (req, res) => petController.updatePet(req, res));
router.delete('/:id', authMiddleware, employeeMiddleware, (req, res) => petController.deletePet(req, res));

module.exports = router; 