import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import ComparisonBar from '../components/charts/ComparisonBar';
import { skillGapAnalysis, priorityLabels } from '../data/mockSkills';
import { priorityColor, priorityTone } from '../utils/format';
import './LandingPage.css';

const capabilities = [
  {
    icon: 'target',
    title: 'Role-based competency mapping',
    text: 'Every role in the statistical system defines the skills it needs and the level expected for each one. Your competency is measured against that benchmark, not a generic course catalogue.',
  },
  {
    icon: 'assessment',
    title: 'Skill assessment',
    text: 'Structured assessments measure competency at the level of individual skills and subtopics, so weaknesses are located precisely rather than summarised in a single score.',
  },
  {
    icon: 'chart',
    title: 'Skill-gap intelligence',
    text: 'Gaps are quantified and prioritised — critical, high, moderate or small — so limited learning time goes to the skills that matter most for your role.',
  },
  {
    icon: 'sparkles',
    title: 'Personalised recommendations',
    text: 'Learning suggestions are drawn from your role, current competency, assessment performance and course history, and every suggestion explains why it was made.',
  },
];

const cycle = [
  { step: 'Profile', text: 'Role, education, experience and career goal' },
  { step: 'Assess', text: 'Structured skill assessments' },
  { step: 'Analyse', text: 'Competency measured against role requirements' },
  { step: 'Identify gaps', text: 'Gaps quantified and prioritised' },
  { step: 'Recommend', text: 'Targeted learning path' },
  { step: 'Learn', text: 'Courses and learning resources' },
  { step: 'Re-assess', text: 'Competency updated, recommendations adapt' },
];

const previewSkills = skillGapAnalysis.slice(0, 4);

function LandingPage() {
  return (
    <div className="landing">
      <header className="landing__nav">
        <Link to="/" className="landing__brand">
          <span className="landing__logo">SF</span>
          SkillForge AI
        </Link>
        <nav className="landing__nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#cycle">How it works</a>
          <a href="#framework">Skill framework</a>
        </nav>
        <div className="row">
          <Link to="/admin" className="btn btn-secondary btn-sm">
            Admin view
          </Link>
          <Link to="/app" className="btn btn-sm">
            Open learner dashboard
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="landing__eyebrow">
            Capacity building for India&apos;s Official Statistical System
          </p>
          <h1>
            Know exactly which skills your role needs — and which ones you are missing.
          </h1>
          <p className="hero__lead">
            SkillForge AI measures competency against role-specific requirements, quantifies
            the gaps, and builds a personalised learning path that adapts as your assessment
            results change.
          </p>
          <div className="hero__actions">
            <Link to="/app" className="btn btn-lg">
              Explore the learner dashboard
              <Icon name="arrowRight" size={17} />
            </Link>
            <Link to="/app/skills" className="btn btn-lg btn-secondary">
              See a skill-gap analysis
            </Link>
          </div>
          <dl className="hero__facts">
            <div>
              <dt>10</dt>
              <dd>skills tracked across the framework</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>roles with distinct competency targets</dd>
            </div>
            <div>
              <dt>4</dt>
              <dd>gap levels from critical to none</dd>
            </div>
          </dl>
        </div>

        <aside className="hero__panel" aria-label="Example skill gap analysis">
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
            Illustrative figures. Competency scoring and gap intelligence are produced by the
            platform&apos;s analysis layer.
          </p>
        </aside>
      </section>

      <section id="capabilities" className="landing__section">
        <div className="landing__section-head">
          <p className="landing__eyebrow">What the platform does</p>
          <h2>Learning driven by measured competency, not guesswork</h2>
          <p className="landing__section-lead">
            A generic list of courses cannot tell an officer what their role requires or where
            they stand. SkillForge AI closes that distance with a measurable competency model.
          </p>
        </div>

        <div className="grid grid-2">
          {capabilities.map((item) => (
            <article key={item.title} className="feature">
              <span className="feature__icon">
                <Icon name={item.icon} size={19} />
              </span>
              <h3>{item.title}</h3>
              <p className="small">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cycle" className="landing__section landing__section--alt">
        <div className="landing__section-head">
          <p className="landing__eyebrow">How it works</p>
          <h2>A continuous learning cycle</h2>
          <p className="landing__section-lead">
            Each assessment updates the learner&apos;s competency, which in turn changes what
            the platform recommends next. The path becomes more specific with every cycle.
          </p>
        </div>

        <ol className="cycle">
          {cycle.map((item, index) => (
            <li key={item.step}>
              <span className="cycle__num">{index + 1}</span>
              <div>
                <h4>{item.step}</h4>
                <p className="tiny muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="framework" className="landing__section">
        <div className="landing__section-head">
          <p className="landing__eyebrow">Skill framework</p>
          <h2>One framework, different targets per role</h2>
          <p className="landing__section-lead">
            The same skill can be essential for one role and peripheral for another. Targets are
            defined per role, so a gap always means something concrete.
          </p>
        </div>

        <div className="framework">
          <div className="framework__col">
            <h4>Technical</h4>
            <ul>
              <li>Python</li>
              <li>GIS</li>
              <li>Cloud Computing</li>
            </ul>
          </div>
          <div className="framework__col">
            <h4>Analytics</h4>
            <ul>
              <li>Statistics</li>
              <li>Data Analytics</li>
              <li>Machine Learning</li>
              <li>Data Visualization</li>
            </ul>
          </div>
          <div className="framework__col">
            <h4>Digital &amp; Governance</h4>
            <ul>
              <li>Digital Governance</li>
            </ul>
          </div>
          <div className="framework__col">
            <h4>Behavioural</h4>
            <ul>
              <li>Communication</li>
              <li>Management &amp; Behavioural</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="landing__cta">
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
      </section>

      <footer className="landing__footer">
        <p className="tiny muted">
          SkillForge AI — Intelligent Skill Assessment and Personalized Learning Platform.
        </p>
        <p className="tiny muted">
          Frontend build. All figures shown across the application are sample data.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
