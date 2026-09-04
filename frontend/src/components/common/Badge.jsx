/**
 * Priority / status pill.
 * `tone` maps to the badge-* classes defined in styles/theme.css.
 */
function Badge({ tone = 'neutral', children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export default Badge;
