const express = require('express');
const router = express.Router();
const profileAnalysisController = require('../controllers/profileAnalysisController');
const authMiddleware = require('../middlewares/authMiddleware');
const employeeMiddleware = require('../middlewares/employeeMiddleware');

// Rotas públicas
router.post('/', authMiddleware, profileAnalysisController.createProfileAnalysis);
router.get('/me', authMiddleware, profileAnalysisController.getProfileAnalysisByUser);

// Rotas protegidas (apenas para funcionários)
router.get('/', authMiddleware, employeeMiddleware, profileAnalysisController.getAllProfileAnalyses);
router.get('/:id', authMiddleware, employeeMiddleware, profileAnalysisController.getProfileAnalysis);
router.put('/:id', authMiddleware, employeeMiddleware, profileAnalysisController.updateProfileAnalysis);
router.delete('/:id', authMiddleware, employeeMiddleware, profileAnalysisController.deleteProfileAnalysis);

module.exports = router; 