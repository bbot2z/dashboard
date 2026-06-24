import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Activity, Cpu, HardDrive, Network, Clock, RefreshCw } from "lucide-react";

interface MonitoringEvent {
  id: string;
  timestamp: string;
  service: string;
  level: "info" | "warn" | "error" | "critical";
  message: string;
}

export default function Monitoring() {
  const [events, setEvents] = useState<MonitoringEvent[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial mock events
    setEvents([
      {
        id: "1",
        timestamp: new Date().toLocaleTimeString(),
        service: "API Gateway",
        level: "info",
        message: "Request rate: 2.4K req/s"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
        service: "Database",
        level: "warn",
        message: "Memory usage at 82%, approaching threshold"
      }
    ]);

    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const levels: Array<"info" | "warn" | "error" | "critical"> = ["info", "warn", "error", "critical"];
      const services = ["API Gateway", "Database", "Cache Layer", "Message Queue"];
      const messages = [
        "Heartbeat received",
        "Connection established",
        "Performance degradation detected",
        "Service unhealthy",
        "Memory limit exceeded"
      ];

      const newEvent: MonitoringEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        service: services[Math.floor(Math.random() * services.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 50));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  useEffect(() => {
    if (autoRefresh && eventsRef.current) {
      eventsRef.current.scrollTop = 0;
    }
  }, [events, autoRefresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Monitoring</h1>
              <p className="text-slate-400 mt-1">Real-time system events and alerts</p>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                autoRefresh
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Live" : "Paused"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Cpu, label: "CPU Health", status: "healthy", value: "72%" },
            { icon: HardDrive, label: "Memory Health", status: "warning", value: "82%" },
            { icon: Network, label: "Network", status: "healthy", value: "1.2 Gbps" },
            { icon: Activity, label: "Throughput", status: "healthy", value: "2.4K req/s" }
          ].map((item, idx) => {
            const Icon = item.icon;
            const statusColors = {
              healthy: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30",
              warning: "from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/30",
              critical: "from-red-500/20 to-red-600/10 text-red-400 border-red-500/30"
            };
            return (
              <div key={idx} className={`bg-gradient-to-br ${statusColors[item.status as keyof typeof statusColors]} border rounded-lg p-4`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                    <p className="text-2xl font-bold mt-2">{item.value}</p>
                  </div>
                  <Icon className="w-6 h-6 opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Events Timeline */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Event Stream
            </h2>
            <span className="text-xs bg-slate-700/50 px-3 py-1 rounded-full">
              {events.length} events
            </span>
          </div>

          <div ref={eventsRef} className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-slate-700/30">
              {events.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No events yet</p>
                </div>
              ) : (
                events.map((event) => {
                  const levelStyles = {
                    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    warn: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                    error: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                    critical: "bg-red-500/10 text-red-400 border-red-500/20"
                  };
                  return (
                    <div key={event.id} className="px-6 py-4 hover:bg-slate-700/20 transition">
                      <div className="flex items-start gap-4">
                        <div className={`px-3 py-1 rounded border text-xs font-bold uppercase ${levelStyles[event.level]}`}>
                          {event.level === "critical" ? (
                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                          ) : null}
                          {event.level}
                        </div>
                        <div className="flex-1">
                          <p className="font-mono text-sm text-slate-200">{event.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">{event.service}</span>
                            <span className="text-xs text-slate-500">{event.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              title: "CPU Thresholds",
              items: [
                { label: "Warning", value: "75%", color: "yellow" },
                { label: "Critical", value: "90%", color: "red" }
              ]
            },
            {
              title: "Memory Thresholds",
              items: [
                { label: "Warning", value: "80%", color: "yellow" },
                { label: "Critical", value: "95%", color: "red" }
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
                    <span className="text-slate-300">{item.label}</span>
                    <span className={`text-sm font-bold ${
                      item.color === "yellow" ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
