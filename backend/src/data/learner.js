/**
 * Single predefined learner for GET /api/learner.
 * File-based only — no database in this phase.
 */
const learner = {
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

module.exports = { learner };
