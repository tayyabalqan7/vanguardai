import { Header } from "@/components/Header";
import { GlassCard } from "@/components/GlassCard";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart3, PieChart, LineChart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, LineChart as RechartsLine, Line } from "recharts";

const generateTimeSeriesData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    demand: Math.floor(Math.random() * 5000) + 3000,
    supply: Math.floor(Math.random() * 4500) + 3500,
    predicted: Math.floor(Math.random() * 5500) + 3200,
  }));
};

const categoryData = [
  { name: 'Cardiac', value: 35, color: 'hsl(var(--emerald))' },
  { name: 'Diabetes', value: 28, color: 'hsl(var(--chart-2))' },
  { name: 'Oncology', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Antibiotics', value: 17, color: 'hsl(var(--chart-4))' },
];

const performanceData = [
  { metric: 'Fill Rate', current: 94, target: 95 },
  { metric: 'Stockout', current: 2.1, target: 1 },
  { metric: 'Turnover', current: 12.4, target: 14 },
  { metric: 'Accuracy', current: 98.7, target: 99 },
];

export default function Analytics() {
  const [data, setData] = useState(generateTimeSeriesData());
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateTimeSeriesData());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link 
              to="/" 
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics Hub</h1>
              <p className="text-muted-foreground">Real-time insights powered by Snowflake Cortex AI</p>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20">
              <Zap className="w-4 h-4 text-emerald animate-pulse" />
              <span className="text-sm font-medium text-emerald">Live Data Stream</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total SKUs Tracked', value: '2,847', change: '+12%', up: true, icon: BarChart3 },
              { label: 'Demand Forecast Accuracy', value: '94.2%', change: '+2.1%', up: true, icon: TrendingUp },
              { label: 'Avg Stock Turnover', value: '12.4x', change: '-0.8x', up: false, icon: Activity },
              { label: 'Cost Savings (MTD)', value: '$847K', change: '+$124K', up: true, icon: LineChart },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.up ? 'text-emerald' : 'text-destructive'}`}>
                      {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald/10">
                    <stat.icon className="w-5 h-5 text-emerald" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Demand vs Supply Trend */}
            <GlassCard className="lg:col-span-2 p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Demand vs Supply Trend</h3>
                  <p className="text-sm text-muted-foreground">12-month analysis with AI predictions</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald" />
                    <span>Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-2" />
                    <span>Supply</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-3 opacity-50" />
                    <span>Predicted</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--emerald))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--emerald))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="demand" stroke="hsl(var(--emerald))" fill="url(#demandGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="supply" stroke="hsl(var(--chart-2))" fill="url(#supplyGradient)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-3))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Category Distribution */}
            <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg font-semibold mb-2">Category Distribution</h3>
              <p className="text-sm text-muted-foreground mb-4">Inventory by therapeutic area</p>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        opacity={index === activeIndex ? 1 : 0.7}
                        stroke={index === activeIndex ? 'hsl(var(--foreground))' : 'none'}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                    <span className="ml-auto font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Performance Metrics */}
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold mb-6">Performance Metrics vs Targets</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {performanceData.map((item, i) => {
                const percentage = (item.current / item.target) * 100;
                const isGood = item.metric === 'Stockout' ? item.current <= item.target : item.current >= item.target;
                return (
                  <div key={i} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--secondary))"
                          strokeWidth="8"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke={isGood ? 'hsl(var(--emerald))' : 'hsl(var(--destructive))'}
                          strokeWidth="8"
                          strokeDasharray={`${Math.min(percentage, 100) * 2.51} 251`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{item.current}</span>
                      </div>
                    </div>
                    <p className="font-medium">{item.metric}</p>
                    <p className="text-xs text-muted-foreground">Target: {item.target}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
