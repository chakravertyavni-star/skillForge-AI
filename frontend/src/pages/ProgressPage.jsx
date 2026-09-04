import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import ProgressBar from '../components/common/ProgressBar';
import {
  competencyTrend,
  skillTrend,
  skillImprovement,
  learningActivity,
  completedCourses,
  milestones,
} from '../data/mockProgress';
import { assessmentHistory } from '../data/mockAssessments';
import { learnerStats } from '../data/mockLearner';
import { formatDate } from '../utils/format';
import './ProgressPage.css';

const activityData = learningActivity.labels.map((label, index) => ({
  label,
  value: learningActivity.values[index],
}));

const totalLearningHours = learningActivity.values.reduce((sum, value) => sum + value, 0);
const biggestGain = skillImprovement.reduce((max, item) => (item.delta > max.delta ? item : max));

function ProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="My progress"
        title="Competency over time"
        description="How your competency, assessments and learning activity have changed across the last seven months."
      />

      <MockNotice>
        Every figure and chart on this page is sample data. Real history will be built from
        stored assessment results once the database is connected.
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
          label="Biggest gain"
          value={`+${biggestGain.delta}`}
          hint={biggestGain.skill}
          icon="arrowUp"
          tone="met"
        />
        <StatCard
          label="Assessments taken"
          value={learnerStats.assessmentsTaken}
          hint={`last on ${formatDate(learnerStats.lastAssessedOn)}`}
          icon="assessment"
        />
        <StatCard
          label="Learning hours"
          value={totalLearningHours}
          unit="h"
          hint="last 8 weeks"
          icon="clock"
          tone="accent"
        />
      </div>

      <Card
        title="Overall competency growth"
        subtitle="Composite index across role-relevant skills"
      >
        <LineChart labels={competencyTrend.labels} series={competencyTrend.series} unit="%" />
      </Card>

      <div className="progress-grid">
        <Card title="Skill-wise trend" subtitle="Four skills tracked month by month">
          <LineChart labels={skillTrend.labels} series={skillTrend.series} unit="%" />
        </Card>

        <Card title="Weekly learning activity" subtitle="Hours spent on courses">
          <BarChart data={activityData} unit=" h" color="#0f766e" />
        </Card>
      </div>

      <div className="progress-grid">
        <Card title="Skill improvement" subtitle="February compared with August">
          <ul className="improvement-list">
            {skillImprovement.map((item) => (
              <li key={item.skill}>
                <div className="row-between" style={{ marginBottom: 6 }}>
                  <span className="small strong">{item.skill}</span>
                  <span className="row">
                    <span className="tiny muted mono">
                      {item.from} → {item.to}
                    </span>
                    <span className="improvement-list__delta">+{item.delta}</span>
                  </span>
                </div>
                <div className="improvement-list__track">
                  <span className="improvement-list__from" style={{ width: `${item.from}%` }} />
                  <span
                    className="improvement-list__gain"
                    style={{ left: `${item.from}%`, width: `${item.delta}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="tiny muted" style={{ marginTop: 14 }}>
            The darker segment is your starting level, the lighter segment is the gain.
          </p>
        </Card>

        <Card title="Assessment history" subtitle="All attempts so far">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {assessmentHistory
                  .slice()
                  .reverse()
                  .map((attempt) => (
                    <tr key={attempt.id}>
                      <td>
                        <span className="small strong">{attempt.assessmentTitle}</span>
                        <span className="tiny muted" style={{ display: 'block' }}>
                          {attempt.focus} · {attempt.questions} questions
                        </span>
                      </td>
                      <td className="tiny muted">{formatDate(attempt.date)}</td>
                      <td>
                        <Badge tone={attempt.scorePercent >= 60 ? 'met' : 'high'}>
                          {attempt.scorePercent}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="progress-grid">
        <Card title="Completed courses" subtitle={`${completedCourses.length} finished`}>
          <ul className="completed-list">
            {completedCourses.map((course) => (
              <li key={course.id}>
                <span className="completed-list__icon">
                  <Icon name="check" size={15} />
                </span>
                <div>
                  <p className="small strong">{course.title}</p>
                  <p className="tiny muted">
                    {course.skill} · {course.durationHours} h · completed{' '}
                    {formatDate(course.completedOn)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <hr className="divider" style={{ margin: '16px 0' }} />
          <ProgressBar
            value={learnerStats.coursesCompleted}
            max={learnerStats.coursesCompleted + learnerStats.coursesInProgress}
            label="Courses completed"
            valueLabel={`${learnerStats.coursesCompleted} of ${
              learnerStats.coursesCompleted + learnerStats.coursesInProgress
            }`}
          />
        </Card>

        <Card title="Recent milestones" subtitle="Assessments and course completions">
          <ul className="milestones">
            {milestones.map((item) => (
              <li key={item.id}>
                <span className={`milestones__dot is-${item.type}`} />
                <div>
                  <p className="tiny muted">{formatDate(item.date)}</p>
                  <p className="small strong">{item.title}</p>
                  <p className="tiny muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

export default ProgressPage;
