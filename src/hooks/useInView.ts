import { useState, useEffect, useRef } from "react";

export function useInView<T extends Element = Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, { threshold });
    
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  
  return [ref, vis] as const;
}
