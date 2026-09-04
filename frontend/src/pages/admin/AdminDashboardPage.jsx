import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import MockNotice from '../../components/common/MockNotice';
import ProgressBar from '../../components/common/ProgressBar';
import ComparisonBar from '../../components/charts/ComparisonBar';
import {
  adminStats,
  departmentGapSummary,
  organisationSkillGaps,
  adminActivity,
} from '../../data/mockAdmin';
import './admin.css';

function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Organisation overview"
        description="Competency and skill-gap position across departments in the statistical system."
      />

      <MockNotice>
        Administration screens are UI only in this phase. All figures are sample data and no
        action on these pages saves anything.
      </MockNotice>

      <div className="grid grid-4">
        <StatCard label="Total learners" value={adminStats.totalLearners} icon="user" />
        <StatCard
          label="Active this month"
          value={adminStats.activeThisMonth}
          hint={`${Math.round((adminStats.activeThisMonth / adminStats.totalLearners) * 100)}% of learners`}
          icon="chart"
          tone="accent"
        />
        <StatCard
          label="Average competency"
          value={adminStats.averageCompetency}
          unit="%"
          hint="across all roles"
          icon="target"
        />
        <StatCard
          label="Learners with critical gaps"
          value={adminStats.criticalGapLearners}
          hint="need priority intervention"
          icon="alert"
          tone="critical"
        />
      </div>

      <div className="admin-split">
        <Card
          title="Organisation-wide skill gaps"
          subtitle="Average current level against average required level"
          action={
            <Link to="/admin/skills" className="btn btn-sm btn-ghost">
              Manage skills
            </Link>
          }
        >
          <ul className="org-gaps">
            {organisationSkillGaps.map((item) => {
              const gap = item.avgRequired - item.avgCurrent;
              const tone = gap > 25 ? 'critical' : gap > 12 ? 'high' : gap > 0 ? 'moderate' : 'met';
              const color =
                gap > 25 ? '#b42318' : gap > 12 ? '#b54708' : gap > 0 ? '#a16207' : '#027a48';
              return (
                <li key={item.skill}>
                  <div className="row-between" style={{ marginBottom: 6 }}>
                    <span className="small strong">{item.skill}</span>
                    <div className="row">
                      <span className="tiny muted mono">
                        {item.avgCurrent} / {item.avgRequired}
                      </span>
                      <Badge tone={tone}>{gap > 0 ? `gap ${gap}` : 'met'}</Badge>
                    </div>
                  </div>
                  <ComparisonBar
                    current={item.avgCurrent}
                    required={item.avgRequired}
                    color={color}
                    height={8}
                  />
                  <p className="tiny muted" style={{ marginTop: 4 }}>
                    {item.learnersBelow} learners below the required level
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="stack">
          <Card title="Departments" subtitle="Average competency by department">
            <ul className="dept-list">
              {departmentGapSummary.map((dept) => (
                <li key={dept.department}>
                  <div className="row-between" style={{ marginBottom: 5 }}>
                    <span className="small strong">{dept.department}</span>
                    <span className="tiny muted mono">{dept.avgCompetency}%</span>
                  </div>
                  <ProgressBar value={dept.avgCompetency} height={6} />
                  <p className="tiny muted" style={{ marginTop: 4 }}>
                    {dept.learners} learners · {dept.criticalGaps} with critical gaps
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent activity">
            <ul className="activity-list">
              {adminActivity.map((item) => (
                <li key={item.id}>
                  <p className="small">{item.text}</p>
                  <p className="tiny muted">{item.time}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card title="Management areas" subtitle="Interfaces prepared for the backend phase">
        <div className="grid grid-4">
          <Link to="/admin/learners" className="quick-action">
            <span className="quick-action__icon">
              <strong>{adminStats.totalLearners}</strong>
            </span>
            <span>
              <strong className="small">Learner management</strong>
              <span className="tiny muted">Profiles, roles and competency</span>
            </span>
          </Link>
          <Link to="/admin/skills" className="quick-action">
            <span className="quick-action__icon">
              <strong>10</strong>
            </span>
            <span>
              <strong className="small">Skills and roles</strong>
              <span className="tiny muted">Framework and requirements</span>
            </span>
          </Link>
          <Link to="/admin/courses" className="quick-action">
            <span className="quick-action__icon">
              <strong>{adminStats.coursesPublished}</strong>
            </span>
            <span>
              <strong className="small">Courses and material</strong>
              <span className="tiny muted">Catalogue and uploads</span>
            </span>
          </Link>
          <Link to="/admin/assessments" className="quick-action">
            <span className="quick-action__icon">
              <strong>5</strong>
            </span>
            <span>
              <strong className="small">Assessments</strong>
              <span className="tiny muted">Question sets and attempts</span>
            </span>
          </Link>
        </div>
      </Card>
    </>
  );
}

export default AdminDashboardPage;
