import { GlassCard } from "./GlassCard";
import { Skeleton } from "./ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald/3 rounded-full blur-[120px]" />
      </div>

      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </div>
          </div>
        </GlassCard>
      </header>

      <main className="relative z-10 container mx-auto px-6 pt-24 pb-32">
        {/* Loading Message */}
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
              <span className="text-emerald font-mono text-sm tracking-wider uppercase">
                Fetching data from Snowflake...
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-2 h-8 bg-emerald/30 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </GlassCard>
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Heat Map Skeleton */}
          <div className="lg:col-span-2">
            <GlassCard className="h-[500px] p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-[380px] w-full rounded-lg" />
              </div>
            </GlassCard>
          </div>

          {/* Predictive Analytics Skeleton */}
          <div className="lg:col-span-1">
            <GlassCard className="h-full p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-48" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/20 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                    <div className="flex gap-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Inventory Table Skeleton */}
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-glass-border/10">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40 flex-1" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </GlassCard>
      </main>
    </div>
  );
};
