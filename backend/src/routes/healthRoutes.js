const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// GET /api/health
router.get('/', healthController.getHealth);

// GET /api/health/ai  — Express calls FastAPI, then returns the result
router.get('/ai', healthController.getAiHealth);

module.exports = router;
