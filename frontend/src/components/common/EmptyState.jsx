import Icon from './Icon';

function EmptyState({ title, detail, icon = 'info' }) {
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 6,
        padding: '32px 16px',
        textAlign: 'center',
        color: 'var(--muted)',
      }}
    >
      <Icon name={icon} size={24} />
      <p className="strong">{title}</p>
      {detail && <p className="small">{detail}</p>}
    </div>
  );
}

export default EmptyState;
