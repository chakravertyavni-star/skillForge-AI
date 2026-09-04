/**
 * Horizontal progress bar.
 * The fill grows from zero via a CSS animation, so progress reads as movement
 * rather than appearing fully formed.
 */
function ProgressBar({ value, max = 100, color, label, valueLabel, height = 8 }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div>
      {(label || valueLabel) && (
        <div className="row-between" style={{ marginBottom: 6 }}>
          {label && <span className="small strong">{label}</span>}
          {valueLabel && <span className="small muted">{valueLabel}</span>}
        </div>
      )}
      <div
        className="progress"
        style={{ height }}
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'progress'}
      >
        <span style={{ '--bar-target': `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

export default ProgressBar;
