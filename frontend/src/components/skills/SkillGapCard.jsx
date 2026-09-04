import Badge from '../common/Badge';
import ComparisonBar from '../charts/ComparisonBar';
import Icon from '../common/Icon';
import { priorityTone, priorityColor, formatDate } from '../../utils/format';
import { priorityLabels } from '../../data/mockSkills';
import './skills.css';

/**
 * Detailed view of one skill: current level, required level, gap and the
 * reason it is considered a gap.
 *
 * `item` matches the object shape the AI/ML service is expected to return
 * in a later phase, so this component will not need to change.
 */
function SkillGapCard({ item }) {
  const tone = priorityTone(item.priority);
  const color = priorityColor(item.priority);

  return (
    <article className="skill-card">
      <header className="skill-card__head">
        <div>
          <h3>{item.skill}</h3>
          <p className="tiny muted">{item.category}</p>
        </div>
        <Badge tone={tone}>{priorityLabels[item.priority]}</Badge>
      </header>

      <div className="skill-card__numbers">
        <div>
          <span className="tiny muted">Current</span>
          <strong style={{ color }}>{item.currentScore}</strong>
        </div>
        <div>
          <span className="tiny muted">Required</span>
          <strong>{item.requiredScore}</strong>
        </div>
        <div>
          <span className="tiny muted">Gap</span>
          <strong>{item.gap > 0 ? item.gap : '—'}</strong>
        </div>
      </div>

      <ComparisonBar current={item.currentScore} required={item.requiredScore} color={color} />
      <p className="tiny muted skill-card__scale">
        <span>0</span>
        <span>Marker shows the level required for your role</span>
        <span>100</span>
      </p>

      <p className="small skill-card__reason">{item.reason}</p>

      <footer className="skill-card__foot">
        <span className="tiny muted">
          <Icon name="clock" size={13} /> Assessed {formatDate(item.lastAssessedOn)}
        </span>
        <span className={`tiny skill-card__trend is-${item.trend}`}>
          {item.trend === 'improving' ? `+${item.trendDelta} since Feb` : 'Steady'}
        </span>
      </footer>
    </article>
  );
}

export default SkillGapCard;
