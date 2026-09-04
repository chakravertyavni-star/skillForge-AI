import './charts.css';

/** Circular competency gauge built with a stroked SVG arc. */
function GaugeRing({ value, max = 100, size = 160, label, sublabel, color = '#1e40af' }) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(1, value / max));

  return (
    <div className="gauge" style={{ width: size }}>
      <svg width={size} height={size} role="img" aria-label={`${label || 'Score'}: ${value}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eef1f6"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="gauge__center">
        <span className="gauge__value">{value}%</span>
        {label && <span className="gauge__label">{label}</span>}
      </div>
      {sublabel && <p className="tiny muted gauge__sub">{sublabel}</p>}
    </div>
  );
}

export default GaugeRing;
