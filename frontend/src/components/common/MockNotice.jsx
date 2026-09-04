import Icon from './Icon';

/**
 * Makes it explicit in the UI that a section is driven by mock data.
 * These notices come out once the real backend is connected.
 */
function MockNotice({ children }) {
  return (
    <p className="mock-note">
      <Icon name="info" size={15} />
      <span>{children}</span>
    </p>
  );
}

export default MockNotice;
