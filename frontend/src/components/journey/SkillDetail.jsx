import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Icon from '../common/Icon';
import ComparisonBar from '../charts/ComparisonBar';
import AnimatedNumber from '../common/AnimatedNumber';
import { priorityTone, priorityColor } from '../../utils/format';
import { priorityLabels } from '../../data/mockSkills';
import './journey.css';

/**
 * The panel beside the skill map: what the selected skill is, where the learner
 * stands, and the single next action for it.
 */
function SkillDetail({ item, meta }) {
  const tone = priorityTone(item.priority);
  const color = priorityColor(item.priority);

  return (
    <div className="skilldetail" key={item.skillId}>
      <header className="skilldetail__head">
        <div>
          <p className="tiny muted">{item.category}</p>
          <h3>{item.skill}</h3>
        </div>
        <Badge tone={tone}>{priorityLabels[item.priority]}</Badge>
      </header>

      {meta?.meaning && <p className="skilldetail__meaning">{meta.meaning}</p>}

      <div className="skilldetail__scores">
        <div>
          <span className="tiny muted">Your level</span>
          <strong style={{ color }}>
            <AnimatedNumber value={item.currentScore} />
          </strong>
        </div>
        <Icon name="arrowRight" size={16} className="skilldetail__arrow" />
        <div>
          <span className="tiny muted">Role target</span>
          <strong>
            <AnimatedNumber value={item.requiredScore} />
          </strong>
        </div>
        <div className="skilldetail__gap">
          <span className="tiny muted">Gap</span>
          <strong style={{ color }}>
            {item.gap > 0 ? <AnimatedNumber value={item.gap} /> : 'None'}
          </strong>
        </div>
      </div>

      <ComparisonBar current={item.currentScore} required={item.requiredScore} color={color} height={10} />

      <div className="skilldetail__action">
        <p className="eyebrow">Do this next</p>
        <p className="small strong">{item.nextAction}</p>
      </div>

      <div className="skilldetail__links">
        {item.gap > 0 ? (
          <>
            <Link to="/app/recommendations" className="btn btn-sm">
              See why
              <Icon name="arrowRight" size={14} />
            </Link>
            <Link to="/app/learning" className="btn btn-sm btn-secondary">
              Find learning
            </Link>
          </>
        ) : (
          <Link to="/app/assessment" className="btn btn-sm btn-secondary">
            Re-assess to keep this current
          </Link>
        )}
      </div>
    </div>
  );
}

export default SkillDetail;
