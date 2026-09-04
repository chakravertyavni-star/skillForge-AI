const env = require('../config/env');

/**
 * Client for the Python FastAPI AI/ML service.
 * Phase 1 only checks that the service is reachable.
 * Later phases will add competency, recommendation, and NLP calls here.
 */
async function checkHealth() {
  const url = `${env.aiServiceUrl}/health`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) {
    throw new Error(`AI service returned HTTP ${response.status}`);
  }

  return response.json();
}

module.exports = {
  checkHealth,
};
