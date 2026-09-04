import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './layout.css';

/**
 * Shared shell for the learner and admin areas.
 * Pages are rendered through <Outlet /> by the router.
 */
function AppLayout({ items, area = 'learner' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar
        items={items}
        area={area}
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="shell__scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="shell__main">
        <Topbar area={area} onToggleSidebar={() => setSidebarOpen((open) => !open)} />
        <main className="shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
