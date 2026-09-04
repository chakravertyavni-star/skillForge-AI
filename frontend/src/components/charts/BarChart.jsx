import './charts.css';

/**
 * Vertical bar chart for small series (e.g. weekly learning hours).
 * data: [{ label, value }]
 */
function BarChart({ data = [], height = 200, unit = '', color = '#1e40af' }) {
  const width = 640;
  const padding = { top: 14, right: 12, bottom: 28, left: 30 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const max = Math.max(...data.map((item) => item.value), 1);
  const slot = plotW / Math.max(data.length, 1);
  const barW = Math.min(slot * 0.5, 42);

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart" preserveAspectRatio="none">
        <line
          className="chart__grid"
          x1={padding.left}
          x2={width - padding.right}
          y1={padding.top + plotH}
          y2={padding.top + plotH}
        />
        {data.map((item, index) => {
          const barH = (item.value / max) * plotH;
          const x = padding.left + slot * index + (slot - barW) / 2;
          const y = padding.top + plotH - barH;
          return (
            <g key={item.label}>
              <rect x={x} y={y} width={barW} height={barH} rx="4" fill={color} opacity="0.85">
                <title>{`${item.label}: ${item.value}${unit}`}</title>
              </rect>
              <text className="chart__tick" x={x + barW / 2} y={height - 8} textAnchor="middle">
                {item.label}
              </text>
            </g>
          );
        })}
        <text className="chart__tick" x={padding.left - 8} y={padding.top + 6} textAnchor="end">
          {max}
        </text>
      </svg>
    </div>
  );
}

export default BarChart;
