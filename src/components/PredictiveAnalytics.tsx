import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Sparkline } from "./Sparkline";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";

const getStatusColor = (days: number) => {
  if (days <= 2) return { text: "text-crimson", bg: "bg-crimson/10", sparkline: "hsl(0, 100%, 64%)" };
  if (days <= 4) return { text: "text-amber", bg: "bg-amber/10", sparkline: "hsl(38, 92%, 50%)" };
  return { text: "text-emerald", bg: "bg-emerald/10", sparkline: "hsl(160, 84%, 39%)" };
};

export const PredictiveAnalytics = () => {
  const { warningItems } = useLiveSimulation();

  return (
    <div className="animate-fade-up stagger-4">
      <GlassCard className="h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber" />
              Early Warning System
            </h2>
            <p className="text-sm text-muted-foreground">Predictive stock depletion alerts</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingDown className="w-4 h-4" />
            <span>Burn Rate Analysis</span>
          </div>
        </div>

        <div className="space-y-4">
          {warningItems.map((item, index) => {
            const status = getStatusColor(item.daysUntilEmpty);
            return (
              <div 
                key={item.id}
                className={`p-4 rounded-lg border border-glass-border/10 ${status.bg} transition-all duration-500 hover:border-glass-border/30 animate-fade-up`}
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.location}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Stock</p>
                        <p className="font-semibold transition-all duration-300">{item.currentStock.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Daily Usage</p>
                        <p className="font-semibold transition-all duration-300">{item.dailyUsage}/day</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Sparkline 
                      data={item.burnRateData} 
                      color={status.sparkline}
                      height={28}
                      width={70}
                    />
                    
                    <div className={`flex items-center gap-1.5 ${status.text}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold tabular-nums transition-all duration-300">
                        {item.daysUntilEmpty.toFixed(1)}
                      </span>
                      <span className="text-xs opacity-80">days left</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
