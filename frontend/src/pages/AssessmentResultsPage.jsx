import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import ProgressBar from '../components/common/ProgressBar';
import GaugeRing from '../components/charts/GaugeRing';
import { lastAssessmentResult, resultAnalysis } from '../data/mockAssessments';
import { formatDate } from '../utils/format';
import '../components/assessments/assessments.css';
import './AssessmentResultsPage.css';

function scoreColor(percent) {
  if (percent >= 75) return '#027a48';
  if (percent >= 50) return '#b54708';
  return '#b42318';
}

function AssessmentResultsPage() {
  const location = useLocation();

  // A result passed from the assessment page takes priority; otherwise show the
  // stored mock result so the page can be reviewed directly.
  const result = location.state?.result || lastAssessmentResult;
  const isFreshAttempt = Boolean(location.state?.result);

  const weakestTopics = result.topicBreakdown.filter((topic) => topic.percent < 100);
  const strongestTopics = result.topicBreakdown.filter((topic) => topic.percent === 100);

  return (
    <>
      <PageHeader
        eyebrow="Assessment result"
        title={result.assessmentTitle}
        description={`Submitted ${formatDate(result.submittedOn)} · ${result.durationMinutes} minutes`}
        actions={
          <>
            <Link to="/app/assessment" className="btn btn-secondary">
              Retake assessment
            </Link>
            <Link to="/app/recommendations" className="btn">
              See recommendations
            </Link>
          </>
        }
      />

      <MockNotice>
        {isFreshAttempt
          ? 'Your score and skill breakdown were tallied in the browser from the sample answer key. The written analysis below is fixed sample text.'
          : 'Showing a stored sample result. Take the assessment to generate a live breakdown from your own answers.'}
      </MockNotice>

      <Card>
        <div className="result-hero">
          <GaugeRing
            value={result.scorePercent}
            label="Score"
            color={scoreColor(result.scorePercent)}
          />
          <div className="result-hero__facts">
            <div className="row-between">
              <span className="small muted">Correct answers</span>
              <span className="strong">
                {result.correctAnswers} / {result.totalQuestions}
              </span>
            </div>
            <div className="row-between">
              <span className="small muted">Skills covered</span>
              <span className="strong">{result.skillBreakdown.length}</span>
            </div>
            <div className="row-between">
              <span className="small muted">Topics assessed</span>
              <span className="strong">{result.topicBreakdown.length}</span>
            </div>
            <div className="row-between">
              <span className="small muted">Time taken</span>
              <span className="strong">{result.durationMinutes} min</span>
            </div>
          </div>
          <div className="result-hero__note">
            <p className="eyebrow" style={{ marginBottom: 6 }}>
              What happens next
            </p>
            <p className="small muted">
              In the completed platform this result updates your competency profile, which
              changes your skill-gap analysis and refreshes your learning recommendations.
            </p>
          </div>
        </div>
      </Card>

      <div className="results-grid">
        <Card title="Skill-wise performance" subtitle="How you scored in each assessed skill">
          <ul className="result-skills">
            {result.skillBreakdown.map((item) => (
              <li key={item.skill}>
                <ProgressBar
                  value={item.percent}
                  color={scoreColor(item.percent)}
                  label={item.skill}
                  valueLabel={`${item.correct}/${item.total} · ${item.percent}%`}
                />
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Topic-level performance"
          subtitle="Weak subtopics matter more than the overall score"
        >
          <div className="topic-list">
            {result.topicBreakdown.map((topic) => (
              <div key={topic.topic} className="topic-row">
                <span className="small strong">{topic.topic}</span>
                <span className="tiny muted">{topic.skill}</span>
                <div className="topic-row__bar">
                  <ProgressBar
                    value={topic.percent}
                    color={scoreColor(topic.percent)}
                    height={5}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="results-grid">
        <Card title="Strengths" subtitle="Areas you answered confidently">
          <ul className="analysis-list is-strength">
            {resultAnalysis.strengths.map((item) => (
              <li key={item.skill}>
                <span className="small strong">{item.skill}</span>
                <span className="tiny">{item.note}</span>
              </li>
            ))}
          </ul>
          {strongestTopics.length > 0 && (
            <p className="tiny muted" style={{ marginTop: 12 }}>
              Topics answered correctly: {strongestTopics.map((t) => t.topic).join(', ')}.
            </p>
          )}
        </Card>

        <Card title="Weak areas" subtitle="Where the biggest improvement is available">
          <ul className="analysis-list is-weak">
            {resultAnalysis.weakAreas.map((item) => (
              <li key={item.skill}>
                <span className="small strong">{item.skill}</span>
                <span className="tiny">{item.note}</span>
              </li>
            ))}
          </ul>
          {weakestTopics.length > 0 && (
            <p className="tiny muted" style={{ marginTop: 12 }}>
              Topics to revisit: {weakestTopics.map((t) => t.topic).join(', ')}.
            </p>
          )}
        </Card>
      </div>

      <Card
        title="Improvement suggestions"
        subtitle="Sample guidance — generated advice arrives with the AI/ML service"
        footer={
          <div className="row-between wrap">
            <span className="tiny muted">
              <Icon name="info" size={13} /> Suggestions are fixed sample text in this build.
            </span>
            <Link to="/app/learning" className="btn btn-sm btn-secondary">
              Browse learning resources
            </Link>
          </div>
        }
      >
        <ol className="suggestion-list">
          {resultAnalysis.suggestions.map((suggestion, index) => (
            <li key={suggestion}>
              <span className="suggestion-list__num">{index + 1}</span>
              <p className="small">{suggestion}</p>
            </li>
          ))}
        </ol>
        <div className="row wrap" style={{ marginTop: 16 }}>
          <Badge tone="critical">Machine Learning needs attention</Badge>
          <Badge tone="high">Python data cleaning</Badge>
          <Badge tone="met">Statistics is a strength</Badge>
        </div>
      </Card>
    </>
  );
}

export default AssessmentResultsPage;
