import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        gap: 12,
        textAlign: 'center',
        padding: 24,
      }}
    >
      <p className="eyebrow">Error 404</p>
      <h1>This page does not exist</h1>
      <p className="muted">The page you are looking for has not been built yet.</p>
      <Link to="/app" className="btn" style={{ marginTop: 8 }}>
        Back to dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
