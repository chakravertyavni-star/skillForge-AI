/** Horizontal progress bar with an optional label row. */
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
        <span style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

export default ProgressBar;
