import useCountUp from '../../hooks/useCountUp';
import useInView from '../../hooks/useInView';

/** A number that counts up once it is on screen. */
function AnimatedNumber({ value, suffix = '', duration = 750, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const display = useCountUp(value, inView, duration);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;
