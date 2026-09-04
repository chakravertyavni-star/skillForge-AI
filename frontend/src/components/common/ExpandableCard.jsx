import { useId, useState } from 'react';
import Icon from './Icon';
import './ExpandableCard.css';

/**
 * Shows a compact summary and reveals the detail only when asked.
 * Keeps dense pages readable instead of presenting everything at once.
 */
function ExpandableCard({
  title,
  meta,
  summary,
  badge,
  defaultOpen = false,
  moreLabel = 'Details',
  children,
  className = '',
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <article className={`xcard ${open ? 'is-open' : ''} ${className}`}>
      <div className="xcard__head">
        <div className="xcard__title">
          <h3>{title}</h3>
          {meta && <p className="tiny muted">{meta}</p>}
        </div>
        {badge}
      </div>

      {summary && <div className="xcard__summary">{summary}</div>}

      <button
        type="button"
        className="xcard__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide' : moreLabel}
        <Icon name="arrowRight" size={14} className="xcard__chevron" />
      </button>

      <div id={panelId} className="xcard__panel" hidden={!open}>
        <div className="xcard__panel-inner">{children}</div>
      </div>
    </article>
  );
}

export default ExpandableCard;
