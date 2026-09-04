import { useState } from 'react';
import Icon from '../common/Icon';
import { learner, notifications } from '../../data/mockLearner';

/** Application top bar: mobile menu toggle, notifications and the user chip. */
function Topbar({ onToggleSidebar, area }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn topbar__menu"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
      >
        <Icon name="menu" size={18} />
      </button>

      <div className="topbar__context">
        <span className="badge badge-brand">
          {area === 'admin' ? 'Administrator' : 'Learner'}
        </span>
        <span className="small muted topbar__role">{learner.roleTitle} · {learner.division}</span>
      </div>

      <div className="topbar__actions">
        <div className="topbar__notify">
          <button
            type="button"
            className="icon-btn"
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((open) => !open)}
          >
            <Icon name="bell" size={18} />
            {unreadCount > 0 && <span className="topbar__dot" />}
          </button>

          {showNotifications && (
            <div className="topbar__panel">
              <p className="eyebrow" style={{ padding: '4px 12px 8px' }}>
                Notifications
              </p>
              <ul>
                {notifications.map((item) => (
                  <li key={item.id} className={item.unread ? 'is-unread' : ''}>
                    <p className="small strong">{item.title}</p>
                    <p className="tiny muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="topbar__user">
          <span className="topbar__avatar">{learner.initials}</span>
          <span className="topbar__name">
            <strong className="small">{learner.name}</strong>
            <small className="tiny muted">{learner.designation}</small>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
