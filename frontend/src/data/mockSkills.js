/**
 * MOCK DATA — skill framework, role requirements and skill-gap analysis.
 *
 * `skillGapAnalysis` is deliberately shaped like the object the Python AI/ML
 * service is expected to return in a later phase:
 *
 *   {
 *     skill, currentScore, requiredScore, gap,
 *     priority, reason, recommendedResourceIds
 *   }
 *
 * The values below are hand-written mock values. No algorithm produced them.
 */

export const skillCategories = [
  { id: 'CAT-TECH', name: 'Technical' },
  { id: 'CAT-ANALYTICS', name: 'Analytics' },
  { id: 'CAT-DIGITAL', name: 'Digital & Governance' },
  { id: 'CAT-BEHAVIOURAL', name: 'Behavioural' },
];

export const skills = [
  { id: 'SKL-STAT', name: 'Statistics', categoryId: 'CAT-ANALYTICS' },
  { id: 'SKL-PY', name: 'Python', categoryId: 'CAT-TECH' },
  { id: 'SKL-DA', name: 'Data Analytics', categoryId: 'CAT-ANALYTICS' },
  { id: 'SKL-ML', name: 'Machine Learning', categoryId: 'CAT-ANALYTICS' },
  { id: 'SKL-GIS', name: 'GIS', categoryId: 'CAT-TECH' },
  { id: 'SKL-CLOUD', name: 'Cloud Computing', categoryId: 'CAT-TECH' },
  { id: 'SKL-GOV', name: 'Digital Governance', categoryId: 'CAT-DIGITAL' },
  { id: 'SKL-VIZ', name: 'Data Visualization', categoryId: 'CAT-ANALYTICS' },
  { id: 'SKL-COMM', name: 'Communication', categoryId: 'CAT-BEHAVIOURAL' },
  { id: 'SKL-MGMT', name: 'Management & Behavioural', categoryId: 'CAT-BEHAVIOURAL' },
];

/**
 * Each role defines its own target competency level per skill.
 * Skills are referenced by id so the framework can grow without code changes.
 */
export const roles = [
  {
    id: 'ROLE-DATA-ANALYST',
    title: 'Data Analyst',
    description:
      'Analyses survey and administrative data, prepares tabulations and analytical reports.',
    learnerCount: 148,
    requirements: {
      'SKL-STAT': 75,
      'SKL-PY': 80,
      'SKL-DA': 80,
      'SKL-ML': 70,
      'SKL-GIS': 40,
      'SKL-CLOUD': 30,
      'SKL-GOV': 60,
      'SKL-VIZ': 70,
      'SKL-COMM': 70,
      'SKL-MGMT': 65,
    },
  },
  {
    id: 'ROLE-STAT-OFFICER',
    title: 'Statistical Officer',
    description: 'Supervises survey operations, sampling design and quality checks.',
    learnerCount: 212,
    requirements: {
      'SKL-STAT': 85,
      'SKL-PY': 55,
      'SKL-DA': 70,
      'SKL-ML': 40,
      'SKL-GIS': 50,
      'SKL-CLOUD': 25,
      'SKL-GOV': 70,
      'SKL-VIZ': 60,
      'SKL-COMM': 75,
      'SKL-MGMT': 75,
    },
  },
  {
    id: 'ROLE-DATA-ENGINEER',
    title: 'Data Engineer',
    description: 'Builds and maintains statistical data pipelines and platforms.',
    learnerCount: 64,
    requirements: {
      'SKL-STAT': 50,
      'SKL-PY': 85,
      'SKL-DA': 65,
      'SKL-ML': 45,
      'SKL-GIS': 35,
      'SKL-CLOUD': 75,
      'SKL-GOV': 55,
      'SKL-VIZ': 50,
      'SKL-COMM': 60,
      'SKL-MGMT': 55,
    },
  },
];

/** The signed-in learner's current competency per skill (mock). */
export const learnerCompetency = {
  'SKL-STAT': 82,
  'SKL-PY': 45,
  'SKL-DA': 68,
  'SKL-ML': 38,
  'SKL-GIS': 35,
  'SKL-CLOUD': 20,
  'SKL-GOV': 64,
  'SKL-VIZ': 58,
  'SKL-COMM': 76,
  'SKL-MGMT': 70,
};

/**
 * Pre-computed mock gap analysis for the signed-in learner's role.
 * Ordered by priority, highest attention first.
 */
