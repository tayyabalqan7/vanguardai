import { useState, useEffect } from "react";
import { Brain, Zap, ChevronRight, Loader2, Check } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./ui/button";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { useToast } from "@/hooks/use-toast";

export const IntelligenceBar = () => {
  const { currentInsight, insightIndex } = useLiveSimulation();
  const { toast } = useToast();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < currentInsight.length) {
        setDisplayedText(currentInsight.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [currentInsight, insightIndex]);

  const handleExecuteReorder = async () => {
    setIsExecuting(true);
    
    // Simulate writing to Snowflake
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExecuting(false);
    
    toast({
      title: "Reorder Logged & Inventory Updated",
      description: "Successfully written to Snowflake Unistore. Supply chain notified.",
      duration: 5000,
    });
  };

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
              <span className="text-[10px] text-muted-foreground">• Updates every 15s</span>
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
            className="flex-shrink-0 shimmer bg-emerald hover:bg-emerald-glow text-primary-foreground gap-1.5 min-w-[160px]"
            onClick={handleExecuteReorder}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Writing to Snowflake...
              </>
            ) : (
              <>
                Execute Reorder
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};
