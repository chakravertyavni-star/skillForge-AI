const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'SkillForge AI Backend',
    phase: 1,
    status: 'running',
    health: '/api/health',
  });
});

app.use('/api/health', healthRoutes);

app.use(errorHandler);

module.exports = app;
