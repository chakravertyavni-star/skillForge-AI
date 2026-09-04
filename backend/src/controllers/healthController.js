const aiService = require('../services/aiService');

function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'skillforge-backend',
    phase: 1,
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
}

async function getAiHealth(req, res, next) {
  try {
    const ai = await aiService.checkHealth();
    res.json({
      status: 'ok',
      service: 'skillforge-backend',
      message: 'Reached the AI/ML service through the backend',
      ai,
    });
  } catch (err) {
    err.statusCode = 503;
    err.message =
      err.message ||
      'Could not reach the AI/ML service. Start it on port 8000.';
    next(err);
  }
}

module.exports = {
  getHealth,
  getAiHealth,
};
