/**
 * MOCK DATA — the learner's Skill Journey.
 *
 * The journey is the spine of the interface: every stage maps to a real page,
 * so skills, gaps, assessments, learning and progress read as one loop rather
 * than as unrelated screens.
 */

export const journeyStages = [
  {
    id: 'profile',
    label: 'Profile',
    caption: 'Role and background',
    icon: 'user',
    to: '/app/profile',
    status: 'complete',
    detail: 'Mapped to the Data Analyst role.',
  },
  {
    id: 'assess',
    label: 'Assess',
    caption: 'Measure competency',
    icon: 'assessment',
    to: '/app/assessment',
    status: 'complete',
    detail: '4 assessments completed.',
  },
  {
    id: 'analyse',
    label: 'Analyse',
    caption: 'Score each skill',
    icon: 'chart',
    to: '/app/skills',
    status: 'complete',
    detail: '10 skills scored on one scale.',
  },
  {
    id: 'gaps',
    label: 'Identify gaps',
    caption: 'Compare with target',
    icon: 'target',
    to: '/app/skills',
    status: 'current',
    detail: '6 skills below the role target.',
  },
  {
    id: 'recommend',
    label: 'Recommend',
    caption: 'Build the path',
    icon: 'sparkles',
    to: '/app/recommendations',
    status: 'upcoming',
    detail: '6 resources ranked for you.',
  },
  {
    id: 'learn',
    label: 'Learn',
    caption: 'Work through it',
    icon: 'book',
    to: '/app/learning',
    status: 'upcoming',
    detail: '2 courses in progress.',
  },
  {
    id: 'reassess',
    label: 'Re-assess',
    caption: 'Update and adapt',
    icon: 'clock',
    to: '/app/progress',
    status: 'upcoming',
    detail: 'Due after your next module.',
  },
];

/** Short line explaining where the learner currently stands in the loop. */
export const journeySummary = {
  currentStageId: 'gaps',
  headline: 'You are at the skill-gap stage',
  detail:
    'Your competency has been scored. Two skills are far enough below your role target to need attention first.',
};
