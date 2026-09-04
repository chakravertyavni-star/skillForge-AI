/**
 * Generic surface used across every page.
 * `title` / `subtitle` / `action` render an optional header row.
 */
function Card({ title, subtitle, action, footer, children, className = '', bodyClass = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <header className="card-head">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={`card-body ${bodyClass}`}>{children}</div>
      {footer && <footer className="card-foot">{footer}</footer>}
    </section>
  );
}

export default Card;
