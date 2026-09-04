require('dotenv').config();

/**
 * Central place for environment variables.
 * Secrets (API keys, database URLs) will be added here in later phases —
 * never in the React frontend.
 */
const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
};

module.exports = env;
