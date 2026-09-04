import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Icon from '../../components/common/Icon';
import MockNotice from '../../components/common/MockNotice';
import ProgressBar from '../../components/common/ProgressBar';
import { adminAssessments, adminStats } from '../../data/mockAdmin';
import './admin.css';

function scoreTone(score) {
  if (score >= 65) return 'met';
  if (score >= 50) return 'moderate';
  return 'critical';
}

function AssessmentManagementPage() {
  const published = adminAssessments.filter((item) => item.status === 'published');
  const totalAttempts = adminAssessments.reduce((sum, item) => sum + item.attempts, 0);
  const averageScore = Math.round(
    published.reduce((sum, item) => sum + item.avgScore, 0) / published.length
  );

  return (
    <>
      <PageHeader
        eyebrow="Assessment management"
        title="Assessments"
        description="Question sets, attempt volumes and average performance across the organisation."
        actions={
          <button type="button" className="btn" disabled>
            <Icon name="plus" size={16} />
            Create assessment
          </button>
        }
      />

      <MockNotice>
        Sample data. Authoring questions, publishing assessments and storing attempts require
        the backend and database phases.
      </MockNotice>

      <div className="grid grid-4">
        <StatCard label="Assessments" value={adminAssessments.length} icon="assessment" />
        <StatCard label="Published" value={published.length} icon="check" tone="met" />
        <StatCard
          label="Total attempts"
          value={totalAttempts.toLocaleString('en-IN')}
          hint="all time"
          icon="chart"
          tone="accent"
        />
        <StatCard
          label="Average score"
          value={averageScore}
          unit="%"
          hint={`org competency ${adminStats.averageCompetency}%`}
          icon="target"
        />
      </div>

      <Card
        title="Assessment catalogue"
        subtitle="Average score indicates where learners struggle most"
        bodyClass="card-body--flush"
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Skills covered</th>
                <th>Questions</th>
                <th>Attempts</th>
                <th>Average score</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {adminAssessments.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="small strong">{item.title}</span>
                    <span className="tiny mono muted" style={{ display: 'block' }}>
                      {item.id}
                    </span>
                  </td>
                  <td className="tiny muted">{item.skills}</td>
                  <td className="mono">{item.questions}</td>
                  <td className="mono">{item.attempts.toLocaleString('en-IN')}</td>
                  <td>
                    {item.attempts === 0 ? (
                      <span className="tiny muted">No attempts</span>
                    ) : (
                      <div className="competency-cell">
                        <span className="tiny strong">{item.avgScore}%</span>
                        <ProgressBar value={item.avgScore} height={5} />
                      </div>
                    )}
                  </td>
                  <td>
                    <Badge tone={item.status === 'published' ? 'met' : 'neutral'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="icon-btn" disabled aria-label="Edit">
                        <Icon name="edit" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Where learners struggle" subtitle="Published assessments by average score">
        <ul className="org-gaps">
          {published
            .slice()
            .sort((a, b) => a.avgScore - b.avgScore)
            .map((item) => (
              <li key={item.id}>
                <div className="row-between" style={{ marginBottom: 6 }}>
                  <span className="small strong">{item.title}</span>
                  <Badge tone={scoreTone(item.avgScore)}>{item.avgScore}%</Badge>
                </div>
                <ProgressBar value={item.avgScore} height={7} />
                <p className="tiny muted" style={{ marginTop: 4 }}>
                  {item.attempts.toLocaleString('en-IN')} attempts · {item.skills}
                </p>
              </li>
            ))}
        </ul>
      </Card>
    </>
  );
}

export default AssessmentManagementPage;
