import { useState, useMemo } from "react";
import { Activity, AlertCircle, TrendingUp, Zap, Server, Users } from "lucide-react";
import { CORE_MODULES, SERVICE_LAYERS } from "../data";
import { ServiceState } from "../types";

export default function Dashboard() {
  const [coreModules] = useState<ServiceState[]>(CORE_MODULES);
  const [serviceLayers] = useState<ServiceState[]>(SERVICE_LAYERS);

  const stats = useMemo(() => {
    const allModules = [...coreModules, ...serviceLayers];
    let totalCpu = 0;
    let totalMemory = 0;
    let activeNodes = 0;
    let errorCount = 0;
    let stability = 100;

    allModules.forEach(item => {
      if (item.status === "running") {
        totalCpu += item.cpu;
        totalMemory += item.memory;
        activeNodes += 1;
      } else if (item.status === "error") {
        errorCount += 1;
        stability -= 25;
      } else if (item.status === "stopped") {
        stability -= 10;
      }
    });

    return {
      cpu: parseFloat(totalCpu.toFixed(1)),
      memory: totalMemory,
      activeNodes,
      totalNodes: allModules.length,
      errorCount,
      stability: Math.max(5, stability)
    };
  }, [coreModules, serviceLayers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
              <p className="text-slate-400 mt-1">Real-time system monitoring and status</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">{stats.stability}%</div>
              <div className="text-xs text-slate-400">System Stability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Server,
              label: "Active Nodes",
              value: stats.activeNodes,
              total: stats.totalNodes,
              color: "emerald"
            },
            {
              icon: Zap,
              label: "CPU Usage",
              value: stats.cpu,
              total: 100,
              suffix: "%",
              color: "blue"
            },
            {
              icon: Activity,
              label: "Memory",
              value: stats.memory,
              suffix: " MB",
              color: "purple"
            },
            {
              icon: AlertCircle,
              label: "Errors",
              value: stats.errorCount,
              color: stats.errorCount > 0 ? "red" : "slate",
              highlight: stats.errorCount > 0
            }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorMap = {
              emerald: "from-emerald-500/20 to-emerald-600/10 text-emerald-400",
              blue: "from-blue-500/20 to-blue-600/10 text-blue-400",
              purple: "from-purple-500/20 to-purple-600/10 text-purple-400",
              red: "from-red-500/20 to-red-600/10 text-red-400",
              slate: "from-slate-500/20 to-slate-600/10 text-slate-400"
            };
            return (
              <div key={idx} className={`bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} border border-slate-700/50 rounded-lg p-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">
                      {stat.value}{stat.suffix || ""}
                    </p>
                    {stat.total && (
                      <p className="text-xs text-slate-400 mt-1">of {stat.total}{stat.suffix || ""}</p>
                    )}
                  </div>
                  <Icon className="w-8 h-8 opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* System Status Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Core Modules */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              Core Modules
            </h2>
            <div className="space-y-3">
              {coreModules.map((module) => (
                <div key={module.key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
                  <div className="flex-1">
                    <p className="font-medium text-white">{module.name}</p>
                    <p className="text-xs text-slate-400">{module.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-slate-400">CPU: {module.cpu}%</p>
                      <p className="text-xs text-slate-400">RAM: {module.memory}MB</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      module.status === "running" ? "bg-emerald-500" :
                      module.status === "stopped" ? "bg-slate-500" :
                      module.status === "error" ? "bg-red-500" :
                      "bg-yellow-500"
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Layers */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Service Layers
            </h2>
            <div className="space-y-3">
              {serviceLayers.map((service) => (
                <div key={service.key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
                  <div className="flex-1">
                    <p className="font-medium text-white">{service.name}</p>
                    <p className="text-xs text-slate-400">{service.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-slate-400">CPU: {service.cpu}%</p>
                      <p className="text-xs text-slate-400">RAM: {service.memory}MB</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === "running" ? "bg-emerald-500" :
                      service.status === "stopped" ? "bg-slate-500" :
                      service.status === "error" ? "bg-red-500" :
                      "bg-yellow-500"
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
