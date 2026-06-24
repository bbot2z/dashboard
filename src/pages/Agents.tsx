import { useState } from "react";
import { Plus, MoreVertical, Play, Pause, Trash2, Settings, Search, Filter, Bot, Clock, Zap } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  status: "running" | "stopped" | "error";
  type: "autonomous" | "reactive" | "proactive";
  uptime: string;
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  model: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Email Responder",
    status: "running",
    type: "autonomous",
    uptime: "45d 12h",
    tasksCompleted: 2451,
    successRate: 98.2,
    lastActive: "2 mins ago",
    model: "Claude 3.5 Sonnet"
  },
  {
    id: "2",
    name: "Data Analyzer",
    status: "running",
    type: "proactive",
    uptime: "32d 8h",
    tasksCompleted: 1823,
    successRate: 96.5,
    lastActive: "5 mins ago",
    model: "GPT-4 Turbo"
  },
  {
    id: "3",
    name: "Deployment Monitor",
    status: "running",
    type: "reactive",
    uptime: "60d",
    tasksCompleted: 3456,
    successRate: 99.1,
    lastActive: "Just now",
    model: "Gemini Pro"
  },
  {
    id: "4",
    name: "Report Generator",
    status: "stopped",
    type: "autonomous",
    uptime: "0h",
    tasksCompleted: 892,
    successRate: 97.3,
    lastActive: "3 days ago",
    model: "Claude 3 Opus"
  }
];

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "autonomous" | "reactive" | "proactive">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "running" | "stopped" | "error">("all");

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || agent.type === filterType;
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === "running" ? "stopped" : "running" }
        : agent
    ));
  };

  const statusColors = {
    running: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    stopped: "text-slate-400 bg-slate-500/10 border-slate-500/30",
    error: "text-red-400 bg-red-500/10 border-red-500/30"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Agents</h1>
              <p className="text-slate-400 mt-1">Manage AI agents and their configurations</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              New Agent
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
              >
                <option value="all">All Types</option>
                <option value="autonomous">Autonomous</option>
                <option value="reactive">Reactive</option>
                <option value="proactive">Proactive</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="stopped">Stopped</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Total Agents", value: agents.length },
              { label: "Running", value: agents.filter(a => a.status === "running").length },
              { label: "Avg Success Rate", value: (agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length).toFixed(1) + "%" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 mx-auto mb-4 text-slate-500" />
              <p className="text-slate-400">No agents found</p>
            </div>
          ) : (
            filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{agent.name}</h3>
                        <p className="text-xs text-slate-400">{agent.model}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      {[
                        { icon: Clock, label: "Uptime", value: agent.uptime },
                        { icon: Zap, label: "Tasks", value: agent.tasksCompleted.toLocaleString() },
                        { icon: Filter, label: "Success", value: agent.successRate + "%" },
                        { icon: Clock, label: "Last Active", value: agent.lastActive }
                      ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                          <div key={idx}>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                              <Icon className="w-3 h-3" />
                              {stat.label}
                            </p>
                            <p className="text-sm font-medium text-slate-200">{stat.value}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <span className={`inline-block px-3 py-1 rounded border text-xs font-bold capitalize ${statusColors[agent.status]}`}>
                        {agent.status}
                      </span>
                      <span className="px-3 py-1 rounded bg-slate-700/50 text-xs font-medium text-slate-300 capitalize">
                        {agent.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      className="p-2 hover:bg-slate-700/50 rounded-lg transition"
                      title={agent.status === "running" ? "Pause" : "Play"}
                    >
                      {agent.status === "running" ? (
                        <Pause className="w-5 h-5 text-slate-400 hover:text-amber-400" />
                      ) : (
                        <Play className="w-5 h-5 text-slate-400 hover:text-emerald-400" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition" title="Settings">
                      <Settings className="w-5 h-5 text-slate-400 hover:text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition group" title="Delete">
                      <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
