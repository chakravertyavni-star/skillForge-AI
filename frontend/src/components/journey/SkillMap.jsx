import { useState } from 'react';
import useInView from '../../hooks/useInView';
import { priorityColor } from '../../utils/format';
import './journey.css';

const SIZE = 360;
const CENTER = SIZE / 2;
const MAX_R = 128;
const RINGS = [25, 50, 75, 100];

function angleFor(index, total) {
  return ((-90 + (360 * index) / total) * Math.PI) / 180;
}

function pointFor(value, index, total) {
  const angle = angleFor(index, total);
  const radius = (Math.max(0, Math.min(100, value)) / 100) * MAX_R;
  return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)];
}

function toPolygon(values, total) {
  return values.map((value, index) => pointFor(value, index, total).join(',')).join(' ');
}

/**
 * Interactive competency map.
 *
 * Each spoke is one skill. The filled shape is current competency, the dashed
 * outline is the level the role requires, so the gap is literally the distance
 * between the two. Nodes are selectable with the mouse or the keyboard.
 */
function SkillMap({ items, skillMeta, selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.25 });

  const total = items.length;
  const currentPolygon = toPolygon(
    items.map((item) => item.currentScore),
    total
  );
  const targetPolygon = toPolygon(
    items.map((item) => item.requiredScore),
    total
  );

  const activeId = hoveredId || selectedId;
  const activeItem = items.find((item) => item.skillId === activeId);

  return (
    <div className={`skillmap ${inView ? 'is-live' : ''}`} ref={ref}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="skillmap__svg" role="presentation">
        <g className="skillmap__grid">
          {RINGS.map((ring) => (
            <circle
              key={ring}
              cx={CENTER}
              cy={CENTER}
              r={(ring / 100) * MAX_R}
              className={ring === 100 ? 'skillmap__ring is-outer' : 'skillmap__ring'}
            />
          ))}
          {items.map((item, index) => {
            const [x, y] = pointFor(100, index, total);
            return (
              <line
                key={item.skillId}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                className={`skillmap__spoke ${activeId === item.skillId ? 'is-active' : ''}`}
              />
            );
          })}
        </g>

        <g className="skillmap__shapes">
          <polygon points={targetPolygon} className="skillmap__target" />
          <polygon points={currentPolygon} className="skillmap__current" />
        </g>

        <g className="skillmap__nodes">
          {items.map((item, index) => {
            const [x, y] = pointFor(item.currentScore, index, total);
            const [tx, ty] = pointFor(item.requiredScore, index, total);
            const [lx, ly] = pointFor(118, index, total);
            const meta = skillMeta[item.skillId];
            const isActive = activeId === item.skillId;
            const isSelected = selectedId === item.skillId;
            const color = priorityColor(item.priority);
            const anchor = Math.abs(lx - CENTER) < 12 ? 'middle' : lx > CENTER ? 'start' : 'end';

            return (
              <g
                key={item.skillId}
                className={`skillmap__node ${isActive ? 'is-active' : ''} ${
                  isSelected ? 'is-selected' : ''
                }`}
                style={{ '--node-delay': `${index * 55}ms` }}
                role="button"
                tabIndex={0}
                aria-label={`${item.skill}: current ${item.currentScore}, required ${item.requiredScore}`}
                aria-pressed={isSelected}
                onMouseEnter={() => setHoveredId(item.skillId)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.skillId)}
                onBlur={() => setHoveredId(null)}
                onClick={() => onSelect(item.skillId)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(item.skillId);
                  }
                }}
              >
                {/* Gap thread: current level out to the required level. */}
                {item.gap > 0 && (
                  <line x1={x} y1={y} x2={tx} y2={ty} className="skillmap__gapline" stroke={color} />
                )}
                <circle cx={tx} cy={ty} r="2.5" className="skillmap__targetdot" />
                <circle cx={x} cy={y} r="16" className="skillmap__hitarea" />
                <circle cx={x} cy={y} r={isActive ? 7.5 : 5.5} fill={color} className="skillmap__dot" />
                <text x={lx} y={ly + 4} textAnchor={anchor} className="skillmap__label">
                  {meta?.short || item.skill}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="skillmap__center" aria-hidden="true">
        {activeItem ? (
          <>
            <span className="skillmap__center-value" style={{ color: priorityColor(activeItem.priority) }}>
              {activeItem.currentScore}
            </span>
            <span className="skillmap__center-label">of {activeItem.requiredScore} target</span>
          </>
        ) : (
          <>
            <span className="skillmap__center-value">10</span>
            <span className="skillmap__center-label">skills mapped</span>
          </>
        )}
      </div>

      <ul className="skillmap__key">
        <li>
          <span className="skillmap__key-swatch is-current" />
          Your level
        </li>
        <li>
          <span className="skillmap__key-swatch is-target" />
          Role target
        </li>
        <li className="skillmap__key-hint">Select a skill to see what to do about it</li>
      </ul>
    </div>
  );
}

export default SkillMap;
