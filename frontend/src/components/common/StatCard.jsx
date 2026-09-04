import Icon from './Icon';
import './StatCard.css';

/** Compact metric tile used on dashboards. */
function StatCard({ label, value, unit, hint, delta, icon, tone = 'brand' }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="eyebrow">{label}</span>
        {icon && (
          <span className="stat-card__icon">
            <Icon name={icon} size={16} />
          </span>
        )}
      </div>
      <div className="stat-card__value">
        {value}
        {unit && <span className="stat-card__unit">{unit}</span>}
      </div>
      {(hint || delta !== undefined) && (
        <div className="stat-card__foot">
          {delta !== undefined && delta !== null && (
            <span className={`stat-card__delta ${delta >= 0 ? 'is-up' : 'is-down'}`}>
              {delta >= 0 ? '+' : ''}
              {delta}
            </span>
          )}
          {hint && <span className="tiny muted">{hint}</span>}
        </div>
      )}
    </article>
  );
}

export default StatCard;
