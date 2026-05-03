import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScramble(target: string, hover: boolean) {
  const [txt, setTxt] = useState(target);
  const raf = useRef<number>(0);
  const it = useRef<number>(0);

  useEffect(() => {
    // Start animation whenever target changes OR hover state changes
    it.current = 0;
    cancelAnimationFrame(raf.current);
    
    const tick = () => {
      setTxt(target.split("").map((c, i) => {
        if (c === " ") return " ";
        if (i < it.current) return target[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      
      it.current += 0.75;
      
      if (it.current < target.length + 3) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setTxt(target);
      }
    };
    
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, hover]); // Triggers on both automatic cycle and manual hover
  
  return txt;
}