export const skillGapAnalysis = [
  {
    skillId: 'SKL-ML',
    skill: 'Machine Learning',
    category: 'Analytics',
    currentScore: 38,
    requiredScore: 70,
    gap: 32,
    priority: 'critical',
    reason:
      'Current competency is significantly below the level required for a Data Analyst, and this skill is used in predictive tabulation work.',
    trend: 'improving',
    trendDelta: 6,
    lastAssessedOn: '2026-08-21',
    recommendedResourceIds: ['CRS-ML-101', 'CRS-ML-APPLIED'],
  },
  {
    skillId: 'SKL-PY',
    skill: 'Python',
    category: 'Technical',
    currentScore: 45,
    requiredScore: 80,
    gap: 35,
    priority: 'high',
    reason:
      'Python is a core requirement for your role. Assessment responses showed weakness in pandas operations and data cleaning.',
    trend: 'improving',
    trendDelta: 7,
    lastAssessedOn: '2026-06-18',
    recommendedResourceIds: ['CRS-PY-DATA', 'CRS-PY-CLEAN'],
  },
  {
    skillId: 'SKL-DA',
    skill: 'Data Analytics',
    category: 'Analytics',
    currentScore: 68,
    requiredScore: 80,
    gap: 12,
    priority: 'moderate',
    reason:
      'Close to the role target. Exploratory analysis is strong, but multivariate interpretation needs reinforcement.',
    trend: 'improving',
    trendDelta: 4,
    lastAssessedOn: '2026-08-21',
    recommendedResourceIds: ['CRS-DA-APPLIED'],
  },
  {
    skillId: 'SKL-VIZ',
    skill: 'Data Visualization',
    category: 'Analytics',
    currentScore: 58,
    requiredScore: 70,
    gap: 12,
    priority: 'moderate',
    reason:
      'Chart selection and dashboard structuring are below the level expected for published statistical releases.',
    trend: 'steady',
    trendDelta: 0,
    lastAssessedOn: '2026-05-04',
    recommendedResourceIds: ['CRS-VIZ-STORY'],
  },
  {
    skillId: 'SKL-CLOUD',
    skill: 'Cloud Computing',
    category: 'Technical',
    currentScore: 20,
    requiredScore: 30,
    gap: 10,
    priority: 'low',
    reason:
      'Only basic familiarity is expected for this role. A short orientation is sufficient.',
    trend: 'steady',
    trendDelta: 0,
    lastAssessedOn: '2026-03-12',
    recommendedResourceIds: ['CRS-CLOUD-INTRO'],
  },
  {
    skillId: 'SKL-GIS',
    skill: 'GIS',
    category: 'Technical',
    currentScore: 35,
    requiredScore: 40,
    gap: 5,
    priority: 'low',
    reason: 'Marginally below target. Occasional use in geo-tagged survey data.',
    trend: 'steady',
    trendDelta: 1,
    lastAssessedOn: '2026-03-12',
    recommendedResourceIds: ['CRS-GIS-BASIC'],
  },
  {
    skillId: 'SKL-STAT',
    skill: 'Statistics',
    category: 'Analytics',
    currentScore: 82,
    requiredScore: 75,
    gap: 0,
    priority: 'met',
    reason: 'Exceeds the role requirement by 7 points. This is a consistent strength.',
    trend: 'improving',
    trendDelta: 3,
    lastAssessedOn: '2026-08-21',
    recommendedResourceIds: [],
  },
  {
    skillId: 'SKL-COMM',
    skill: 'Communication',
    category: 'Behavioural',
    currentScore: 76,
    requiredScore: 70,
    gap: 0,
    priority: 'met',
    reason: 'Meets the role requirement. Report writing feedback has been positive.',
    trend: 'steady',
    trendDelta: 2,
    lastAssessedOn: '2026-05-04',
    recommendedResourceIds: [],
  },
  {
    skillId: 'SKL-MGMT',
    skill: 'Management & Behavioural',
    category: 'Behavioural',
    currentScore: 70,
    requiredScore: 65,
    gap: 0,
    priority: 'met',
    reason: 'Above the role requirement for coordination and team responsibilities.',
    trend: 'steady',
    trendDelta: 0,
    lastAssessedOn: '2026-05-04',
    recommendedResourceIds: [],
  },
  {
    skillId: 'SKL-GOV',
    skill: 'Digital Governance',
    category: 'Digital & Governance',
    currentScore: 64,
    requiredScore: 60,
    gap: 0,
    priority: 'met',
    reason: 'Meets the requirement following the Official Statistics Data Systems course.',
    trend: 'improving',
    trendDelta: 5,
    lastAssessedOn: '2026-05-04',
    recommendedResourceIds: [],
  },
];

/** Ordered attention list used on the dashboard. */
export const skillGapPriority = skillGapAnalysis
  .filter((item) => item.gap > 0)
  .map((item, index) => ({
    rank: index + 1,
    skillId: item.skillId,
    skill: item.skill,
    gap: item.gap,
    priority: item.priority,
  }));

export const priorityOrder = ['critical', 'high', 'moderate', 'low', 'met'];

export const priorityLabels = {
  critical: 'Critical gap',
  high: 'High gap',
  moderate: 'Moderate gap',
  low: 'Small gap',
  met: 'No gap',
};
