import { cn } from "@/lib/utils";
import { Activity, LayoutDashboard, Settings, HelpCircle, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export const Header = () => {
  const handleNavClick = (label: string) => {
    if (label === "Dashboard") return;
    toast.info(`${label} module coming soon`, {
      description: `The ${label} panel is currently under development.`,
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-up">
      <div className="bg-background/80 backdrop-blur-xl border-b border-glass-border/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald to-emerald/50 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Vanguard Essentials</h1>
              <p className="text-[10px] text-emerald font-semibold uppercase tracking-[0.2em]">AI Powered</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" active onClick={() => handleNavClick("Dashboard")} />
            <NavItem icon={BarChart3} label="Analytics" onClick={() => handleNavClick("Analytics")} />
            <NavItem icon={Settings} label="Settings" onClick={() => handleNavClick("Settings")} />
            <NavItem icon={HelpCircle} label="Support" onClick={() => handleNavClick("Support")} />
          </nav>

          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              <span className="text-xs font-medium text-emerald">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      active 
        ? "bg-secondary text-foreground" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
    )}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);
