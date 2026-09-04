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

/**
 * Competency bands used to describe a 0–100 score in words.
 * Every skill in the framework is measured on this same scale.
 */
export const competencyLevels = [
  {
    id: 'LVL-AWARE',
    label: 'Awareness',
    range: '0 – 39',
    min: 0,
    max: 39,
    description: 'Knows the concepts exist but cannot apply them unsupported.',
  },
  {
    id: 'LVL-DEV',
    label: 'Developing',
    range: '40 – 59',
    min: 40,
    max: 59,
    description: 'Can complete routine tasks with guidance and review.',
  },
  {
    id: 'LVL-PROF',
    label: 'Proficient',
    range: '60 – 74',
    min: 60,
    max: 74,
    description: 'Works independently on standard tasks for the role.',
  },
  {
    id: 'LVL-ADV',
    label: 'Advanced',
    range: '75 – 89',
    min: 75,
    max: 89,
    description: 'Handles complex cases and reviews the work of others.',
  },
  {
    id: 'LVL-EXPERT',
    label: 'Expert',
    range: '90 – 100',
    min: 90,
    max: 100,
    description: 'Sets standards and provides organisation-wide guidance.',
  },
];

/**
 * `short` is the label used on the compact skill map.
 * `meaning` is the plain-language explanation revealed on hover.
 */
export const skills = [
  {
    id: 'SKL-STAT',
    name: 'Statistics',
    short: 'Statistics',
    categoryId: 'CAT-ANALYTICS',
    meaning: 'Designing samples, estimating values and judging how reliable a number is.',
  },
  {
    id: 'SKL-PY',
    name: 'Python',
    short: 'Python',
    categoryId: 'CAT-TECH',
    meaning: 'Writing code to clean, reshape and tabulate datasets instead of doing it by hand.',
  },
  {
    id: 'SKL-DA',
    name: 'Data Analytics',
    short: 'Analytics',
    categoryId: 'CAT-ANALYTICS',
    meaning: 'Exploring data to find patterns and explaining what those patterns actually mean.',
  },
  {
    id: 'SKL-ML',
    name: 'Machine Learning',
    short: 'ML',
    categoryId: 'CAT-ANALYTICS',
    meaning: 'Training models that learn patterns from data to predict or classify new cases.',
  },
  {
    id: 'SKL-GIS',
    name: 'GIS',
    short: 'GIS',
    categoryId: 'CAT-TECH',
    meaning: 'Working with location data — maps, coordinates and geo-tagged survey records.',
  },
  {
    id: 'SKL-CLOUD',
    name: 'Cloud Computing',
    short: 'Cloud',
    categoryId: 'CAT-TECH',
    meaning: 'Using hosted storage and computing instead of a single local machine.',
  },
  {
    id: 'SKL-GOV',
    name: 'Digital Governance',
    short: 'Governance',
    categoryId: 'CAT-DIGITAL',
    meaning: 'Knowing the data standards, metadata rules and release policy of official statistics.',
  },
  {
    id: 'SKL-VIZ',
    name: 'Data Visualization',
    short: 'Visualization',
    categoryId: 'CAT-ANALYTICS',
    meaning: 'Choosing the right chart so a finding is read correctly and quickly.',
  },
  {
    id: 'SKL-COMM',
    name: 'Communication',
    short: 'Communication',
    categoryId: 'CAT-BEHAVIOURAL',
    meaning: 'Writing and presenting findings clearly for readers who are not statisticians.',
  },
  {
    id: 'SKL-MGMT',
    name: 'Management & Behavioural',
    short: 'Management',
    categoryId: 'CAT-BEHAVIOURAL',
    meaning: 'Coordinating people, planning work and handling responsibility within a team.',
  },
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
    nextAction: 'Start Machine Learning Fundamentals, then re-assess.',
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
    nextAction: 'Finish the remaining 6 modules of Python for Data Analysis.',
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
    nextAction: 'Take Applied Data Analytics to close the last 12 points.',
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
    nextAction: 'Work through Data Visualization and Statistical Storytelling.',
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
    nextAction: 'A single 4-hour cloud orientation is enough here.',
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
    nextAction: 'Low priority — the short GIS Basics workshop will clear it.',
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
    nextAction: 'No action needed. Keep this level with periodic re-assessment.',
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
    nextAction: 'No action needed. This is above your role target.',
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
    nextAction: 'No action needed. Revisit if you move to a supervisory role.',
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
    nextAction: 'No action needed. Requirement already met.',
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
