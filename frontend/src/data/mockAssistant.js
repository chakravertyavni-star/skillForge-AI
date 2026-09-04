/**
 * MOCK DATA — AI learning assistant interface.
 *
 * IMPORTANT: this is a UI prototype only. No LLM, no API call, no model.
 * Replies are picked from the fixed list below by simple keyword matching so
 * the interface can be demonstrated. A real assistant will be added in a much
 * later phase, served through the Node backend and the Python AI service.
 */

export const assistantIntro = {
  title: 'AI Learning Assistant',
  subtitle: 'Interface preview — replies below are scripted mock text, not a live model.',
  capabilities: [
    'Explain why a skill was flagged as a gap',
    'Suggest what to study next',
    'Break a course down into a weekly plan',
    'Clarify concepts from your learning material',
  ],
};

export const suggestedPrompts = [
  'Why is Machine Learning my top priority?',
  'What should I study this week?',
  'Explain overfitting in simple terms',
  'How do I improve my Python score?',
];

export const assistantGreeting = {
  id: 'MSG-0',
  role: 'assistant',
  text: "Hello Ananya. I can help you understand your skill gaps and plan your learning. Ask me anything, or pick one of the suggestions below.\n\nNote: in this phase my replies are pre-written mock text.",
};

/**
 * Keyword-matched canned replies. `keywords` is checked against the lowercased
 * user message; the first match wins, otherwise `fallbackReply` is used.
 */
export const scriptedReplies = [
  {
    id: 'REP-ML',
    keywords: ['machine learning', 'ml', 'priority'],
    text: "Machine Learning is your top priority because your current competency is 38 while your Data Analyst role requires 70 — a 32-point gap, the largest in your profile.\n\nBoth machine learning questions in your last assessment were answered incorrectly, and no prior training is recorded for this skill.\n\nSuggested starting point: Machine Learning Fundamentals (18 hours, beginner level).",
  },
  {
    id: 'REP-WEEK',
    keywords: ['this week', 'study', 'plan', 'next'],
    text: "Here is a suggested week based on your current gaps:\n\n1. Machine Learning Fundamentals — Modules 3 and 4 (about 4 hours)\n2. Python for Data Analysis — Module 5, which covers selective missing-value handling (about 2 hours)\n3. Re-attempt the Machine Learning Foundations Check at the end of the week\n\nThat keeps you on the two skills furthest below your role requirement.",
  },
  {
    id: 'REP-OVERFIT',
    keywords: ['overfit', 'overfitting', 'generalis', 'generaliz'],
    text: "Overfitting means a model has memorised the training data instead of learning the general pattern.\n\nA typical sign is a large gap between training and unseen performance — for example 98% on training data but 61% on new data.\n\nCommon remedies: simplify the model, use cross-validation, add regularisation, or collect more representative data.",
  },
  {
    id: 'REP-PY',
    keywords: ['python', 'pandas', 'cleaning'],
    text: "Your Python competency is 45 against a required level of 80.\n\nThe fastest gains available to you:\n\n• Finish Python for Data Analysis — you are already 40% through it\n• Take the 8-hour Data Cleaning and Validation workshop, which targets the exact topic you scored 0% on\n\nAfter that, re-assess so your competency score reflects the new learning.",
  },
  {
    id: 'REP-GAP',
    keywords: ['gap', 'skill gap', 'behind'],
    text: "You currently have 6 skills below your role requirement:\n\n• Machine Learning — 38 / 70 (critical)\n• Python — 45 / 80 (high)\n• Data Analytics — 68 / 80 (moderate)\n• Data Visualization — 58 / 70 (moderate)\n• Cloud Computing — 20 / 30 (small)\n• GIS — 35 / 40 (small)\n\nFour skills already meet or exceed the requirement, including Statistics at 82.",
  },
  {
    id: 'REP-ASSESS',
    keywords: ['assessment', 'test', 'quiz', 'retake'],
    text: "You have taken 4 assessments so far, most recently the Machine Learning Foundations Check on 21 August 2026 (38%).\n\nRetaking an assessment updates your competency score, which in turn refreshes your recommendations. A retake is suggested once you have completed a related course or module.",
  },
];

export const fallbackReply =
  "In this phase I only have a small set of pre-written answers, so I cannot respond to that yet.\n\nTry asking about your skill gaps, Machine Learning, Python, or what to study this week. A live AI assistant will be connected in a later phase.";
