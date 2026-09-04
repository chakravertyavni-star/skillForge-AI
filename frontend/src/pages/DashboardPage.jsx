import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import AnimatedNumber from '../components/common/AnimatedNumber';
import ExpandableCard from '../components/common/ExpandableCard';
import InfoHint from '../components/common/InfoHint';
import LineChart from '../components/charts/LineChart';
import ProgressBar from '../components/common/ProgressBar';
import JourneyStages from '../components/journey/JourneyStages';
import SkillJourney from '../components/journey/SkillJourney';
import { learner, learnerStats } from '../data/mockLearner';
import { skillGapAnalysis } from '../data/mockSkills';
import { recommendations } from '../data/mockRecommendations';
import { assessmentHistory } from '../data/mockAssessments';
import { competencyTrend } from '../data/mockProgress';
import { priorityTone, formatDate } from '../utils/format';
import './DashboardPage.css';

const topRecommendation = recommendations[0];
const latestAttempt = assessmentHistory[assessmentHistory.length - 1];
const gapCount = skillGapAnalysis.filter((item) => item.gap > 0).length;

function DashboardPage() {
  return (
    <div className="dash">
      <Reveal as="header" className="dash__hero">
        <div className="dash__intro">
          <p className="eyebrow">
            {learner.designation} · {learner.roleTitle}
          </p>
          <h1>Hello, {learner.name.split(' ')[0]}</h1>
          <p className="dash__line">
            <strong>{gapCount}</strong> of {learnerStats.skillsTracked} skills sit below your role
            target.
          </p>
        </div>

        <div className="dash__score">
          <div className="dash__score-ring" style={{ '--pct': learnerStats.overallCompetency }}>
            <span className="dash__score-value">
              <AnimatedNumber value={learnerStats.overallCompetency} suffix="%" />
            </span>
          </div>
          <div className="dash__score-meta">
            <span className="small strong">
              Overall competency
              <InfoHint
                label="Overall competency"
                text="A single index combining every skill your role needs, weighted by how far each one is from its target."
                align="right"
              />
            </span>
            <span className="dash__delta">
              <Icon name="arrowUp" size={12} />+{learnerStats.overallCompetencyDelta} since July
            </span>
          </div>
        </div>
      </Reveal>

      <JourneyStages />

      <Reveal>
        <SkillJourney
          items={skillGapAnalysis}
          title="Your skill map"
          subtitle="The shape is where you are. The dashed outline is where your role needs you to be."
        />
      </Reveal>

      <Reveal className="dash__row">
        <ExpandableCard
          title="Next recommendation"
          meta={topRecommendation.targetSkill}
          badge={<Badge tone={priorityTone(topRecommendation.priority)}>{topRecommendation.priority}</Badge>}
          moreLabel="Why this?"
          summary={
            <>
              <p className="small strong">{topRecommendation.title}</p>
              <p className="tiny muted">
                {topRecommendation.durationHours} hours · {topRecommendation.level}
              </p>
            </>
          }
        >
          <p className="small">{topRecommendation.reason}</p>
          <Link to="/app/recommendations" className="btn btn-sm btn-secondary">
            All recommendations
            <Icon name="arrowRight" size={14} />
          </Link>
        </ExpandableCard>

        <ExpandableCard
          title="Last assessment"
          meta={formatDate(latestAttempt.date)}
          badge={<Badge tone={latestAttempt.scorePercent >= 60 ? 'met' : 'high'}>{latestAttempt.scorePercent}%</Badge>}
          moreLabel="Earlier attempts"
          summary={
            <>
              <p className="small strong">{latestAttempt.assessmentTitle}</p>
              <ProgressBar value={latestAttempt.scorePercent} height={6} />
            </>
          }
        >
          <ul className="dash__history">
            {assessmentHistory
              .slice(0, -1)
              .reverse()
              .map((attempt) => (
                <li key={attempt.id}>
                  <span className="tiny">{attempt.assessmentTitle}</span>
                  <span className="tiny strong">{attempt.scorePercent}%</span>
                </li>
              ))}
          </ul>
          <Link to="/app/assessment" className="btn btn-sm btn-secondary">
            Take an assessment
            <Icon name="arrowRight" size={14} />
          </Link>
        </ExpandableCard>

        <ExpandableCard
          title="Learning in progress"
          meta={`${learnerStats.coursesInProgress} active · ${learnerStats.coursesCompleted} done`}
          badge={<Badge tone="brand">{learnerStats.learningHoursThisMonth} h</Badge>}
          moreLabel="This month"
          summary={
            <ProgressBar
              value={learnerStats.coursesCompleted}
              max={learnerStats.coursesCompleted + learnerStats.coursesInProgress}
              label="Courses completed"
              valueLabel={`${learnerStats.coursesCompleted}/${
                learnerStats.coursesCompleted + learnerStats.coursesInProgress
              }`}
              height={6}
            />
          }
        >
          <p className="small">
            You logged {learnerStats.learningHoursThisMonth} hours of learning this month across{' '}
            {learnerStats.coursesInProgress} active courses.
          </p>
          <Link to="/app/learning" className="btn btn-sm btn-secondary">
            Continue learning
            <Icon name="arrowRight" size={14} />
          </Link>
        </ExpandableCard>
      </Reveal>

      <Reveal className="dash__trend">
        <div className="dash__trend-head">
          <div>
            <p className="eyebrow">Competency over time</p>
            <h2>Steady climb since February</h2>
          </div>
          <Link to="/app/progress" className="btn btn-sm btn-secondary">
            Full progress
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
        <LineChart labels={competencyTrend.labels} series={competencyTrend.series} unit="%" />
      </Reveal>

      <p className="dash__note tiny muted">
        <Icon name="info" size={13} /> Every figure on this screen is sample data.
      </p>
    </div>
  );
}

export default DashboardPage;
