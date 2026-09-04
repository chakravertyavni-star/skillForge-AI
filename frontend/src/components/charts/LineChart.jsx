import './charts.css';

/**
 * Minimal multi-series SVG line chart.
 * Written by hand so the project does not need a charting dependency.
 *
 * series: [{ id, name, color, values: number[] }]
 */
function LineChart({ labels = [], series = [], height = 220, max = 100, unit = '' }) {
  const width = 640;
  const padding = { top: 16, right: 16, bottom: 28, left: 34 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const gridLines = [0, 25, 50, 75, 100];

  const x = (index) =>
    padding.left + (labels.length <= 1 ? 0 : (index * plotW) / (labels.length - 1));
  const y = (value) => padding.top + plotH - (value / max) * plotH;

  return (
    <div className="chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Line chart: ${series.map((s) => s.name).join(', ')}`}
        preserveAspectRatio="none"
      >
        {gridLines.map((tick) => (
          <g key={tick}>
            <line
              className="chart__grid"
              x1={padding.left}
              x2={width - padding.right}
              y1={y((tick / 100) * max)}
              y2={y((tick / 100) * max)}
            />
            <text className="chart__tick" x={padding.left - 8} y={y((tick / 100) * max) + 4}>
              {Math.round((tick / 100) * max)}
            </text>
          </g>
        ))}

        {labels.map((label, index) => (
          <text key={label} className="chart__tick" x={x(index)} y={height - 8} textAnchor="middle">
            {label}
          </text>
        ))}

        {series.map((line) => {
          const points = line.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
          return (
            <g key={line.id}>
              <polyline className="chart__line" points={points} stroke={line.color} />
              {line.values.map((value, index) => (
                <circle
                  key={`${line.id}-${index}`}
                  cx={x(index)}
                  cy={y(value)}
                  r="3.5"
                  fill="#fff"
                  stroke={line.color}
                  strokeWidth="2"
                >
                  <title>{`${line.name} — ${labels[index]}: ${value}${unit}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>

      {series.length > 1 && (
        <ul className="chart__legend">
          {series.map((line) => (
            <li key={line.id}>
              <span className="chart__swatch" style={{ background: line.color }} />
              {line.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LineChart;
