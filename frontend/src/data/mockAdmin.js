/**
 * MOCK DATA — administrator views.
 * Nothing here is persisted. Admin CRUD APIs arrive in a later phase.
 */

export const adminStats = {
  totalLearners: 424,
  activeThisMonth: 287,
  assessmentsCompleted: 1362,
  coursesPublished: 38,
  averageCompetency: 64,
  criticalGapLearners: 96,
};

export const departmentGapSummary = [
  { department: 'NSSO — Field Operations', learners: 138, avgCompetency: 61, criticalGaps: 34 },
  { department: 'NSSO — Survey Design', learners: 96, avgCompetency: 70, criticalGaps: 17 },
  { department: 'Economic Statistics Division', learners: 84, avgCompetency: 66, criticalGaps: 21 },
  { department: 'Data Informatics Division', learners: 62, avgCompetency: 59, criticalGaps: 18 },
  { department: 'Capacity Building Cell', learners: 44, avgCompetency: 72, criticalGaps: 6 },
];

export const organisationSkillGaps = [
  { skill: 'Machine Learning', avgCurrent: 34, avgRequired: 65, learnersBelow: 312 },
  { skill: 'Python', avgCurrent: 48, avgRequired: 72, learnersBelow: 268 },
  { skill: 'Cloud Computing', avgCurrent: 27, avgRequired: 45, learnersBelow: 241 },
  { skill: 'Data Visualization', avgCurrent: 55, avgRequired: 68, learnersBelow: 186 },
  { skill: 'Data Analytics', avgCurrent: 62, avgRequired: 76, learnersBelow: 154 },
  { skill: 'GIS', avgCurrent: 38, avgRequired: 45, learnersBelow: 121 },
  { skill: 'Statistics', avgCurrent: 74, avgRequired: 78, learnersBelow: 88 },
  { skill: 'Communication', avgCurrent: 71, avgRequired: 70, learnersBelow: 62 },
];

export const adminLearners = [
  {
    id: 'LRN-2041',
    name: 'Ananya Deshpande',
    designation: 'Junior Statistical Officer',
    department: 'NSSO — Survey Design',
    role: 'Data Analyst',
    competency: 72,
    criticalGaps: 1,
    lastActive: '2026-09-03',
    status: 'active',
  },
  {
    id: 'LRN-2042',
    name: 'Ravi Krishnan',
    designation: 'Statistical Assistant',
    department: 'NSSO — Field Operations',
    role: 'Statistical Officer',
    competency: 58,
    criticalGaps: 3,
    lastActive: '2026-09-01',
    status: 'active',
  },
  {
    id: 'LRN-2043',
    name: 'Meera Iyer',
    designation: 'Deputy Director',
    department: 'Economic Statistics Division',
    role: 'Statistical Officer',
    competency: 81,
    criticalGaps: 0,
    lastActive: '2026-08-29',
    status: 'active',
  },
  {
    id: 'LRN-2044',
    name: 'Sandeep Yadav',
    designation: 'Data Processing Assistant',
    department: 'Data Informatics Division',
    role: 'Data Engineer',
    competency: 49,
    criticalGaps: 4,
    lastActive: '2026-08-12',
    status: 'inactive',
  },
  {
    id: 'LRN-2045',
    name: 'Priya Nair',
    designation: 'Junior Statistical Officer',
    department: 'NSSO — Survey Design',
    role: 'Data Analyst',
    competency: 67,
    criticalGaps: 2,
    lastActive: '2026-09-02',
    status: 'active',
  },
  {
    id: 'LRN-2046',
    name: 'Arjun Menon',
    designation: 'Senior Statistical Officer',
    department: 'Capacity Building Cell',
    role: 'Statistical Officer',
    competency: 77,
    criticalGaps: 0,
    lastActive: '2026-08-31',
    status: 'active',
  },
  {
    id: 'LRN-2047',
    name: 'Kavya Reddy',
    designation: 'Statistical Assistant',
    department: 'NSSO — Field Operations',
    role: 'Data Analyst',
    competency: 54,
    criticalGaps: 3,
    lastActive: '2026-08-27',
    status: 'active',
  },
  {
    id: 'LRN-2048',
    name: 'Imran Sheikh',
    designation: 'Data Processing Assistant',
    department: 'Data Informatics Division',
    role: 'Data Engineer',
    competency: 62,
    criticalGaps: 1,
    lastActive: '2026-09-03',
    status: 'active',
  },
];

