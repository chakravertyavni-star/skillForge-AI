import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Icon from '../common/Icon';
import InfoHint from '../common/InfoHint';
import ExpandableCard from '../common/ExpandableCard';
import ComparisonBar from '../charts/ComparisonBar';
import AnimatedNumber from '../common/AnimatedNumber';
import { priorityTone, priorityColor, formatDate } from '../../utils/format';
import { priorityLabels } from '../../data/mockSkills';
import './skills.css';

/**
 * One skill, collapsed to the numbers that matter and expandable to the
 * reasoning behind them.
 *
 * `item` matches the object shape the AI/ML service is expected to return in a
 * later phase, so this component will not need to change.
 */
function SkillGapCard({ item, meaning }) {
  const tone = priorityTone(item.priority);
  const color = priorityColor(item.priority);

  return (
    <ExpandableCard
      className="skill-card"
      title={
        <span className="skill-card__title">
          {item.skill}
          {meaning && <InfoHint label={item.skill} text={meaning} align="left" />}
        </span>
      }
      meta={item.category}
      badge={<Badge tone={tone}>{priorityLabels[item.priority]}</Badge>}
      moreLabel="Why this gap?"
      summary={
        <>
          <div className="skill-card__numbers">
            <span>
              <span className="tiny muted">You</span>
              <strong style={{ color }}>
                <AnimatedNumber value={item.currentScore} />
              </strong>
            </span>
            <span>
              <span className="tiny muted">Target</span>
              <strong>
                <AnimatedNumber value={item.requiredScore} />
              </strong>
            </span>
            <span>
              <span className="tiny muted">Gap</span>
              <strong style={{ color }}>{item.gap > 0 ? item.gap : '—'}</strong>
            </span>
          </div>
          <ComparisonBar current={item.currentScore} required={item.requiredScore} color={color} />
        </>
      }
    >
      <p className="small">{item.reason}</p>

      <div className="skill-card__action">
        <p className="eyebrow">Do this next</p>
        <p className="small strong">{item.nextAction}</p>
      </div>

      <div className="skill-card__foot">
        <span className="tiny muted">
          <Icon name="clock" size={13} /> Assessed {formatDate(item.lastAssessedOn)}
        </span>
        <span className={`tiny skill-card__trend is-${item.trend}`}>
          {item.trend === 'improving' ? `+${item.trendDelta} since Feb` : 'Steady'}
        </span>
      </div>

      {item.gap > 0 && (
        <Link to="/app/recommendations" className="btn btn-sm btn-secondary">
          See recommended learning
          <Icon name="arrowRight" size={14} />
        </Link>
      )}
    </ExpandableCard>
  );
}

export default SkillGapCard;
