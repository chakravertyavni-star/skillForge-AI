import Badge from '../common/Badge';
import Icon from '../common/Icon';
import ExpandableCard from '../common/ExpandableCard';
import ComparisonBar from '../charts/ComparisonBar';
import { priorityTone, priorityColor } from '../../utils/format';
import './recommendations.css';

/**
 * One recommended resource. The reason is collapsed by default so the list
 * stays scannable, and opens when the learner asks why.
 *
 * The `reason` text is mock content — no recommendation engine runs here.
 */
function RecommendationCard({ item, onStart }) {
  const tone = priorityTone(item.priority);
  const color = priorityColor(item.priority);

  return (
    <ExpandableCard
      className="rec-card"
      title={item.title}
      meta={`${item.provider} · ${item.durationHours} h · ${item.level}`}
      badge={<Badge tone={tone}>{item.priority}</Badge>}
      moreLabel="Why this?"
      summary={
        <>
          <div className="rec-card__target">
            <span className="small strong">{item.targetSkill}</span>
            <span className="tiny muted mono">
              {item.currentScore} → {item.requiredScore}
            </span>
          </div>
          <ComparisonBar current={item.currentScore} required={item.requiredScore} color={color} />
        </>
      }
    >
      <div className="rec-card__reason">
        <p className="eyebrow">Why it was recommended</p>
        <p className="small">{item.reason}</p>
      </div>

      <ul className="rec-card__signals">
        {item.supportingSignals.map((signal) => (
          <li key={signal}>
            <Icon name="check" size={14} />
            <span className="tiny">{signal}</span>
          </li>
        ))}
      </ul>

      <div className="rec-card__foot">
        <span className="tiny muted">
          <span className="rec-card__match">{item.matchScore}</span> match
        </span>
        <button type="button" className="btn btn-sm" onClick={() => onStart?.(item)}>
          Start learning
          <Icon name="arrowRight" size={14} />
        </button>
      </div>
    </ExpandableCard>
  );
}

export default RecommendationCard;
