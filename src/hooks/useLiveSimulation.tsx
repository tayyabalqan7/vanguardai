import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";

// Base inventory data
const baseInventoryData = [
  { id: "1", name: "Insulin Glargine", location: "Central Regional Hospital", opening: 200, received: 50, baseIssued: 94, unit: "vials" },
  { id: "2", name: "Type O+ Blood Units", location: "East Zone Medical Center", opening: 85, received: 20, baseIssued: 67, unit: "units" },
  { id: "3", name: "Pediatric Amoxicillin", location: "St. Jude's Relief Center", opening: 350, received: 200, baseIssued: 130, unit: "bottles" },
  { id: "4", name: "Oxygen Cylinders", location: "North-West NGO Hub", opening: 60, received: 25, baseIssued: 37, unit: "cylinders" },
  { id: "5", name: "N95 Masks (Box)", location: "Metro General Hospital", opening: 2500, received: 1000, baseIssued: 600, unit: "boxes" },
];

// Base warning items
const baseWarningItems = [
  { id: "1", name: "Insulin Glargine", location: "Central Regional Hospital", baseDaysUntilEmpty: 2.8, baseCurrentStock: 156, baseDailyUsage: 56 },
  { id: "2", name: "Type O+ Blood Units", location: "East Zone Medical Center", baseDaysUntilEmpty: 1.5, baseCurrentStock: 38, baseDailyUsage: 25 },
  { id: "3", name: "Pediatric Amoxicillin", location: "St. Jude's Relief Center", baseDaysUntilEmpty: 4.2, baseCurrentStock: 420, baseDailyUsage: 100 },
  { id: "4", name: "Oxygen Cylinders", location: "North-West NGO Hub", baseDaysUntilEmpty: 3.1, baseCurrentStock: 48, baseDailyUsage: 15 },
  { id: "5", name: "N95 Masks (Box)", location: "Metro General Hospital", baseDaysUntilEmpty: 5.8, baseCurrentStock: 2900, baseDailyUsage: 500 },
];

// Map locations
const mapLocations = [
  { id: "1", name: "Central Regional Hospital", baseStatus: "critical" as const, itemsAtRisk: 3, x: 45, y: 35 },
  { id: "2", name: "St. Jude's Relief Center", baseStatus: "low" as const, itemsAtRisk: 2, x: 25, y: 55 },
  { id: "3", name: "Metro General Hospital", baseStatus: "healthy" as const, itemsAtRisk: 0, x: 65, y: 45 },
  { id: "4", name: "North-West NGO Hub", baseStatus: "low" as const, itemsAtRisk: 1, x: 35, y: 25 },
  { id: "5", name: "East Zone Medical Center", baseStatus: "critical" as const, itemsAtRisk: 4, x: 75, y: 30 },
  { id: "6", name: "Southern District Clinic", baseStatus: "healthy" as const, itemsAtRisk: 0, x: 55, y: 70 },
];

// AI Insights pool
const aiInsights = [
  "Snowflake Cortex Analysis: Increased burn rate detected at East Zone Medical Center. Recommending 15% stock diversion from Hub Alpha to prevent Type O+ shortage on Thursday.",
  "Pattern Recognition: Seasonal demand surge predicted for Pediatric Amoxicillin across Southern Districts. Initiating preemptive reorder sequence.",
  "Insight: Demand for Insulin Glargine in Metro General has spiked by 12%. Adjusting reorder thresholds.",
  "Recommendation: Route 200 units from Northern Warehouse to avoid Friday stock-out at Central Regional.",
  "Anomaly Alert: Insulin Glargine consumption at Central Regional Hospital exceeds baseline by 23%. Cross-referencing with patient intake data.",
  "Optimization Complete: Route efficiency improved by 12% for North-West corridor. Estimated savings: 2.3 hours per supply cycle.",
  "Predictive Alert: Type O+ Blood Units trending toward critical threshold at East Zone. Recommend emergency resupply within 48 hours.",
  "Stream Update: Real-time consumption spike detected at St. Jude's Relief Center. Oxygen demand up 18% in last hour.",
];

