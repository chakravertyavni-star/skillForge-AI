import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import ProgressBar from '../components/common/ProgressBar';
import QuestionCard from '../components/assessments/QuestionCard';
import { assessmentCatalog, assessmentQuestions } from '../data/mockAssessments';
import { formatDate } from '../utils/format';
import './AssessmentPage.css';

const statusTone = {
  available: 'brand',
  'retake-due': 'high',
  completed: 'met',
};

const statusLabel = {
  available: 'Available',
  'retake-due': 'Retake due',
  completed: 'Completed',
};

/**
 * Builds the result object from the learner's answers.
 * This is a plain tally against the mock answer key — not a scoring model.
 * The real result will come from the backend in a later phase.
 */
function buildResult(answers, startedAt) {
  const correctIds = assessmentQuestions
    .filter((question) => answers[question.id] === question.correctOption)
    .map((question) => question.id);

  const skillMap = new Map();
  assessmentQuestions.forEach((question) => {
    const entry = skillMap.get(question.skill) || { skill: question.skill, correct: 0, total: 0 };
    entry.total += 1;
    if (correctIds.includes(question.id)) entry.correct += 1;
    skillMap.set(question.skill, entry);
  });

  const skillBreakdown = [...skillMap.values()].map((entry) => ({
    ...entry,
    percent: Math.round((entry.correct / entry.total) * 100),
  }));

  const topicBreakdown = assessmentQuestions.map((question) => ({
    topic: question.topic,
    skill: question.skill,
    percent: correctIds.includes(question.id) ? 100 : 0,
  }));

  const elapsedMinutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000));

  return {
    assessmentId: 'ASM-DA-CORE',
    assessmentTitle: 'Data Analyst Competency Assessment',
    submittedOn: new Date().toISOString().slice(0, 10),
    totalQuestions: assessmentQuestions.length,
    correctAnswers: correctIds.length,
    scorePercent: Math.round((correctIds.length / assessmentQuestions.length) * 100),
    durationMinutes: elapsedMinutes,
    skillBreakdown,
    topicBreakdown,
  };
}

function AssessmentPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('catalog');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startedAt, setStartedAt] = useState(null);

  const total = assessmentQuestions.length;
  const question = assessmentQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLast = currentIndex === total - 1;

  function startAssessment() {
    setAnswers({});
    setCurrentIndex(0);
    setStartedAt(Date.now());
    setStage('quiz');
  }

  function selectAnswer(questionId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function submit() {
    navigate('/app/assessment/results', { state: { result: buildResult(answers, startedAt) } });
  }

  if (stage === 'quiz') {
    return (
      <>
        <PageHeader
          eyebrow="Assessment in progress"
          title="Data Analyst Competency Assessment"
          description="Answer each question, then submit to see your skill-wise performance."
          actions={
            <button type="button" className="btn btn-secondary" onClick={() => setStage('catalog')}>
              Exit assessment
            </button>
          }
        />

        <Card>
          <div className="row-between assess-progress">
            <span className="small strong">
              {answeredCount} of {total} answered
            </span>
            <span className="tiny muted">
              <Icon name="clock" size={13} /> No time limit in this build
            </span>
          </div>
          <ProgressBar value={answeredCount} max={total} height={6} />
        </Card>

        <div className="assess-layout">
          <Card>
            <QuestionCard
              question={question}
              index={currentIndex}
              total={total}
              selected={answers[question.id]}
              onSelect={selectAnswer}
            />

            <div className="assess-controls">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((index) => index - 1)}
              >
                Previous
              </button>

              {isLast ? (
                <button
                  type="button"
                  className="btn"
                  disabled={answeredCount < total}
                  onClick={submit}
                >
                  Submit assessment
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setCurrentIndex((index) => index + 1)}
                >
                  Next question
                  <Icon name="arrowRight" size={16} />
                </button>
              )}
            </div>

            {isLast && answeredCount < total && (
              <p className="tiny muted" style={{ marginTop: 10 }}>
                Answer all {total} questions to submit. {total - answeredCount} remaining.
              </p>
            )}
          </Card>

          <Card title="Questions" subtitle="Jump to any question">
            <div className="q-nav">
              {assessmentQuestions.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${answers[item.id] !== undefined ? 'is-answered' : ''} ${
                    index === currentIndex ? 'is-current' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to question ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <hr className="divider" style={{ margin: '16px 0' }} />
            <p className="tiny muted">
              Answers are held in the browser only. Nothing is submitted to a server in this
              build.
            </p>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Assessments"
        title="Skill assessments"
        description="Assessments measure your competency at skill and subtopic level. Each completed attempt updates your competency profile and refreshes your recommendations."
        actions={
          <button type="button" className="btn" onClick={startAssessment}>
            Start sample assessment
          </button>
        }
      />

      <MockNotice>
        One sample assessment with {total} questions is playable end to end. Scoring is a simple
        tally against a fixed answer key — no model is involved.
      </MockNotice>

      <div className="grid grid-2">
        {assessmentCatalog.map((item) => (
          <article key={item.id} className="assess-card">
            <header className="row-between">
              <div>
                <h3>{item.title}</h3>
                <p className="tiny muted">
                  {item.questionCount} questions · {item.durationMinutes} minutes
                </p>
              </div>
              <Badge tone={statusTone[item.status]}>{statusLabel[item.status]}</Badge>
            </header>

            <p className="small assess-card__desc">{item.description}</p>

            <ul className="assess-card__skills">
              {item.skills.map((skill) => (
                <li key={skill} className="badge badge-neutral">
                  {skill}
                </li>
              ))}
            </ul>

            <footer className="assess-card__foot">
              <span className="tiny muted">
                {item.lastAttemptScore !== null
                  ? `Last attempt: ${item.lastAttemptScore}%`
                  : 'Not attempted yet'}
              </span>
              <button
                type="button"
                className={`btn btn-sm ${item.id === 'ASM-DA-CORE' ? '' : 'btn-secondary'}`}
                onClick={item.id === 'ASM-DA-CORE' ? startAssessment : undefined}
                disabled={item.id !== 'ASM-DA-CORE'}
              >
                {item.id === 'ASM-DA-CORE' ? 'Start assessment' : 'Not available in this build'}
              </button>
            </footer>
          </article>
        ))}
      </div>

      <Card
        title="Why re-assessment matters"
        subtitle="Competency is expected to change as you learn"
      >
        <ol className="assess-cycle">
          <li>
            <span className="assess-cycle__num">1</span>
            <p className="small">Take an assessment to establish your current competency.</p>
          </li>
          <li>
            <span className="assess-cycle__num">2</span>
            <p className="small">
              Weak subtopics are identified, not just an overall score.
            </p>
          </li>
          <li>
            <span className="assess-cycle__num">3</span>
            <p className="small">Recommendations adapt to target those weak areas.</p>
          </li>
          <li>
            <span className="assess-cycle__num">4</span>
            <p className="small">
              Re-assess after learning so your competency profile stays current. Last update:{' '}
              {formatDate('2026-08-21')}.
            </p>
          </li>
        </ol>
      </Card>
    </>
  );
}

export default AssessmentPage;
