import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

/**
 * Counts from 0 up to `target` once `active` becomes true.
 * Makes a score feel measured rather than simply printed.
 */
export default function useCountUp(target, active = true, duration = 750) {
  const reducedMotion = usePrefersReducedMotion();
  const [tweened, setTweened] = useState(0);
  const frameRef = useRef(0);
  const animate = active && !reducedMotion && duration > 0;

  useEffect(() => {
    if (!animate) return undefined;

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease-out so the number settles rather than stopping abruptly.
      const eased = 1 - (1 - progress) ** 3;
      setTweened(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, animate, duration]);

  if (!active) return 0;
  return animate ? tweened : target;
}
