import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      countRef.current = easeOutQuart * end;
      setCount(countRef.current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span className="animate-count-up tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};
