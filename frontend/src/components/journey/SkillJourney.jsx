import { useMemo, useState } from 'react';
import SkillMap from './SkillMap';
import SkillDetail from './SkillDetail';
import { skills } from '../../data/mockSkills';
import { priorityColor } from '../../utils/format';
import './journey.css';

const skillMeta = skills.reduce((acc, skill) => {
  acc[skill.id] = skill;
  return acc;
}, {});

/**
 * The visual centre of the learner experience: one map that holds every skill,
 * its gap, and the action that follows from it.
 */
function SkillJourney({ items, title = 'Your skill map', subtitle }) {
  const [selectedId, setSelectedId] = useState(items[0].skillId);
  const selected = useMemo(
    () => items.find((item) => item.skillId === selectedId) || items[0],
    [items, selectedId]
  );

  const gaps = items.filter((item) => item.gap > 0);

  return (
    <section className="journey">
      <header className="journey__head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p className="small muted">{subtitle}</p>}
        </div>
        <div className="journey__counts">
          <span className="journey__count">
            <strong>{gaps.length}</strong> below target
          </span>
          <span className="journey__count is-met">
            <strong>{items.length - gaps.length}</strong> met
          </span>
        </div>
      </header>

      <div className="journey__body">
        <SkillMap
          items={items}
          skillMeta={skillMeta}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <div className="journey__side">
          <SkillDetail item={selected} meta={skillMeta[selected.skillId]} />

          <div className="journey__picker">
            <p className="eyebrow">Jump to a skill</p>
            <div className="journey__chips">
              {items.map((item) => (
                <button
                  key={item.skillId}
                  type="button"
                  className={`jchip ${selectedId === item.skillId ? 'is-active' : ''}`}
                  style={{ '--chip-color': priorityColor(item.priority) }}
                  onClick={() => setSelectedId(item.skillId)}
                >
                  <span className="jchip__dot" />
                  {skillMeta[item.skillId]?.short || item.skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillJourney;
