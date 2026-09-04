import { useId, useState } from 'react';
import Icon from './Icon';
import './InfoHint.css';

/**
 * Small "what does this mean?" marker.
 * Reveals a short plain-language explanation on hover or keyboard focus, so
 * terminology never blocks a learner who is new to the framework.
 */
function InfoHint({ label, text, align = 'center' }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  return (
    <span
      className="hint"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="hint__trigger"
        aria-label={label ? `What ${label} means` : 'Explanation'}
        aria-describedby={open ? tipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="info" size={13} />
      </button>

      {open && (
        <span id={tipId} role="tooltip" className={`hint__tip hint__tip--${align}`}>
          {label && <strong>{label}</strong>}
          {text}
        </span>
      )}
    </span>
  );
}

export default InfoHint;
