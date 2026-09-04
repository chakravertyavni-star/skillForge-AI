import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import ComparisonBar from '../components/charts/ComparisonBar';
import {
  skillGapAnalysis,
  priorityLabels,
  competencyLevels,
  skillCategories,
  skills,
  roles,
} from '../data/mockSkills';
import { priorityColor, priorityTone } from '../utils/format';
import './LandingPage.css';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'skill-framework', label: 'Skill Framework' },
  { id: 'ai-analytics', label: 'AI & Analytics' },
];

const capabilities = [
  {
    icon: 'assessment',
    title: 'Skill assessment',
    summary:
      'Structured assessments measure competency at the level of individual skills and subtopics rather than producing one undifferentiated score.',
    points: [
      'Question sets mapped to skills and topics',
      'Subtopic-level performance captured on every attempt',
      'Re-assessment keeps the competency profile current',
    ],
  },
  {
    icon: 'chart',
    title: 'Competency analysis',
    summary:
      'Every skill is scored on a single 0–100 scale and translated into a competency band, so a number always carries a meaning.',
    points: [
      'One consistent scale across the whole framework',
      'Five bands from Awareness through to Expert',
      'Competency history tracked over time',
    ],
  },
  {
    icon: 'target',
    title: 'Skill-gap identification',
    summary:
      'Current competency is compared against the target defined for the learner’s role, and the distance between them is quantified and ranked.',
    points: [
      'Role-specific targets, not a generic benchmark',
      'Gaps graded critical, high, moderate or small',
      'Each gap carries a written reason',
    ],
  },
  {
    icon: 'sparkles',
    title: 'Personalized learning',
    summary:
      'Learning is proposed against the gaps that matter most for the role, with the reasoning shown alongside every suggestion.',
    points: [
      'Ranked against role requirements and assessment results',
      'Prior training and course history taken into account',
      'Every recommendation states why it was made',
    ],
  },
];

const cycle = [
  {
    step: 'Profile',
    text: 'Role, designation, education, experience and career goal are recorded.',
  },
  {
    step: 'Assess',
    text: 'Structured assessments measure competency skill by skill.',
  },
  {
    step: 'Analyse',
    text: 'Results are converted into a competency score for each skill.',
  },
  {
    step: 'Identify gaps',
    text: 'Competency is compared with the role target and gaps are ranked.',
  },
  {
    step: 'Recommend',
    text: 'A learning path is proposed against the highest-priority gaps.',
  },
  {
    step: 'Learn',
    text: 'The learner works through courses and learning resources.',
  },
  {
    step: 'Re-assess',
    text: 'A new attempt updates competency and the path adapts again.',
  },
];

const aiCapabilities = [
  {
    icon: 'target',
    title: 'Competency and skill-gap intelligence',
    description:
      'Learner profile, assessment history and role requirements are combined to estimate competency and rank the resulting gaps.',
    input: 'Profile, assessment history, role requirements',
    output: 'Competency score and prioritised gap list per skill',
    explainable:
      'Each gap is returned with the scores it was derived from and a written reason, so a learner can see why a skill was flagged.',
  },
  {
    icon: 'sparkles',
    title: 'Personalized recommendation engine',
    description:
      'A transparent, content-based match between what the role requires, where the learner currently stands and what the catalogue offers.',
    input: 'Skill gaps, course metadata, learning history',
    output: 'Ranked resources with a match score',
    explainable:
      'Ranking is traceable to named inputs — the gap it targets and the signals that supported it — rather than an opaque score.',
  },
  {
    icon: 'book',
    title: 'Learning material understanding',
    description:
      'Uploaded course material is processed so that generated questions and explanations stay grounded in the source document.',
    input: 'Uploaded PDFs and course material',
    output: 'Extracted passages, source-grounded questions',
    explainable:
      'Generated content cites the passage it came from, so it can be checked against the original material.',
  },
  {
    icon: 'chart',
    title: 'Adaptive learning',
    description:
      'Detailed assessment performance identifies weak subtopics, updates competency and re-orders what is recommended next.',
    input: 'Subtopic-level assessment performance',
    output: 'Updated competency and a re-ranked learning path',
    explainable:
      'A change in the path can always be traced back to the specific assessment result that caused it.',
  },
];

const previewSkills = skillGapAnalysis.slice(0, 4);
const frameworkSkills = skillGapAnalysis.filter((item) => item.gap > 0).slice(0, 5);

function LandingPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // Highlights the navigation item for whichever section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      <header className="landing__nav">
        <Link to="/" className="landing__brand">
          <span className="landing__logo">SF</span>
          <span className="landing__brand-text">
            SkillForge<span> AI</span>
          </span>
        </Link>

        <nav className="landing__nav-links" aria-label="Landing page sections">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? 'is-active' : ''}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="landing__nav-actions">
          <Link to="/admin" className="btn btn-secondary btn-sm">
            Admin view
          </Link>
          <Link to="/app" className="btn btn-sm">
            Open learner dashboard
          </Link>
        </div>
      </header>

      {/* ---------- Overview ---------- */}
      <section id="overview" className="section section--hero">
        <div className="section__inner hero">
          <div className="hero__copy">
            <p className="landing__eyebrow">
              Capacity building for India&apos;s Official Statistical System
            </p>
            <h1>Know exactly which skills your role needs — and which ones you are missing.</h1>
            <p className="hero__lead">
              SkillForge AI measures competency against role-specific requirements, quantifies
              the gaps, and builds a personalised learning path that adapts as assessment
              results change.
            </p>

            <div className="hero__actions">
              <Link to="/app" className="btn btn-lg">
                Explore the learner dashboard
                <Icon name="arrowRight" size={17} />
              </Link>
              <a href="#how-it-works" className="btn btn-lg btn-secondary">
                See how it works
              </a>
            </div>

            <dl className="hero__facts">
              <div>
                <dt>{skills.length}</dt>
                <dd>skills tracked across the framework</dd>
              </div>
              <div>
                <dt>{roles.length}</dt>
                <dd>roles with distinct competency targets</dd>
              </div>
              <div>
                <dt>{competencyLevels.length}</dt>
                <dd>competency bands on a single scale</dd>
              </div>
            </dl>
          </div>

          <aside className="hero__panel" aria-label="Example competency profile">
            <div className="hero__panel-head">
              <div>
                <p className="eyebrow">Competency profile</p>
                <h3>Data Analyst</h3>
              </div>
              <span className="badge badge-brand">Sample</span>
            </div>

            <ul className="hero__skills">
              {previewSkills.map((item) => (
                <li key={item.skillId}>
                  <div className="row-between">
                    <span className="small strong">{item.skill}</span>
                    <span className={`badge badge-${priorityTone(item.priority)}`}>
                      {priorityLabels[item.priority]}
                    </span>
                  </div>
                  <ComparisonBar
                    current={item.currentScore}
                    required={item.requiredScore}
                    color={priorityColor(item.priority)}
                    height={8}
                  />
                  <p className="tiny muted mono">
                    current {item.currentScore} · required {item.requiredScore}
                    {item.gap > 0 ? ` · gap ${item.gap}` : ''}
                  </p>
                </li>
              ))}
            </ul>

            <p className="hero__panel-foot tiny muted">
              Illustrative figures shown to demonstrate the competency model.
            </p>
          </aside>
        </div>

        <div className="section__inner">
          <div className="purpose">
            <div className="purpose__lead">
              <p className="landing__eyebrow">Platform purpose</p>
              <h2>A generic course catalogue cannot answer the questions that matter</h2>
            </div>
            <div className="purpose__body">
              <p>
                Learners across the statistical system arrive with different roles, educational
                backgrounds, experience and prior training. A list of available courses tells
                them nothing about what their own role demands or where they currently fall
                short.
              </p>
              <ul className="purpose__questions">
                <li>Which skills does my role actually require?</li>
                <li>Which of those do I already have?</li>
                <li>Where are my gaps, and which ones matter most?</li>
                <li>What should I learn next, and why that?</li>
                <li>Is my competency genuinely improving?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section id="capabilities" className="section section--alt">
        <div className="section__inner">
          <header className="section__head">
            <p className="landing__eyebrow">Capabilities</p>
            <h2>Four capabilities that turn assessment into a learning decision</h2>
            <p className="section__lead">
              Each capability produces something the next one consumes, which is what makes the
              platform a cycle rather than a catalogue.
            </p>
          </header>

          <div className="capability-grid">
            {capabilities.map((item, index) => (
              <article key={item.title} className="capability">
                <div className="capability__top">
                  <span className="capability__icon">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <span className="capability__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="capability__summary">{item.summary}</p>
                <ul className="capability__points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={14} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className="section">
        <div className="section__inner">
          <header className="section__head">
            <p className="landing__eyebrow">How it works</p>
            <h2>One continuous cycle, from profile to re-assessment</h2>
            <p className="section__lead">
              Every assessment updates competency, and updated competency changes what the
              platform recommends next. The path becomes more specific with each pass.
            </p>
          </header>

          <ol className="cycle">
            {cycle.map((item, index) => (
              <li key={item.step}>
                <div className="cycle__marker">
                  <span className="cycle__num">{index + 1}</span>
                  {index < cycle.length - 1 && <span className="cycle__line" aria-hidden="true" />}
                </div>
                <div className="cycle__body">
                  <h4>{item.step}</h4>
                  <p className="small muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="cycle__loop">
            <Icon name="arrowUp" size={15} />
            Re-assessment feeds back into analysis, and the cycle begins again.
          </p>
        </div>
      </section>

      {/* ---------- Skill framework ---------- */}
      <section id="skill-framework" className="section section--alt">
        <div className="section__inner">
          <header className="section__head">
            <p className="landing__eyebrow">Skill framework</p>
            <h2>One scale, one framework, different targets per role</h2>
            <p className="section__lead">
              The same skill can be essential for one role and peripheral for another. Targets
              are defined per role, so a gap always means something concrete.
            </p>
          </header>

          <div className="framework-block">
            <div className="framework-block__head">
              <h3>Competency levels</h3>
              <p className="small muted">
                Every skill is scored 0–100 and reported as one of five bands.
              </p>
            </div>
            <ol className="levels">
              {competencyLevels.map((level) => (
                <li key={level.id}>
                  <span className="levels__range mono">{level.range}</span>
                  <h4>{level.label}</h4>
                  <p className="tiny muted">{level.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="framework-two">
            <div className="framework-block">
              <div className="framework-block__head">
                <h3>Required role skills</h3>
                <p className="small muted">
                  Target competency for each skill, shown across three roles.
                </p>
              </div>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Skill</th>
                      {roles.map((role) => (
                        <th key={role.id}>{role.title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill.id}>
                        <td className="strong">{skill.name}</td>
                        {roles.map((role) => (
                          <td key={role.id} className="mono">
                            {role.requirements[skill.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="framework-cats">
                {skillCategories.map((category) => (
                  <li key={category.id} className="badge badge-neutral">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="framework-block">
              <div className="framework-block__head">
                <h3>Current against required</h3>
                <p className="small muted">
                  The filled bar is current competency; the marker is the role target.
                </p>
              </div>
              <ul className="framework-compare">
                {frameworkSkills.map((item) => (
                  <li key={item.skillId}>
                    <div className="row-between">
                      <span className="small strong">{item.skill}</span>
                      <span className={`badge badge-${priorityTone(item.priority)}`}>
                        {priorityLabels[item.priority]}
                      </span>
                    </div>
                    <ComparisonBar
                      current={item.currentScore}
                      required={item.requiredScore}
                      color={priorityColor(item.priority)}
                      height={9}
                    />
                    <div className="framework-compare__meta tiny muted">
                      <span className="mono">current {item.currentScore}</span>
                      <span className="mono">required {item.requiredScore}</span>
                      <span className="mono">gap {item.gap}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/app/skills" className="btn btn-sm btn-secondary framework-compare__cta">
                Open the full skill-gap analysis
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- AI & analytics ---------- */}
      <section id="ai-analytics" className="section">
        <div className="section__inner">
          <header className="section__head">
            <p className="landing__eyebrow">AI &amp; analytics</p>
            <h2>Intelligence that can explain its own output</h2>
            <p className="section__lead">
              The platform is designed so that every analytical result can be traced back to the
              data that produced it. A learner should never be told to study something without
              being told why.
            </p>
          </header>

          <div className="ai-grid">
            {aiCapabilities.map((item) => (
              <article key={item.title} className="ai-card">
                <div className="ai-card__head">
                  <span className="ai-card__icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <h3>{item.title}</h3>
                </div>

                <p className="ai-card__desc">{item.description}</p>

                <dl className="ai-card__io">
                  <div>
                    <dt>Input</dt>
                    <dd>{item.input}</dd>
                  </div>
                  <div>
                    <dt>Output</dt>
                    <dd>{item.output}</dd>
                  </div>
                </dl>

                <div className="ai-card__why">
                  <p className="eyebrow">Why it stays explainable</p>
                  <p className="small">{item.explainable}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="ai-status">
            <span className="ai-status__icon">
              <Icon name="info" size={18} />
            </span>
            <div>
              <h4>Described as product capability, not as a shipped feature</h4>
              <p className="small">
                This build is the frontend only. No model, language model or analytics service is
                connected, and every figure shown across the platform is sample data. These
                capabilities describe how the intelligence layer is intended to work once it is
                built.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="section section--cta">
        <div className="section__inner landing__cta">
          <div>
            <h2>Open the platform</h2>
            <p className="small">
              Browse the learner workspace or the administration area. This build runs on sample
              data so every screen can be reviewed end to end.
            </p>
          </div>
          <div className="row wrap">
            <Link to="/app" className="btn btn-lg">
              Learner dashboard
            </Link>
            <Link to="/admin" className="btn btn-lg btn-secondary">
              Admin dashboard
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing__footer">
        <div className="section__inner landing__footer-inner">
          <p className="tiny muted">
            SkillForge AI — Intelligent Skill Assessment and Personalized Learning Platform.
          </p>
          <p className="tiny muted">
            Frontend build. All figures shown across the application are sample data.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
