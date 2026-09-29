const express = require('express');
const learnerController = require('../controllers/learnerController');

const router = express.Router();

// GET /api/learner
router.get('/', learnerController.getLearner);

// PATCH /api/learner
router.patch('/', learnerController.patchLearner);

module.exports = router;
