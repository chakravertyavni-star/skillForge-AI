/**
 * MOCK DATA — learner profile and header statistics.
 *
 * Phase: frontend only. Nothing here comes from a server.
 * Later this object will be replaced by the response of
 * GET /api/learners/me from the Node/Express backend.
 */

export const learner = {
  id: 'LRN-2041',
  name: 'Ananya Deshpande',
  initials: 'AD',
  email: 'ananya.deshpande@mospi.gov.in',
  employeeCode: 'MOSPI/JSO/2041',
  designation: 'Junior Statistical Officer',
  department: 'Ministry of Statistics and Programme Implementation',
  division: 'National Sample Survey Office (NSSO)',
  location: 'New Delhi',
  roleId: 'ROLE-DATA-ANALYST',
  roleTitle: 'Data Analyst',
  joinedOn: '2023-07-10',
  experienceYears: 3,
  currentAssignment:
    'Household Consumption Expenditure Survey — data validation and tabulation',
  careerGoal: 'Senior Data Scientist (Statistical Systems)',
  careerGoalHorizon: '18 months',
  education: [
    {
      id: 'EDU-1',
      qualification: 'M.Sc. Statistics',
      institution: 'University of Pune',
      year: 2022,
      score: '8.4 CGPA',
    },
    {
      id: 'EDU-2',
      qualification: 'B.Sc. Mathematics (Hons.)',
      institution: 'Fergusson College, Pune',
      year: 2020,
      score: '76%',
    },
  ],
  previousTraining: [
    {
      id: 'TRN-1',
      title: 'Foundation Course for Statistical Officers',
      provider: 'National Statistical Systems Training Academy',
      completedOn: '2023-09-22',
      durationHours: 80,
      outcome: 'Completed',
    },
    {
      id: 'TRN-2',
      title: 'Survey Sampling and Estimation Techniques',
      provider: 'NSSTA',
      completedOn: '2024-04-18',
      durationHours: 40,
      outcome: 'Completed with distinction',
    },
    {
      id: 'TRN-3',
      title: 'Introduction to Official Statistics Data Systems',
      provider: 'MoSPI Capacity Building Cell',
      completedOn: '2025-01-30',
      durationHours: 24,
      outcome: 'Completed',
    },
  ],
};

/**
 * Headline numbers shown on the dashboard.
 * `overallCompetency` is a mock composite index across role-relevant skills —
 * the real value will be computed by the AI/ML service in a later phase.
 */
export const learnerStats = {
  overallCompetency: 72,
  overallCompetencyDelta: 4,
  skillsMeetingTarget: 5,
  skillsTracked: 10,
  criticalGaps: 2,
  assessmentsTaken: 4,
  coursesInProgress: 2,
  coursesCompleted: 3,
  learningHoursThisMonth: 14,
  lastAssessedOn: '2026-08-21',
};

export const notifications = [
  {
    id: 'NTF-1',
    type: 'assessment',
    title: 'Machine Learning re-assessment is due',
    detail: 'Your last attempt was 14 days ago. Retake to refresh your competency.',
    date: '2026-09-02',
    unread: true,
  },
  {
    id: 'NTF-2',
    type: 'recommendation',
    title: '3 new learning recommendations',
    detail: 'Updated after your Machine Learning Foundations Check.',
    date: '2026-08-22',
    unread: true,
  },
  {
    id: 'NTF-3',
    type: 'course',
    title: 'Python for Data Analysis — Module 4 unlocked',
    detail: 'Continue where you left off.',
    date: '2026-08-19',
    unread: false,
  },
];

export const quickActions = [
  {
    id: 'QA-1',
    label: 'Take an assessment',
    description: 'Measure your current competency',
    icon: 'assessment',
    to: '/app/assessment',
  },
  {
    id: 'QA-2',
    label: 'View skill gaps',
    description: 'See where you stand against your role',
    icon: 'target',
    to: '/app/skills',
  },
  {
    id: 'QA-3',
    label: 'Continue learning',
    description: '2 courses in progress',
    icon: 'book',
    to: '/app/learning',
  },
  {
    id: 'QA-4',
    label: 'Ask the AI assistant',
    description: 'Get guidance on your learning path',
    icon: 'sparkles',
    to: '/app/assistant',
  },
];