export const adminSkillFramework = [
  { id: 'SKL-STAT', name: 'Statistics', category: 'Analytics', roles: 3, learnersTracked: 424 },
  { id: 'SKL-PY', name: 'Python', category: 'Technical', roles: 3, learnersTracked: 424 },
  { id: 'SKL-DA', name: 'Data Analytics', category: 'Analytics', roles: 3, learnersTracked: 424 },
  { id: 'SKL-ML', name: 'Machine Learning', category: 'Analytics', roles: 3, learnersTracked: 380 },
  { id: 'SKL-GIS', name: 'GIS', category: 'Technical', roles: 2, learnersTracked: 246 },
  { id: 'SKL-CLOUD', name: 'Cloud Computing', category: 'Technical', roles: 2, learnersTracked: 312 },
  {
    id: 'SKL-GOV',
    name: 'Digital Governance',
    category: 'Digital & Governance',
    roles: 3,
    learnersTracked: 424,
  },
  { id: 'SKL-VIZ', name: 'Data Visualization', category: 'Analytics', roles: 3, learnersTracked: 424 },
  { id: 'SKL-COMM', name: 'Communication', category: 'Behavioural', roles: 3, learnersTracked: 424 },
  {
    id: 'SKL-MGMT',
    name: 'Management & Behavioural',
    category: 'Behavioural',
    roles: 3,
    learnersTracked: 424,
  },
];

export const adminCourses = [
  {
    id: 'CRS-ML-101',
    title: 'Machine Learning Fundamentals',
    skill: 'Machine Learning',
    level: 'Beginner',
    durationHours: 18,
    enrolled: 1240,
    status: 'published',
    updatedOn: '2026-07-14',
  },
  {
    id: 'CRS-PY-DATA',
    title: 'Python for Data Analysis',
    skill: 'Python',
    level: 'Intermediate',
    durationHours: 24,
    enrolled: 2870,
    status: 'published',
    updatedOn: '2026-08-02',
  },
  {
    id: 'CRS-DA-APPLIED',
    title: 'Applied Data Analytics for Official Statistics',
    skill: 'Data Analytics',
    level: 'Intermediate',
    durationHours: 20,
    enrolled: 940,
    status: 'published',
    updatedOn: '2026-06-21',
  },
  {
    id: 'CRS-VIZ-STORY',
    title: 'Data Visualization and Statistical Storytelling',
    skill: 'Data Visualization',
    level: 'Intermediate',
    durationHours: 12,
    enrolled: 1120,
    status: 'published',
    updatedOn: '2026-05-30',
  },
  {
    id: 'CRS-CLOUD-INTRO',
    title: 'Cloud Fundamentals for Government Data Teams',
    skill: 'Cloud Computing',
    level: 'Beginner',
    durationHours: 4,
    enrolled: 760,
    status: 'draft',
    updatedOn: '2026-08-25',
  },
];

/**
 * Learning material list. Upload, text extraction and AI quiz generation are
 * later phases — the buttons in the UI are intentionally inert.
 */
export const adminLearningMaterial = [
  {
    id: 'MAT-1',
    fileName: 'ml-fundamentals-module-1.pdf',
    course: 'Machine Learning Fundamentals',
    pages: 42,
    uploadedOn: '2026-07-12',
    processingStatus: 'not-processed',
  },
  {
    id: 'MAT-2',
    fileName: 'pandas-data-cleaning-handbook.pdf',
    course: 'Python for Data Analysis',
    pages: 68,
    uploadedOn: '2026-08-01',
    processingStatus: 'not-processed',
  },
  {
    id: 'MAT-3',
    fileName: 'survey-sampling-notes.pdf',
    course: 'Survey Sampling and Estimation Techniques',
    pages: 120,
    uploadedOn: '2026-04-09',
    processingStatus: 'not-processed',
  },
];

export const adminAssessments = [
  {
    id: 'ASM-DA-CORE',
    title: 'Data Analyst Competency Assessment',
    skills: 'Statistics, Python, Data Analytics, ML',
    questions: 8,
    attempts: 486,
    avgScore: 61,
    status: 'published',
  },
  {
    id: 'ASM-ML-FOUND',
    title: 'Machine Learning Foundations Check',
    skills: 'Machine Learning',
    questions: 10,
    attempts: 312,
    avgScore: 44,
    status: 'published',
  },
  {
    id: 'ASM-PY-L1',
    title: 'Python for Data Analysis — Level 1',
    skills: 'Python',
    questions: 12,
    attempts: 528,
    avgScore: 52,
    status: 'published',
  },
  {
    id: 'ASM-STAT-PROF',
    title: 'Statistics Proficiency Check',
    skills: 'Statistics',
    questions: 10,
    attempts: 604,
    avgScore: 68,
    status: 'published',
  },
  {
    id: 'ASM-VIZ-L1',
    title: 'Data Visualization Basics',
    skills: 'Data Visualization',
    questions: 8,
    attempts: 0,
    avgScore: 0,
    status: 'draft',
  },
];

export const adminActivity = [
  {
    id: 'ACT-1',
    text: 'Kavya Reddy completed the Statistics Proficiency Check',
    time: '2 hours ago',
  },
  { id: 'ACT-2', text: 'Machine Learning Fundamentals updated to version 1.4', time: '5 hours ago' },
  { id: 'ACT-3', text: '12 learners enrolled in Python for Data Analysis', time: 'Yesterday' },
  { id: 'ACT-4', text: 'Role requirements updated for Data Engineer', time: '2 days ago' },
  { id: 'ACT-5', text: 'pandas-data-cleaning-handbook.pdf uploaded', time: '3 days ago' },
];
