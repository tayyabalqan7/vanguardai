import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Sparkline } from "./Sparkline";

interface WarningItem {
  id: string;
  name: string;
  location: string;
  daysUntilEmpty: number;
  burnRateData: number[];
  currentStock: number;
  dailyUsage: number;
}

const warningItems: WarningItem[] = [
  {
    id: "1",
    name: "Insulin Glargine",
    location: "Central Regional Hospital",
    daysUntilEmpty: 2.8,
    burnRateData: [45, 42, 38, 35, 30, 28, 25, 22],
    currentStock: 156,
    dailyUsage: 56,
  },
  {
    id: "2",
    name: "Type O+ Blood Units",
    location: "East Zone Medical Center",
    daysUntilEmpty: 1.5,
    burnRateData: [120, 110, 95, 80, 65, 55, 45, 38],
    currentStock: 38,
    dailyUsage: 25,
  },
  {
    id: "3",
    name: "Pediatric Amoxicillin",
    location: "St. Jude's Relief Center",
    daysUntilEmpty: 4.2,
    burnRateData: [200, 190, 185, 175, 165, 155, 145, 138],
    currentStock: 420,
    dailyUsage: 100,
  },
  {
    id: "4",
    name: "Oxygen Cylinders",
    location: "North-West NGO Hub",
    daysUntilEmpty: 3.1,
    burnRateData: [80, 75, 72, 68, 62, 58, 52, 48],
    currentStock: 48,
    dailyUsage: 15,
  },
  {
    id: "5",
    name: "N95 Masks (Box)",
    location: "Metro General Hospital",
    daysUntilEmpty: 5.8,
    burnRateData: [500, 480, 465, 450, 430, 410, 395, 380],
    currentStock: 2900,
    dailyUsage: 500,
  },
];

const getStatusColor = (days: number) => {
  if (days <= 2) return { text: "text-crimson", bg: "bg-crimson/10", sparkline: "hsl(0, 100%, 64%)" };
  if (days <= 4) return { text: "text-amber", bg: "bg-amber/10", sparkline: "hsl(38, 92%, 50%)" };
  return { text: "text-emerald", bg: "bg-emerald/10", sparkline: "hsl(160, 84%, 39%)" };
};

export const PredictiveAnalytics = () => {
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
                className={`p-4 rounded-lg border border-glass-border/10 ${status.bg} transition-all duration-200 hover:border-glass-border/30 animate-fade-up`}
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.location}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Stock</p>
                        <p className="font-semibold">{item.currentStock.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Daily Usage</p>
                        <p className="font-semibold">{item.dailyUsage}/day</p>
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
                      <span className="text-sm font-bold tabular-nums">
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
