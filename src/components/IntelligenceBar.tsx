import { useState, useEffect } from "react";
import { Brain, Zap, ChevronRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./ui/button";

const aiMessages = [
  "Snowflake Cortex Analysis: Increased burn rate detected at East Zone Medical Center. Recommending 15% stock diversion from Hub Alpha to prevent Type O+ shortage on Thursday.",
  "Pattern Recognition: Seasonal demand surge predicted for Pediatric Amoxicillin across Southern Districts. Initiating preemptive reorder sequence.",
  "Anomaly Alert: Insulin Glargine consumption at Central Regional Hospital exceeds baseline by 23%. Cross-referencing with patient intake data.",
  "Optimization Complete: Route efficiency improved by 12% for North-West corridor. Estimated savings: 2.3 hours per supply cycle.",
];

export const IntelligenceBar = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = aiMessages[currentMessageIndex];
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayedText(message.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Move to next message after delay
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % aiMessages.length);
        }, 5000);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 animate-fade-up stagger-8">
      <GlassCard className="p-4 border-emerald/20">
        <div className="flex items-center gap-4">
          {/* AI Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald to-emerald/50 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald animate-pulse" />
          </div>

          {/* Message Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 text-emerald" />
              <span className="text-xs font-semibold text-emerald uppercase tracking-wider">Cortex AI Intelligence</span>
            </div>
            <p className="text-sm text-foreground/90 font-mono leading-relaxed">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-4 bg-emerald ml-0.5 animate-pulse" />
              )}
            </p>
          </div>

          {/* Action Button */}
          <Button 
            variant="default" 
            size="sm" 
            className="flex-shrink-0 shimmer bg-emerald hover:bg-emerald-glow text-primary-foreground gap-1.5"
          >
            Execute Reorder
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};
