/**
 * MOCK DATA — assessment catalogue, a small question set, and mock results.
 *
 * The question set is answered entirely in the browser. Scoring is a plain
 * tally against `correctOption` — it is NOT a machine-learning model.
 * The qualitative analysis (strengths, weak areas, suggestions) is fixed
 * mock text that will later come from the AI/ML service.
 */

export const assessmentCatalog = [
  {
    id: 'ASM-DA-CORE',
    title: 'Data Analyst Competency Assessment',
    description:
      'Covers statistics, Python, data analytics and machine learning at the level expected for your role.',
    questionCount: 8,
    durationMinutes: 15,
    skills: ['Statistics', 'Python', 'Data Analytics', 'Machine Learning'],
    status: 'available',
    lastAttemptScore: null,
  },
  {
    id: 'ASM-ML-FOUND',
    title: 'Machine Learning Foundations Check',
    description: 'Focused check on supervised learning, evaluation metrics and overfitting.',
    questionCount: 10,
    durationMinutes: 20,
    skills: ['Machine Learning'],
    status: 'retake-due',
    lastAttemptScore: 38,
  },
  {
    id: 'ASM-PY-L1',
    title: 'Python for Data Analysis — Level 1',
    description: 'pandas, NumPy and data cleaning fundamentals.',
    questionCount: 12,
    durationMinutes: 25,
    skills: ['Python'],
    status: 'available',
    lastAttemptScore: 44,
  },
  {
    id: 'ASM-STAT-PROF',
    title: 'Statistics Proficiency Check',
    description: 'Sampling, estimation and inference for survey data.',
    questionCount: 10,
    durationMinutes: 20,
    skills: ['Statistics'],
    status: 'completed',
    lastAttemptScore: 71,
  },
];

/** Mock question set used by the Assessment page. */
export const assessmentQuestions = [
  {
    id: 'Q1',
    skillId: 'SKL-STAT',
    skill: 'Statistics',
    topic: 'Sampling design',
    difficulty: 'Medium',
    question:
      'In a household survey, probability proportional to size (PPS) sampling is used. What is its primary advantage?',
    options: [
      'It removes the need for sampling weights entirely',
      'Larger units have a higher chance of selection, improving estimate precision',
      'It guarantees an equal number of households from every district',
      'It eliminates non-response bias from the survey',
    ],
    correctOption: 1,
    explanation:
      'PPS gives larger units a proportionally higher selection probability, which usually reduces the variance of totals.',
  },
  {
    id: 'Q2',
    skillId: 'SKL-STAT',
    skill: 'Statistics',
    topic: 'Descriptive statistics',
    difficulty: 'Easy',
    question:
      'Household income data is strongly right-skewed. Which measure best represents a typical household?',
    options: ['Arithmetic mean', 'Median', 'Range', 'Standard deviation'],
    correctOption: 1,
    explanation:
      'The median is resistant to extreme high values, so it describes the typical household better than the mean.',
  },
  {
    id: 'Q3',
    skillId: 'SKL-PY',
    skill: 'Python',
    topic: 'pandas basics',
    difficulty: 'Easy',
    question:
      'Which expression returns the number of missing values in each column of a DataFrame `df`?',
    options: ['df.isna().sum()', 'df.count().na()', 'df.missing()', 'df.sum().isna()'],
    correctOption: 0,
    explanation:
      '`df.isna()` produces a boolean frame and `.sum()` counts the True values column-wise.',
  },
  {
    id: 'Q4',
    skillId: 'SKL-PY',
    skill: 'Python',
    topic: 'Data cleaning',
    difficulty: 'Medium',
    question:
      'You need to drop rows where the column `age` is missing, without changing other columns. Which is correct?',
    options: [
      'df.dropna()',
      "df.dropna(subset=['age'])",
      "df.fillna(0, subset=['age'])",
      "df.drop('age', axis=1)",
    ],
    correctOption: 1,
    explanation:
      'The `subset` argument restricts the row-dropping check to the listed columns.',
  },
  {
    id: 'Q5',
    skillId: 'SKL-ML',
    skill: 'Machine Learning',
    topic: 'Model generalisation',
    difficulty: 'Medium',
    question: 'A model scores 98% on training data and 61% on unseen data. This indicates:',
    options: ['Underfitting', 'Overfitting', 'Data leakage in the test set', 'Class imbalance'],
    correctOption: 1,
    explanation:
      'A large gap between training and unseen performance is the classic signature of overfitting.',
  },
  {
    id: 'Q6',
    skillId: 'SKL-ML',
    skill: 'Machine Learning',
    topic: 'Evaluation metrics',
    difficulty: 'Hard',
    question:
      'For a classification task where only 3% of records are positive, which metric is most informative?',
    options: [
      'Overall accuracy',
      'F1-score / precision-recall',
      'Mean squared error',
      'R-squared',
    ],
    correctOption: 1,
    explanation:
      'With heavy class imbalance, accuracy is misleading; precision, recall and F1 describe minority-class performance.',
  },
  {
    id: 'Q7',
    skillId: 'SKL-DA',
    skill: 'Data Analytics',
    topic: 'Exploratory analysis',
    difficulty: 'Easy',
    question: 'What is the main purpose of examining a correlation matrix during EDA?',
    options: [
      'To prove that one variable causes another',
      'To identify linear relationships and possible redundancy between variables',
      'To impute all missing values automatically',
      'To decide the sample size of the survey',
    ],
    correctOption: 1,
    explanation:
      'Correlation describes linear association and highlights redundancy. It does not establish causation.',
  },
  {
    id: 'Q8',
    skillId: 'SKL-DA',
    skill: 'Data Analytics',
    topic: 'Interpretation',
    difficulty: 'Medium',
    question:
      'A district shows a sharp rise in an indicator only after a change in the survey questionnaire. The most appropriate first step is to:',
    options: [
      'Publish the rise as a genuine trend',
      'Check comparability and treat the series as a possible break in series',
      'Remove the district from the release',
      'Replace the values with the national average',
    ],
    correctOption: 1,
    explanation:
      'A methodological change can create a break in series; comparability must be verified before interpretation.',
  },
];

