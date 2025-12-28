import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export const Typewriter = ({ text, speed = 30, className = "" }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-0.5 h-4 bg-emerald ml-1 animate-pulse" />
    </span>
  );
};
