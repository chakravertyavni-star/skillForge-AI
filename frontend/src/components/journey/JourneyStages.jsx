import { NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import { journeyStages, journeySummary } from '../../data/mockJourney';
import './journey.css';

const statusLabel = {
  complete: 'Done',
  current: 'You are here',
  upcoming: 'Next',
};

/**
 * The loop that ties the whole application together.
 * Each stage links to the page that performs it, so the learner can see where
 * they are and move forward from the same control.
 */
function JourneyStages() {
  return (
    <Reveal className="stages">
      <div className="stages__intro">
        <div>
          <p className="eyebrow">Your skill journey</p>
          <h2>{journeySummary.headline}</h2>
        </div>
        <p className="small muted stages__detail">{journeySummary.detail}</p>
      </div>

      <ol className="stages__track">
        {journeyStages.map((stage, index) => (
          <li key={stage.id} className={`stage is-${stage.status}`}>
            <NavLink to={stage.to} className="stage__link">
              <span className="stage__marker">
                <Icon name={stage.status === 'complete' ? 'check' : stage.icon} size={15} />
              </span>
              <span className="stage__text">
                <span className="stage__label">{stage.label}</span>
                <span className="stage__caption">{stage.caption}</span>
              </span>
              <span className="stage__tip">
                <strong>{statusLabel[stage.status]}</strong>
                {stage.detail}
              </span>
            </NavLink>
            {index < journeyStages.length - 1 && <span className="stage__connector" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export default JourneyStages;
