const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const employeeMiddleware = require('../middlewares/employeeMiddleware');

// Rotas públicas
router.get('/', authMiddleware, adoptionController.listUserAdoptions);

// Rotas protegidas (requerem autenticação)
router.post('/', authMiddleware, adoptionController.requestAdoption);
router.put('/:id/cancel', authMiddleware, adoptionController.cancelAdoption);

// Rotas de funcionário
router.get('/all', authMiddleware, employeeMiddleware, adoptionController.listAdoptions);
router.put('/:id/status', authMiddleware, employeeMiddleware, adoptionController.updateAdoptionStatus);

module.exports = router; 