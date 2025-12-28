import { GlassCard } from "./GlassCard";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";

const getStockStatus = (closing: number, issued: number) => {
  const daysLeft = closing / (issued / 7);
  if (daysLeft <= 3) return { color: "text-crimson", bg: "bg-crimson/10" };
  if (daysLeft <= 7) return { color: "text-amber", bg: "bg-amber/10" };
  return { color: "text-emerald", bg: "bg-emerald/10" };
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up") return <ArrowUpRight className="w-4 h-4 text-emerald" />;
  if (trend === "down") return <ArrowDownRight className="w-4 h-4 text-crimson" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export const InventoryTable = () => {
  const { inventoryData, lastUpdateTime } = useLiveSimulation();

  return (
    <div className="animate-fade-up stagger-5">
      <GlassCard className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-glass-border/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Inventory Ledger</h2>
              <p className="text-sm text-muted-foreground">Real-time stock movements and closing balances</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span>Last sync: {lastUpdateTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border/10 bg-secondary/30">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Opening</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Received</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issued</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Closing</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => {
                const status = getStockStatus(item.closing, item.issued);
                return (
                  <tr 
                    key={item.id}
                    className="border-b border-glass-border/5 hover:bg-secondary/20 transition-colors animate-fade-up"
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums">
                      {item.opening.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums text-emerald">
                      +{item.received.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums text-crimson transition-all duration-300">
                      -{item.issued.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-md font-bold tabular-nums transition-all duration-300 ${status.bg} ${status.color}`}>
                        {item.closing.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <TrendIcon trend={item.trend} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-glass-border/10 bg-secondary/20">
          <p className="text-xs text-muted-foreground">
            Formula: <span className="font-mono text-foreground">Closing Stock = Opening + Received - Issued</span>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
