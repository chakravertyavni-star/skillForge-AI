const { learner } = require('../data/learner');
const { saveLearner } = require('../data/saveLearner');

const ALLOWED_FIELDS = [
  'name',
  'designation',
  'department',
  'division',
  'location',
  'email',
  'education',
  'experienceYears',
  'currentAssignment',
  'careerGoal',
];

function getLearner(req, res) {
  res.json(learner);
}

function initialsFromName(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function patchLearner(req, res) {
  const body = req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({
      status: 'error',
      message: 'Request body must be an object',
    });
  }

  const updates = {};
  for (const field of ALLOWED_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No updatable profile fields provided',
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(updates, 'education') &&
    !Array.isArray(updates.education)
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'education must be an array',
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(updates, 'experienceYears') &&
    typeof updates.experienceYears !== 'number'
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'experienceYears must be a number',
    });
  }

  Object.assign(learner, updates);

  if (Object.prototype.hasOwnProperty.call(updates, 'name')) {
    learner.initials = initialsFromName(learner.name);
  }

  saveLearner(learner);
  res.json(learner);
}

module.exports = {
  getLearner,
  patchLearner,
};
