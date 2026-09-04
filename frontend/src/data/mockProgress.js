/**
 * MOCK DATA — progress and competency growth over time.
 * Later this will come from stored assessment history in MongoDB.
 */

export const competencyTrend = {
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  series: [
    {
      id: 'overall',
      name: 'Overall competency',
      color: '#1e40af',
      values: [48, 52, 55, 58, 63, 68, 72],
    },
  ],
};

export const skillTrend = {
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  series: [
    {
      id: 'SKL-PY',
      name: 'Python',
      color: '#1e40af',
      values: [22, 26, 30, 33, 38, 42, 45],
    },
    {
      id: 'SKL-ML',
      name: 'Machine Learning',
      color: '#b42318',
      values: [18, 20, 24, 27, 30, 34, 38],
    },
    {
      id: 'SKL-STAT',
      name: 'Statistics',
      color: '#027a48',
      values: [68, 71, 73, 76, 78, 80, 82],
    },
    {
      id: 'SKL-DA',
      name: 'Data Analytics',
      color: '#b54708',
      values: [50, 54, 57, 60, 63, 66, 68],
    },
  ],
};

export const skillImprovement = [
  { skill: 'Statistics', from: 68, to: 82, delta: 14 },
  { skill: 'Data Analytics', from: 50, to: 68, delta: 18 },
  { skill: 'Python', from: 22, to: 45, delta: 23 },
  { skill: 'Machine Learning', from: 18, to: 38, delta: 20 },
  { skill: 'Digital Governance', from: 52, to: 64, delta: 12 },
  { skill: 'Data Visualization', from: 50, to: 58, delta: 8 },
];

export const learningActivity = {
  labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
  values: [2, 4, 3, 6, 5, 3, 7, 4],
  unit: 'hours',
};

export const completedCourses = [
  {
    id: 'CRS-STAT-SAMPLING',
    title: 'Survey Sampling and Estimation Techniques',
    completedOn: '2024-04-18',
    durationHours: 40,
    skill: 'Statistics',
  },
  {
    id: 'CRS-GOV-DATA',
    title: 'Introduction to Official Statistics Data Systems',
    completedOn: '2025-01-30',
    durationHours: 10,
    skill: 'Digital Governance',
  },
  {
    id: 'CRS-STAT-INFER',
    title: 'Statistical Inference Refresher',
    completedOn: '2026-02-14',
    durationHours: 5,
    skill: 'Statistics',
  },
];

export const milestones = [
  {
    id: 'MIL-1',
    date: '2026-08-21',
    title: 'Machine Learning Foundations Check completed',
    detail: 'Scored 38%. Competency updated and recommendations refreshed.',
    type: 'assessment',
  },
  {
    id: 'MIL-2',
    date: '2026-07-30',
    title: 'Python for Data Analysis — Module 4 completed',
    detail: 'Python competency moved from 42 to 45.',
    type: 'course',
  },
  {
    id: 'MIL-3',
    date: '2026-06-18',
    title: 'Python for Data Analysis — Level 1 assessment',
    detail: 'Scored 44%. Data cleaning identified as a weak subtopic.',
    type: 'assessment',
  },
  {
    id: 'MIL-4',
    date: '2026-05-04',
    title: 'Statistics Proficiency Check completed',
    detail: 'Scored 71%. Statistics confirmed as a strength area.',
    type: 'assessment',
  },
  {
    id: 'MIL-5',
    date: '2026-02-14',
    title: 'Statistical Inference Refresher completed',
    detail: 'Statistics competency moved from 76 to 80.',
    type: 'course',
  },
];
