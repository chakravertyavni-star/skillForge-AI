import { NavLink, Link } from 'react-router-dom';
import Icon from '../common/Icon';

/** Left navigation rail. `items` comes from routes/navigation.js. */
function Sidebar({ items, area, open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <Link to="/" className="sidebar__brand">
        <span className="sidebar__logo">SF</span>
        <span>
          <strong>SkillForge AI</strong>
          <small>{area === 'admin' ? 'Administration' : 'Learner workspace'}</small>
        </span>
      </Link>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
            onClick={onNavigate}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__foot">
        {area === 'admin' ? (
          <Link to="/app" className="sidebar__switch" onClick={onNavigate}>
            <Icon name="user" size={16} />
            Switch to learner view
          </Link>
        ) : (
          <Link to="/admin" className="sidebar__switch" onClick={onNavigate}>
            <Icon name="shield" size={16} />
            Switch to admin view
          </Link>
        )}
        <p className="tiny muted sidebar__phase">
          Frontend phase — all data on screen is mock data.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
