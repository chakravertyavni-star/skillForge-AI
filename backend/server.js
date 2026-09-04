const env = require('./src/config/env');
const app = require('./src/app');

app.listen(env.port, () => {
  console.log(`SkillForge backend listening on http://localhost:${env.port}`);
  console.log(`Health check: GET http://localhost:${env.port}/api/health`);
});
