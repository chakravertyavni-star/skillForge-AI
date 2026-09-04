/**
 * MOCK DATA — personalised learning recommendations.
 *
 * Every `reason` below is fixed mock text written by hand. There is no
 * recommendation algorithm in this phase. Later, the Python AI/ML service
 * will return objects of the same shape.
 */

export const recommendations = [
  {
    id: 'REC-1',
    resourceId: 'CRS-ML-101',
    title: 'Machine Learning Fundamentals',
    provider: 'National Statistical Systems Training Academy',
    type: 'Course',
    level: 'Beginner',
    durationHours: 18,
    targetSkillId: 'SKL-ML',
    targetSkill: 'Machine Learning',
    priority: 'critical',
    matchScore: 94,
    currentScore: 38,
    requiredScore: 70,
    reason:
      'Recommended because your Machine Learning competency (38) is significantly below the level required for your current role (70).',
    supportingSignals: [
      'Largest gap in your role competency profile',
      'Both machine learning questions answered incorrectly in your last assessment',
      'No prior training recorded in this skill',
    ],
    expectedOutcome: 'Expected to move Machine Learning from 38 towards the 60–65 range.',
  },
  {
    id: 'REC-2',
    resourceId: 'CRS-PY-DATA',
    title: 'Python for Data Analysis',
    provider: 'MoSPI Capacity Building Cell',
    type: 'Course',
    level: 'Intermediate',
    durationHours: 24,
    targetSkillId: 'SKL-PY',
    targetSkill: 'Python',
    priority: 'high',
    matchScore: 91,
    currentScore: 45,
    requiredScore: 80,
    reason:
      'Recommended because Python is a core requirement for a Data Analyst and your competency (45) is 35 points below the target.',
    supportingSignals: [
      'Already 40% complete — finishing it gives the fastest gain',
      'Data cleaning question answered incorrectly in your last assessment',
      'Directly supports your current tabulation assignment',
    ],
    expectedOutcome: 'Completing the remaining 6 modules should raise Python towards 65.',
  },
  {
    id: 'REC-3',
    resourceId: 'CRS-PY-CLEAN',
    title: 'Data Cleaning and Validation with Python',
    provider: 'NSSTA',
    type: 'Workshop',
    level: 'Beginner',
    durationHours: 8,
    targetSkillId: 'SKL-PY',
    targetSkill: 'Python',
    priority: 'high',
    matchScore: 86,
    currentScore: 45,
    requiredScore: 80,
    reason:
      'Recommended because your assessment showed a specific weakness in selective missing-value handling, which this short workshop covers directly.',
    supportingSignals: [
      'Targets the "Data cleaning" topic where you scored 0%',
      'Short format — 8 hours',
    ],
    expectedOutcome: 'Addresses a specific weak subtopic rather than the whole skill.',
  },
  {
    id: 'REC-4',
    resourceId: 'CRS-DA-APPLIED',
    title: 'Applied Data Analytics for Official Statistics',
    provider: 'Indian Statistical Institute',
    type: 'Course',
    level: 'Intermediate',
    durationHours: 20,
    targetSkillId: 'SKL-DA',
    targetSkill: 'Data Analytics',
    priority: 'moderate',
    matchScore: 78,
    currentScore: 68,
    requiredScore: 80,
    reason:
      'Recommended because your Data Analytics competency (68) is close to but still below the role requirement (80), specifically in multivariate interpretation.',
    supportingSignals: [
      'Smallest remaining gap among your analytical skills',
      'Builds on your existing strength in Statistics',
    ],
    expectedOutcome: 'Expected to close the remaining 12-point gap.',
  },
  {
    id: 'REC-5',
    resourceId: 'CRS-VIZ-STORY',
    title: 'Data Visualization and Statistical Storytelling',
    provider: 'MoSPI Capacity Building Cell',
    type: 'Course',
    level: 'Intermediate',
    durationHours: 12,
    targetSkillId: 'SKL-VIZ',
    targetSkill: 'Data Visualization',
    priority: 'moderate',
    matchScore: 72,
    currentScore: 58,
    requiredScore: 70,
    reason:
      'Recommended because chart selection and dashboard structuring are below the level expected for published statistical releases.',
    supportingSignals: [
      'Supports your stated career goal of Senior Data Scientist',
      'Complements your strong Communication score',
    ],
    expectedOutcome: 'Expected to close the 12-point visualization gap.',
  },
  {
    id: 'REC-6',
    resourceId: 'CRS-CLOUD-INTRO',
    title: 'Cloud Fundamentals for Government Data Teams',
    provider: 'National Informatics Centre',
    type: 'Micro-learning',
    level: 'Beginner',
    durationHours: 4,
    targetSkillId: 'SKL-CLOUD',
    targetSkill: 'Cloud Computing',
    priority: 'low',
    matchScore: 58,
    currentScore: 20,
    requiredScore: 30,
    reason:
      'Recommended as low-priority background knowledge — your role expects only basic cloud familiarity.',
    supportingSignals: ['Only a 10-point gap', 'Short 4-hour format'],
    expectedOutcome: 'Sufficient to meet the basic role expectation.',
  },
];

/** Shown at the top of the Recommendations page (mock summary text). */
export const recommendationSummary = {
  generatedOn: '2026-08-22',
  basedOn: [
    'Role requirements for Data Analyst',
    'Current competency across 10 skills',
    'Results of 4 completed assessments',
    'Course history and learning activity',
    'Stated career goal: Senior Data Scientist',
  ],
  headline:
    'Your learning path currently prioritises Machine Learning and Python, the two skills furthest below your role requirement.',
};
