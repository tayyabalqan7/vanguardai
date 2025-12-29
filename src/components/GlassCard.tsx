import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: "emerald" | "amber" | "crimson" | "none";
  style?: CSSProperties;
}

export const GlassCard = ({ 
  children, 
  className, 
  hoverable = false,
  glowColor = "none",
  style
}: GlassCardProps) => {
  const glowClasses = {
    emerald: "glow-emerald",
    amber: "glow-amber", 
    crimson: "glow-crimson",
    none: ""
  };

  return (
    <div 
      className={cn(
        "bg-card/60 backdrop-blur-xl border border-glass-border/10 rounded-xl p-6",
        "shadow-[0_8px_32px_hsl(0_0%_0%/0.3)]",
        hoverable && "transition-all duration-300 hover:border-glass-border/20 hover:scale-[1.02]",
        glowClasses[glowColor],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
