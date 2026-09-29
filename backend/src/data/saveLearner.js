const fs = require('fs');
const path = require('path');

function saveLearner(learner) {
  const filePath = path.join(__dirname, 'learner.js');
  const source = `/**
 * Single predefined learner for GET /api/learner.
 * File-based only — no database in this phase.
 */
const learner = ${JSON.stringify(learner, null, 2)};

module.exports = { learner };
`;
  fs.writeFileSync(filePath, source, 'utf8');
}

module.exports = { saveLearner };