export interface InventoryItem {
  id: string;
  name: string;
  location: string;
  opening: number;
  received: number;
  issued: number;
  closing: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface WarningItem {
  id: string;
  name: string;
  location: string;
  daysUntilEmpty: number;
  burnRateData: number[];
  currentStock: number;
  dailyUsage: number;
}

export interface MapLocation {
  id: string;
  name: string;
  status: "healthy" | "low" | "critical";
  itemsAtRisk: number;
  x: number;
  y: number;
  isHighUsageEvent?: boolean;
}

interface LiveSimulationContextType {
  inventoryData: InventoryItem[];
  warningItems: WarningItem[];
  locations: MapLocation[];
  currentInsight: string;
  insightIndex: number;
  isLoading: boolean;
  lastUpdateTime: Date;
}

const LiveSimulationContext = createContext<LiveSimulationContextType | null>(null);

// Utility: fluctuate number by percentage
const fluctuate = (base: number, percentage: number = 5): number => {
  const variation = base * (percentage / 100);
  const change = (Math.random() - 0.5) * 2 * variation;
  return Math.max(0, Math.round(base + change));
};

export const LiveSimulationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [warningItems, setWarningItems] = useState<WarningItem[]>([]);
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [insightIndex, setInsightIndex] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(aiInsights[0]);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Generate inventory data with fluctuations
  const generateInventoryData = useCallback((): InventoryItem[] => {
    return baseInventoryData.map(item => {
      const issued = fluctuate(item.baseIssued, 8);
      const closing = item.opening + item.received - issued;
      const trend: "up" | "down" | "stable" = 
        issued > item.baseIssued * 1.05 ? "down" : 
        issued < item.baseIssued * 0.95 ? "up" : "stable";
      
      return {
        id: item.id,
        name: item.name,
        location: item.location,
        opening: item.opening,
        received: item.received,
        issued,
        closing,
        unit: item.unit,
        trend,
      };
    });
  }, []);

  // Generate warning items with fluctuations
  const generateWarningItems = useCallback((): WarningItem[] => {
    return baseWarningItems.map(item => {
      const currentStock = fluctuate(item.baseCurrentStock, 6);
      const dailyUsage = fluctuate(item.baseDailyUsage, 10);
      const daysUntilEmpty = Math.max(0.5, currentStock / dailyUsage);
      
      // Generate sparkline data
      const burnRateData: number[] = [];
      let stockLevel = currentStock * 1.5;
      for (let i = 0; i < 8; i++) {
        burnRateData.push(Math.round(stockLevel));
        stockLevel = Math.max(currentStock * 0.8, stockLevel - dailyUsage * (0.8 + Math.random() * 0.4));
      }
      
      return {
        id: item.id,
        name: item.name,
        location: item.location,
        daysUntilEmpty: Math.round(daysUntilEmpty * 10) / 10,
        burnRateData,
        currentStock,
        dailyUsage,
      };
    });
  }, []);

  // Initialize data after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setInventoryData(generateInventoryData());
      setWarningItems(generateWarningItems());
      setLocations(mapLocations.map(loc => ({ ...loc, status: loc.baseStatus, isHighUsageEvent: false })));
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [generateInventoryData, generateWarningItems]);

  // Fluctuate data every 5 seconds
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setInventoryData(generateInventoryData());
      setWarningItems(generateWarningItems());
      setLastUpdateTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading, generateInventoryData, generateWarningItems]);

  // Cycle insights every 15 seconds
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setInsightIndex(prev => {
        const next = (prev + 1) % aiInsights.length;
        setCurrentInsight(aiInsights[next]);
        return next;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Random high usage event every 10 seconds
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setLocations(prev => {
        const newLocations = prev.map(loc => ({ ...loc, isHighUsageEvent: false }));
        const randomIndex = Math.floor(Math.random() * newLocations.length);
        newLocations[randomIndex].isHighUsageEvent = true;
        return newLocations;
      });

      // Clear the event after 3 seconds
      setTimeout(() => {
        setLocations(prev => prev.map(loc => ({ ...loc, isHighUsageEvent: false })));
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <LiveSimulationContext.Provider value={{
      inventoryData,
      warningItems,
      locations,
      currentInsight,
      insightIndex,
      isLoading,
      lastUpdateTime,
    }}>
      {children}
    </LiveSimulationContext.Provider>
  );
};

export const useLiveSimulation = () => {
  const context = useContext(LiveSimulationContext);
  if (!context) {
    throw new Error("useLiveSimulation must be used within LiveSimulationProvider");
  }
  return context;
};