/** Mock qualitative analysis shown alongside the computed score. */
export const resultAnalysis = {
  strengths: [
    {
      skill: 'Statistics',
      note: 'Sampling design and descriptive interpretation answered confidently.',
    },
    {
      skill: 'Data Analytics',
      note: 'Good judgement on comparability and break-in-series issues.',
    },
  ],
  weakAreas: [
    {
      skill: 'Machine Learning',
      note: 'Evaluation metrics for imbalanced data need reinforcement.',
    },
    {
      skill: 'Python',
      note: 'Selective missing-value handling in pandas was answered incorrectly.',
    },
  ],
  suggestions: [
    'Start with Machine Learning Fundamentals — it directly addresses your largest role gap.',
    'Complete Module 5 of Python for Data Analysis to cover subset-based cleaning.',
    'Re-attempt this assessment after two weeks of study to refresh your competency score.',
  ],
};

/** Fallback result shown when the results page is opened directly (mock). */
export const lastAssessmentResult = {
  assessmentId: 'ASM-DA-CORE',
  assessmentTitle: 'Data Analyst Competency Assessment',
  submittedOn: '2026-08-21',
  totalQuestions: 8,
  correctAnswers: 5,
  scorePercent: 63,
  durationMinutes: 11,
  skillBreakdown: [
    { skill: 'Statistics', correct: 2, total: 2, percent: 100 },
    { skill: 'Data Analytics', correct: 2, total: 2, percent: 100 },
    { skill: 'Python', correct: 1, total: 2, percent: 50 },
    { skill: 'Machine Learning', correct: 0, total: 2, percent: 0 },
  ],
  topicBreakdown: [
    { topic: 'Sampling design', skill: 'Statistics', percent: 100 },
    { topic: 'Descriptive statistics', skill: 'Statistics', percent: 100 },
    { topic: 'Exploratory analysis', skill: 'Data Analytics', percent: 100 },
    { topic: 'Interpretation', skill: 'Data Analytics', percent: 100 },
    { topic: 'pandas basics', skill: 'Python', percent: 100 },
    { topic: 'Data cleaning', skill: 'Python', percent: 0 },
    { topic: 'Model generalisation', skill: 'Machine Learning', percent: 0 },
    { topic: 'Evaluation metrics', skill: 'Machine Learning', percent: 0 },
  ],
};

/** Previous attempts, used on the Progress page. */
export const assessmentHistory = [
  {
    id: 'ATT-1',
    assessmentTitle: 'Data Analyst Baseline Assessment',
    date: '2026-03-12',
    scorePercent: 48,
    questions: 20,
    focus: 'All role skills',
  },
  {
    id: 'ATT-2',
    assessmentTitle: 'Statistics Proficiency Check',
    date: '2026-05-04',
    scorePercent: 71,
    questions: 10,
    focus: 'Statistics',
  },
  {
    id: 'ATT-3',
    assessmentTitle: 'Python for Data Analysis — Level 1',
    date: '2026-06-18',
    scorePercent: 44,
    questions: 12,
    focus: 'Python',
  },
  {
    id: 'ATT-4',
    assessmentTitle: 'Machine Learning Foundations Check',
    date: '2026-08-21',
    scorePercent: 38,
    questions: 10,
    focus: 'Machine Learning',
  },
];
