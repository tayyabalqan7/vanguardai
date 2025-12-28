import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { HeatMap } from "@/components/HeatMap";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { IntelligenceBar } from "@/components/IntelligenceBar";
import { InventoryTable } from "@/components/InventoryTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-secondary/20 to-transparent" />
      </div>

      <Header />

      <main className="relative z-10 container mx-auto px-6 pt-24 pb-32">
        {/* Page Title */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Command Center</h1>
          <p className="text-muted-foreground">Real-time inventory intelligence across your global network</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard 
            title="Locations Monitored" 
            value={247} 
            icon="locations" 
            status="healthy"
            delay={0.05}
          />
          <KPICard 
            title="Critical Items at Risk" 
            value={12} 
            icon="critical" 
            status="critical"
            delay={0.1}
          />
          <KPICard 
            title="Avg Days to Stock-Out" 
            value={4.2} 
            suffix="days"
            icon="days" 
            status="warning"
            delay={0.15}
          />
          <KPICard 
            title="Snowflake Sync Status" 
            value={100} 
            suffix="%"
            icon="sync" 
            status="healthy"
            delay={0.2}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Heat Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <HeatMap />
          </div>

          {/* Predictive Analytics Panel */}
          <div className="lg:col-span-1">
            <PredictiveAnalytics />
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable />
      </main>

      {/* AI Intelligence Bar */}
      <IntelligenceBar />
    </div>
  );
};

export default Index;
