import { Activity, AlertTriangle, Clock, Database } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { CountUp } from "./CountUp";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { useEffect, useState } from "react";

interface KPICardProps {
  title: string;
  baseValue: number;
  suffix?: string;
  icon: "locations" | "critical" | "days" | "sync";
  status?: "healthy" | "warning" | "critical";
  delay?: number;
  fluctuate?: boolean;
}

const iconMap = {
  locations: Activity,
  critical: AlertTriangle,
  days: Clock,
  sync: Database,
};

const statusColors = {
  healthy: "text-emerald",
  warning: "text-amber",
  critical: "text-crimson",
};

export const KPICard = ({ title, baseValue, suffix = "", icon, status = "healthy", delay = 0, fluctuate = false }: KPICardProps) => {
  const Icon = iconMap[icon];
  const { lastUpdateTime } = useLiveSimulation();
  const [value, setValue] = useState(baseValue);
  const [flash, setFlash] = useState(false);

  // Fluctuate value when live data updates
  useEffect(() => {
    if (fluctuate) {
      const variation = baseValue * 0.08;
      const change = (Math.random() - 0.5) * 2 * variation;
      const newValue = icon === "days" 
        ? Math.round((baseValue + change) * 10) / 10
        : Math.round(baseValue + change);
      setValue(Math.max(0, newValue));
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    }
  }, [lastUpdateTime, baseValue, fluctuate, icon]);
  
  return (
    <div 
      className="animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <GlassCard hoverable className={`relative overflow-hidden transition-all duration-300 ${flash ? 'ring-1 ring-emerald/50' : ''}`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-glass-border/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {title}
            </span>
            <div className={`p-2 rounded-lg bg-secondary/50 ${statusColors[status]}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className={`text-4xl font-bold tracking-tight transition-all duration-300 ${statusColors[status]} ${flash ? 'scale-105' : ''}`}>
              <CountUp end={value} duration={800} />
            </span>
            {suffix && (
              <span className="text-lg text-muted-foreground mb-1">{suffix}</span>
            )}
          </div>

          {icon === "sync" && (
            <div className="flex items-center gap-2 mt-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              <span className="text-xs text-emerald font-medium">Snowflake Connected</span>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
