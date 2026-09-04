import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { priorityTone, priorityColor } from '../../utils/format';
import { priorityLabels } from '../../data/mockSkills';
import './skills.css';

/** Compact skill list used on the dashboard. */
function SkillGapList({ items, showRequired = true }) {
  return (
    <ul className="skill-list">
      {items.map((item) => (
        <li key={item.skillId}>
          <div className="skill-list__row">
            <Link to="/app/skills" className="skill-list__name">
              {item.skill}
            </Link>
            <div className="row">
              {showRequired && (
                <span className="tiny muted mono">
                  {item.currentScore} / {item.requiredScore}
                </span>
              )}
              <Badge tone={priorityTone(item.priority)}>{priorityLabels[item.priority]}</Badge>
            </div>
          </div>
          <ProgressBar
            value={item.currentScore}
            color={priorityColor(item.priority)}
            height={6}
          />
        </li>
      ))}
    </ul>
  );
}

export default SkillGapList;
