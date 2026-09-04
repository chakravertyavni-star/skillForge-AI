/** Small display helpers shared across pages. */

/** Maps a gap priority to the badge/colour tone used by the design system. */
export function priorityTone(priority) {
  const tones = {
    critical: 'critical',
    high: 'high',
    moderate: 'moderate',
    low: 'low',
    met: 'met',
  };
  return tones[priority] || 'neutral';
}

/** Colour value for charts and bars, matching the badge tones. */
export function priorityColor(priority) {
  const colors = {
    critical: '#b42318',
    high: '#b54708',
    moderate: '#a16207',
    low: '#0284c7',
    met: '#027a48',
  };
  return colors[priority] || '#1e40af';
}

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function titleCase(value = '') {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
