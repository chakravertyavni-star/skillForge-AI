import useInView from '../../hooks/useInView';

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * `delay` staggers items in a grid so a section resolves in reading order.
 */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
