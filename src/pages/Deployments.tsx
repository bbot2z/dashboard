import { useState } from "react";
import { Plus, MoreVertical, Play, Square, Trash2, ExternalLink, AlertCircle, CheckCircle, Clock, BarChart3 } from "lucide-react";

interface Deployment {
  id: string;
  name: string;
  agent: string;
  environment: "production" | "staging" | "development";
  status: "active" | "inactive" | "error" | "deploying";
  uptime: string;
  requests: number;
  avgLatency: number;
  errorRate: number;
  region: string;
  version: string;
  lastDeployed: string;
}

const mockDeployments: Deployment[] = [
  {
    id: "1",
    name: "Email Assistant - Prod",
    agent: "Email Responder",
    environment: "production",
    status: "active",
    uptime: "99.98%",
    requests: 125000,
    avgLatency: 245,
    errorRate: 0.02,
    region: "us-east-1",
    version: "2.4.1",
    lastDeployed: "2 days ago"
  },
  {
    id: "2",
    name: "Data Analyzer - Prod",
    agent: "Data Analyzer",
    environment: "production",
    status: "active",
    uptime: "99.95%",
    requests: 89000,
    avgLatency: 523,
    errorRate: 0.05,
    region: "eu-west-1",
    version: "1.8.3",
    lastDeployed: "5 days ago"
  },
  {
    id: "3",
    name: "Monitoring Alert - Prod",
    agent: "Deployment Monitor",
    environment: "production",
    status: "active",
    uptime: "100%",
    requests: 234000,
    avgLatency: 156,
    errorRate: 0,
    region: "us-west-2",
    version: "3.1.0",
    lastDeployed: "1 day ago"
  },
  {
    id: "4",
    name: "Report Generator - Staging",
    agent: "Report Generator",
    environment: "staging",
    status: "deploying",
    uptime: "N/A",
    requests: 0,
    avgLatency: 0,
    errorRate: 0,
    region: "us-east-1",
    version: "2.0.0-beta",
    lastDeployed: "Just now"
  },
  {
    id: "5",
    name: "Code Reviewer - Dev",
    agent: "Code Reviewer",
    environment: "development",
    status: "inactive",
    uptime: "N/A",
    requests: 0,
    avgLatency: 0,
    errorRate: 0,
    region: "localhost",
    version: "1.0.0-dev",
    lastDeployed: "3 days ago"
  },
  {
    id: "6",
    name: "Email Assistant - Staging",
    agent: "Email Responder",
    environment: "staging",
    status: "active",
    uptime: "99.92%",
    requests: 12000,
    avgLatency: 267,
    errorRate: 0.08,
    region: "us-east-1",
    version: "2.4.0",
    lastDeployed: "12 hours ago"
  }
];

export default function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [filterEnv, setFilterEnv] = useState<"all" | "production" | "staging" | "development">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "error" | "deploying">("all");

  const filteredDeployments = deployments.filter(d => {
    const matchesEnv = filterEnv === "all" || d.environment === filterEnv;
    const matchesStatus = filterStatus === "all" || d.status === filterStatus;
    return matchesEnv && matchesStatus;
  });

  const statusConfig = {
    active: { icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    inactive: { icon: Square, color: "text-slate-400 bg-slate-500/10 border-slate-500/30" },
    error: { icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/30" },
    deploying: { icon: Clock, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" }
  };

  const envConfig = {
    production: { badge: "bg-red-500/20 text-red-300 border-red-500/30" },
    staging: { badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
    development: { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Deployments</h1>
              <p className="text-slate-400 mt-1">Manage agent deployments across environments</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              New Deployment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-col sm:flex-row">
          <select
            value={filterEnv}
            onChange={(e) => setFilterEnv(e.target.value as any)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
          >
            <option value="all">All Environments</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="deploying">Deploying</option>
            <option value="error">Error</option>
          </select>
        </div>

        {/* Deployments List */}
        <div className="space-y-4">
          {filteredDeployments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No deployments found</p>
            </div>
          ) : (
            filteredDeployments.map((deployment) => {
              const StatusIcon = statusConfig[deployment.status].icon;
              return (
                <div key={deployment.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{deployment.name}</h3>
                        <span className={`px-2.5 py-1 rounded text-xs font-bold border capitalize ${statusConfig[deployment.status].color}`}>
                          {deployment.status}
                        </span>
                        <span className={`px-2.5 py-1 rounded text-xs font-bold border capitalize ${envConfig[deployment.environment].badge}`}>
                          {deployment.environment}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">Agent: {deployment.agent}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                        {deployment.status === "active" ? (
                          <Square className="w-5 h-5 text-amber-400 hover:text-amber-300" />
                        ) : (
                          <Play className="w-5 h-5 text-emerald-400 hover:text-emerald-300" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                        <ExternalLink className="w-5 h-5 text-slate-400 hover:text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                    {[
                      { label: "Uptime", value: deployment.uptime },
                      { label: "Requests", value: deployment.requests.toLocaleString() },
                      { label: "Avg Latency", value: deployment.avgLatency + "ms" },
                      { label: "Error Rate", value: deployment.errorRate + "%" },
                      { label: "Region", value: deployment.region },
                      { label: "Version", value: deployment.version }
                    ].map((metric, idx) => (
                      <div key={idx} className="px-3 py-2 bg-slate-900/50 rounded border border-slate-700/30">
                        <p className="text-xs text-slate-500 mb-1">{metric.label}</p>
                        <p className="text-sm font-bold text-slate-200">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                    <span className="text-xs text-slate-500">Last deployed: {deployment.lastDeployed}</span>
                    <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition">
                      View Logs →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Environment Overview Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              env: "Production",
              color: "from-red-500/20 to-red-600/10",
              count: deployments.filter(d => d.environment === "production").length,
              active: deployments.filter(d => d.environment === "production" && d.status === "active").length
            },
            {
              env: "Staging",
              color: "from-yellow-500/20 to-yellow-600/10",
              count: deployments.filter(d => d.environment === "staging").length,
              active: deployments.filter(d => d.environment === "staging" && d.status === "active").length
            },
            {
              env: "Development",
              color: "from-blue-500/20 to-blue-600/10",
              count: deployments.filter(d => d.environment === "development").length,
              active: deployments.filter(d => d.environment === "development" && d.status === "active").length
            }
          ].map((card, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${card.color} border border-slate-700/50 rounded-lg p-6`}>
              <h3 className="font-bold text-white mb-3">{card.env}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total</span>
                  <span className="text-2xl font-bold">{card.count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Active</span>
                  <span className="text-xl font-bold text-emerald-400">{card.active}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
