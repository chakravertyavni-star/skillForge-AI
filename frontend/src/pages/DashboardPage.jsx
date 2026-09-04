import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import GaugeRing from '../components/charts/GaugeRing';
import LineChart from '../components/charts/LineChart';
import SkillGapList from '../components/skills/SkillGapList';
import { learner, learnerStats, quickActions } from '../data/mockLearner';
import { skillGapAnalysis } from '../data/mockSkills';
import { recommendations } from '../data/mockRecommendations';
import { assessmentHistory } from '../data/mockAssessments';
import { competencyTrend } from '../data/mockProgress';
import { priorityTone, priorityColor, formatDate } from '../utils/format';
import './DashboardPage.css';

const gapSkills = skillGapAnalysis.filter((item) => item.gap > 0);
const topSkills = skillGapAnalysis.slice(0, 5);
const topRecommendations = recommendations.slice(0, 3);
const latestAttempt = assessmentHistory[assessmentHistory.length - 1];

function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${learner.designation} · ${learner.division}`}
        title={`Welcome back, ${learner.name.split(' ')[0]}`}
        description={`Your competency is measured against the ${learner.roleTitle} role. ${gapSkills.length} of ${learnerStats.skillsTracked} skills are currently below the required level.`}
        actions={
          <>
            <Link to="/app/assessment" className="btn btn-secondary">
              Take an assessment
            </Link>
            <Link to="/app/recommendations" className="btn">
              View learning path
            </Link>
          </>
        }
      />

      <MockNotice>
        This build runs entirely on sample data. No backend, database or AI service is connected
        yet.
      </MockNotice>

      <div className="grid grid-4">
        <StatCard
          label="Overall competency"
          value={learnerStats.overallCompetency}
          unit="%"
          delta={learnerStats.overallCompetencyDelta}
          hint="since July"
          icon="chart"
        />
        <StatCard
          label="Skills meeting target"
          value={`${learnerStats.skillsMeetingTarget}/${learnerStats.skillsTracked}`}
          hint="for your role"
          icon="check"
          tone="met"
        />
        <StatCard
          label="Critical gaps"
          value={learnerStats.criticalGaps}
          hint="need immediate attention"
          icon="alert"
          tone="critical"
        />
        <StatCard
          label="Learning this month"
          value={learnerStats.learningHoursThisMonth}
          unit="h"
          hint={`${learnerStats.coursesInProgress} courses in progress`}
          icon="book"
          tone="accent"
        />
      </div>

      <div className="dash-split">
        <Card
          title="Competency overview"
          subtitle={`Role benchmark: ${learner.roleTitle}`}
          action={
            <Link to="/app/skills" className="btn btn-sm btn-ghost">
              Details
            </Link>
          }
        >
          <div className="dash-competency">
            <GaugeRing
              value={learnerStats.overallCompetency}
              label="Overall"
              sublabel="Composite index across role-relevant skills"
            />
            <div className="dash-competency__skills">
              <SkillGapList items={topSkills} />
            </div>
          </div>
        </Card>

        <Card
          title="Skill gap priority"
          subtitle="Where your learning time matters most"
          action={
            <Link to="/app/skills" className="btn btn-sm btn-ghost">
              Full analysis
            </Link>
          }
        >
          <ol className="gap-rank">
            {gapSkills.slice(0, 4).map((item, index) => (
              <li key={item.skillId}>
                <span className="gap-rank__num">{index + 1}</span>
                <div className="gap-rank__body">
                  <div className="row-between">
                    <span className="small strong">{item.skill}</span>
                    <Badge tone={priorityTone(item.priority)}>{item.priority}</Badge>
                  </div>
                  <p className="tiny muted">
                    {item.currentScore} against a required {item.requiredScore} — gap of{' '}
                    <strong style={{ color: priorityColor(item.priority) }}>{item.gap}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="dash-split">
        <Card
          title="Competency growth"
          subtitle="Overall index over the last 7 months"
          action={
            <Link to="/app/progress" className="btn btn-sm btn-ghost">
              Progress
            </Link>
          }
        >
          <LineChart labels={competencyTrend.labels} series={competencyTrend.series} unit="%" />
        </Card>

        <Card title="Most recent assessment" subtitle={formatDate(latestAttempt.date)}>
          <div className="dash-assessment">
            <div>
              <p className="strong">{latestAttempt.assessmentTitle}</p>
              <p className="tiny muted">
                {latestAttempt.questions} questions · focus on {latestAttempt.focus}
              </p>
            </div>
            <span className="dash-assessment__score">{latestAttempt.scorePercent}%</span>
          </div>
          <hr className="divider" style={{ margin: '14px 0' }} />
          <ul className="dash-history">
            {assessmentHistory
              .slice()
              .reverse()
              .slice(1)
              .map((attempt) => (
                <li key={attempt.id}>
                  <span className="small">{attempt.assessmentTitle}</span>
                  <span className="row">
                    <span className="tiny muted">{formatDate(attempt.date)}</span>
                    <span className="small strong">{attempt.scorePercent}%</span>
                  </span>
                </li>
              ))}
          </ul>
          <Link
            to="/app/assessment/results"
            className="btn btn-sm btn-secondary"
            style={{ marginTop: 14 }}
          >
            View detailed result
          </Link>
        </Card>
      </div>

      <Card
        title="Recommended for you"
        subtitle="Based on your role, competency and assessment history"
        action={
          <Link to="/app/recommendations" className="btn btn-sm btn-ghost">
            All recommendations
          </Link>
        }
      >
        <div className="grid grid-3">
          {topRecommendations.map((item) => (
            <article key={item.id} className="dash-rec">
              <div className="row wrap" style={{ marginBottom: 8 }}>
                <Badge tone={priorityTone(item.priority)}>{item.priority}</Badge>
                <span className="badge badge-neutral">{item.durationHours} h</span>
              </div>
              <h4>{item.title}</h4>
              <p className="tiny muted dash-rec__reason">{item.reason}</p>
              <Link to="/app/recommendations" className="small dash-rec__link">
                Why this? <Icon name="arrowRight" size={13} />
              </Link>
            </article>
          ))}
        </div>
      </Card>

      <Card title="Quick actions">
        <div className="grid grid-4">
          {quickActions.map((action) => (
            <Link key={action.id} to={action.to} className="quick-action">
              <span className="quick-action__icon">
                <Icon name={action.icon} size={18} />
              </span>
              <span>
                <strong className="small">{action.label}</strong>
                <span className="tiny muted">{action.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}

export default DashboardPage;
