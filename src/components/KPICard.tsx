import { Activity, AlertTriangle, Clock, Database } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { CountUp } from "./CountUp";

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: "locations" | "critical" | "days" | "sync";
  status?: "healthy" | "warning" | "critical";
  delay?: number;
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

export const KPICard = ({ title, value, suffix = "", icon, status = "healthy", delay = 0 }: KPICardProps) => {
  const Icon = iconMap[icon];
  
  return (
    <div 
      className="animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <GlassCard hoverable className="relative overflow-hidden">
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
            <span className={`text-4xl font-bold tracking-tight ${statusColors[status]}`}>
              <CountUp end={value} duration={2000} />
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
