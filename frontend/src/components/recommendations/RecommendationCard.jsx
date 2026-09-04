import Badge from '../common/Badge';
import Icon from '../common/Icon';
import ComparisonBar from '../charts/ComparisonBar';
import { priorityTone, priorityColor } from '../../utils/format';
import './recommendations.css';

/**
 * One recommended resource plus the explanation of why it was recommended.
 * The `reason` text is mock content — no recommendation engine runs here.
 */
function RecommendationCard({ item, onStart }) {
  const tone = priorityTone(item.priority);
  const color = priorityColor(item.priority);

  return (
    <article className="rec-card">
      <header className="rec-card__head">
        <div>
          <div className="row wrap" style={{ marginBottom: 6 }}>
            <Badge tone={tone}>{item.priority} priority</Badge>
            <span className="badge badge-neutral">{item.type}</span>
            <span className="badge badge-neutral">{item.level}</span>
          </div>
          <h3>{item.title}</h3>
          <p className="tiny muted">{item.provider}</p>
        </div>
        <div className="rec-card__match">
          <span className="rec-card__match-value">{item.matchScore}</span>
          <span className="tiny muted">match</span>
        </div>
      </header>

      <div className="rec-card__reason">
        <p className="eyebrow" style={{ marginBottom: 4 }}>
          Why this was recommended
        </p>
        <p className="small">{item.reason}</p>
      </div>

      <div className="rec-card__skill">
        <div className="row-between" style={{ marginBottom: 6 }}>
          <span className="small strong">{item.targetSkill}</span>
          <span className="tiny muted mono">
            {item.currentScore} → target {item.requiredScore}
          </span>
        </div>
        <ComparisonBar current={item.currentScore} required={item.requiredScore} color={color} />
      </div>

      <ul className="rec-card__signals">
        {item.supportingSignals.map((signal) => (
          <li key={signal}>
            <Icon name="check" size={14} />
            <span className="tiny">{signal}</span>
          </li>
        ))}
      </ul>

      <footer className="rec-card__foot">
        <span className="tiny muted">
          <Icon name="clock" size={13} /> {item.durationHours} hours
        </span>
        <button type="button" className="btn btn-sm" onClick={() => onStart?.(item)}>
          Start learning
        </button>
      </footer>
    </article>
  );
}

export default RecommendationCard;
