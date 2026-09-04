import { useEffect, useRef, useState } from 'react';

const supported = typeof IntersectionObserver !== 'undefined';

/**
 * Reports when an element first scrolls into view.
 * Used for section reveals and for starting number animations only once the
 * learner can actually see them.
 */
export default function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  // Without observer support everything is treated as visible immediately.
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    const element = ref.current;
    if (!element || !supported) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
