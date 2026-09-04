/** Sidebar navigation definitions for the two areas of the application. */

export const learnerNav = [
  { to: '/app', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/app/profile', label: 'My Profile', icon: 'user' },
  { to: '/app/skills', label: 'Skills & Competency', icon: 'target' },
  { to: '/app/assessment', label: 'Assessments', icon: 'assessment' },
  { to: '/app/recommendations', label: 'Recommendations', icon: 'sparkles' },
  { to: '/app/learning', label: 'Learning Resources', icon: 'book' },
  { to: '/app/progress', label: 'My Progress', icon: 'chart' },
  { to: '/app/assistant', label: 'AI Assistant', icon: 'sparkles' },
];

export const adminNav = [
  { to: '/admin', label: 'Admin Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/learners', label: 'Learner Management', icon: 'user' },
  { to: '/admin/skills', label: 'Skills & Roles', icon: 'target' },
  { to: '/admin/courses', label: 'Courses & Material', icon: 'book' },
  { to: '/admin/assessments', label: 'Assessments', icon: 'assessment' },
];
