import { Header } from "@/components/Header";
import { GlassCard } from "@/components/GlassCard";
import { ArrowLeft, Bell, Database, Shield, Palette, Clock, Globe, Zap, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const settingsSections = [
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    description: 'Configure alerts and notification preferences',
    settings: [
      { id: 'stockout_alerts', label: 'Stock-out Alerts', description: 'Get notified when items reach critical levels', enabled: true },
      { id: 'reorder_reminders', label: 'Reorder Reminders', description: 'Automatic reminders for pending reorders', enabled: true },
      { id: 'ai_insights', label: 'AI Insight Notifications', description: 'Receive Cortex AI recommendations', enabled: false },
      { id: 'email_digest', label: 'Daily Email Digest', description: 'Summary of inventory changes', enabled: true },
    ]
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data & Sync',
    description: 'Manage data synchronization and refresh rates',
    settings: [
      { id: 'auto_sync', label: 'Auto-Sync Enabled', description: 'Automatically sync with Snowflake', enabled: true },
      { id: 'real_time', label: 'Real-time Updates', description: 'Stream live data changes', enabled: true },
    ]
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security',
    description: 'Access control and security settings',
    settings: [
      { id: 'two_factor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security', enabled: false },
      { id: 'session_timeout', label: 'Auto Session Timeout', description: 'Automatically log out after inactivity', enabled: true },
      { id: 'audit_log', label: 'Audit Logging', description: 'Track all system changes', enabled: true },
    ]
  },
];

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    settingsSections.forEach(section => {
      section.settings.forEach(setting => {
        initial[setting.id] = setting.enabled;
      });
    });
    return initial;
  });
  
  const [refreshRate, setRefreshRate] = useState([5]);
  const [selectedSection, setSelectedSection] = useState('notifications');

  const handleToggle = (id: string) => {
    setSettings(prev => {
      const newValue = !prev[id];
      toast.success(`Setting ${newValue ? 'enabled' : 'disabled'}`, {
        description: `Changes saved to Snowflake configuration.`
      });
      return { ...prev, [id]: newValue };
    });
  };

  const handleRefreshRateChange = (value: number[]) => {
    setRefreshRate(value);
    toast.info(`Refresh rate updated to ${value[0]} seconds`);
  };

  const currentSection = settingsSections.find(s => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link 
              to="/" 
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Configure your Vanguard Essentials experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2">
              {settingsSections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left animate-fade-in ${
                    selectedSection === section.id 
                      ? 'bg-emerald/10 border border-emerald/30 text-foreground' 
                      : 'bg-secondary/30 hover:bg-secondary/50 text-muted-foreground'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <section.icon className={`w-5 h-5 ${selectedSection === section.id ? 'text-emerald' : ''}`} />
                  <div className="flex-1">
                    <p className="font-medium">{section.title}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedSection === section.id ? 'rotate-90' : ''}`} />
                </button>
              ))}

              {/* Quick Actions */}
              <GlassCard className="p-4 mt-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald" />
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => toast.success('Cache cleared successfully')}
                    className="w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Clear Cache
                  </button>
                  <button 
                    onClick={() => toast.success('Data export started')}
                    className="w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Export Data
                  </button>
                  <button 
                    onClick={() => toast.info('Sync initiated with Snowflake')}
                    className="w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Force Sync
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                {currentSection && (
                  <>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                      <div className="p-3 rounded-xl bg-emerald/10">
                        <currentSection.icon className="w-6 h-6 text-emerald" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{currentSection.title}</h2>
                        <p className="text-sm text-muted-foreground">{currentSection.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentSection.settings.map((setting, i) => (
                        <div 
                          key={setting.id} 
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors animate-fade-in"
                          style={{ animationDelay: `${(i + 2) * 50}ms` }}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{setting.label}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                          <Switch 
                            checked={settings[setting.id]} 
                            onCheckedChange={() => handleToggle(setting.id)}
                          />
                        </div>
                      ))}

                      {/* Data refresh rate slider for Data section */}
                      {currentSection.id === 'data' && (
                        <div className="p-4 rounded-xl bg-secondary/20 animate-fade-in" style={{ animationDelay: '150ms' }}>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Data Refresh Rate
                              </p>
                              <p className="text-sm text-muted-foreground">How often to fetch new data</p>
                            </div>
                            <span className="text-lg font-bold text-emerald">{refreshRate[0]}s</span>
                          </div>
                          <Slider
                            value={refreshRate}
                            onValueChange={handleRefreshRateChange}
                            min={1}
                            max={30}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>1s (Real-time)</span>
                            <span>30s (Battery saver)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </GlassCard>

              {/* Status Card */}
              <GlassCard className="p-4 mt-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-emerald/10">
                    <Check className="w-5 h-5 text-emerald" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">All Systems Operational</p>
                    <p className="text-sm text-muted-foreground">Connected to Snowflake • Last sync: 2 seconds ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
                    </span>
                    <span className="text-xs text-emerald font-medium">Live</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
