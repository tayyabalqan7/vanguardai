import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { useLiveSimulation, MapLocation } from "@/hooks/useLiveSimulation";

const statusColors = {
  healthy: { ring: "bg-emerald", glow: "shadow-[0_0_20px_hsl(160_84%_39%/0.6)]" },
  low: { ring: "bg-amber", glow: "shadow-[0_0_20px_hsl(38_92%_50%/0.6)]" },
  critical: { ring: "bg-crimson", glow: "shadow-[0_0_20px_hsl(0_100%_64%/0.6)]" },
};

export const HeatMap = () => {
  const { locations } = useLiveSimulation();
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (location: MapLocation, e: React.MouseEvent) => {
    setHoveredLocation(location);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="animate-fade-up stagger-3">
      <GlassCard className="p-0 overflow-hidden h-[500px]">
        {/* Map Header */}
        <div className="px-6 py-4 border-b border-glass-border/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Global Distribution Network</h2>
              <p className="text-sm text-muted-foreground">Real-time inventory status across all facilities</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
                <span className="text-xs text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100%-72px)] bg-gradient-to-br from-background via-secondary/20 to-background">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--emerald))" stopOpacity="0.2" />
                <stop offset="50%" stopColor="hsl(var(--emerald))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--emerald))" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {locations.map((loc, i) => 
              locations.slice(i + 1).map((loc2) => (
                <line
                  key={`${loc.id}-${loc2.id}`}
                  x1={`${loc.x}%`}
                  y1={`${loc.y}%`}
                  x2={`${loc2.x}%`}
                  y2={`${loc2.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                  style={{ animationDelay: `${(i) * 0.2}s` }}
                />
              ))
            )}
          </svg>

          {/* Location Markers */}
          {locations.map((location) => {
            const effectiveStatus = location.isHighUsageEvent ? "critical" : location.status;
            return (
              <div
                key={location.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={(e) => handleMouseEnter(location, e)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* High Usage Event Alert Ring */}
                {location.isHighUsageEvent && (
                  <>
                    <div className="absolute inset-0 w-16 h-16 -m-6 rounded-full bg-crimson opacity-30 animate-ping" />
                    <div className="absolute inset-0 w-12 h-12 -m-4 rounded-full border-2 border-crimson opacity-60 animate-pulse" />
                  </>
                )}

                {/* Pulse Rings */}
                <div className={`absolute inset-0 w-8 h-8 -m-2 rounded-full ${statusColors[effectiveStatus].ring} opacity-20 animate-[ripple_2s_ease-out_infinite]`} style={{ animationDelay: '0s' }} />
                <div className={`absolute inset-0 w-8 h-8 -m-2 rounded-full ${statusColors[effectiveStatus].ring} opacity-20 animate-[ripple_2s_ease-out_infinite]`} style={{ animationDelay: '0.5s' }} />
                <div className={`absolute inset-0 w-8 h-8 -m-2 rounded-full ${statusColors[effectiveStatus].ring} opacity-20 animate-[ripple_2s_ease-out_infinite]`} style={{ animationDelay: '1s' }} />
                
                {/* Center Point */}
                <div 
                  className={`relative w-4 h-4 rounded-full ${statusColors[effectiveStatus].ring} ${statusColors[effectiveStatus].glow} transition-all duration-300 hover:scale-150`}
                >
                  <div className={`absolute inset-1 rounded-full bg-background`} />
                  <div className={`absolute inset-1.5 rounded-full ${statusColors[effectiveStatus].ring}`} />
                </div>

                {/* High Usage Event Label */}
                {location.isHighUsageEvent && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] font-bold text-crimson uppercase tracking-wider bg-crimson/20 px-2 py-0.5 rounded animate-pulse">
                      High Usage Event
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Tooltip */}
          {hoveredLocation && (
            <div 
              className="fixed z-50 pointer-events-none animate-fade-up"
              style={{ 
                left: tooltipPosition.x + 15, 
                top: tooltipPosition.y - 10,
                animationDuration: '0.15s'
              }}
            >
              <GlassCard className="p-4 min-w-[240px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColors[hoveredLocation.isHighUsageEvent ? 'critical' : hoveredLocation.status].ring}`} />
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      hoveredLocation.isHighUsageEvent || hoveredLocation.status === 'critical' ? 'text-crimson' :
                      hoveredLocation.status === 'low' ? 'text-amber' : 'text-emerald'
                    }`}>
                      {hoveredLocation.isHighUsageEvent ? 'HIGH USAGE EVENT' : hoveredLocation.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-sm">{hoveredLocation.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Essential Items at Risk</p>
                    <p className={`text-2xl font-bold ${
                      hoveredLocation.itemsAtRisk > 2 ? 'text-crimson' :
                      hoveredLocation.itemsAtRisk > 0 ? 'text-amber' : 'text-emerald'
                    }`}>
                      {hoveredLocation.itemsAtRisk}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
