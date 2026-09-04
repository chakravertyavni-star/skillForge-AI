import './charts.css';

/**
 * Shows current competency against the required level on one track.
 * The fill grows from zero so the size of a gap registers visually rather than
 * simply appearing.
 */
function ComparisonBar({ current, required, color = '#1e40af', height = 10 }) {
  const currentPct = Math.max(0, Math.min(100, current));
  const requiredPct = Math.max(0, Math.min(100, required));

  return (
    <div className="comparison" style={{ height }}>
      <div className="comparison__track" />
      <div
        className="comparison__fill"
        style={{ '--bar-target': `${currentPct}%`, background: color }}
        title={`Current: ${current}`}
      />
      <div
        className="comparison__marker"
        style={{ left: `${requiredPct}%` }}
        title={`Required: ${required}`}
      >
        <span className="sr-only">Required level {required}</span>
      </div>
    </div>
  );
}

export default ComparisonBar;
