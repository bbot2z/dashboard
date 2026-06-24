import React, { useState } from "react";
import { 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Plus,
  ExternalLink,
  Settings,
  Unlink,
  Link
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "connected" | "available" | "coming_soon";
  category: string;
  connectedAt?: string;
}

const integrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and alerts to Slack channels",
    icon: "🔵",
    status: "connected",
    category: "Communication",
    connectedAt: "2024-06-15",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect repositories for deployment and monitoring",
    icon: "⚫",
    status: "connected",
    category: "Development",
    connectedAt: "2024-06-10",
  },
  {
    id: "datadog",
    name: "Datadog",
    description: "Send metrics and logs to Datadog for analysis",
    icon: "🟣",
    status: "available",
    category: "Monitoring",
  },
  {
    id: "aws",
    name: "AWS",
    description: "Deploy agents to AWS infrastructure",
    icon: "🟠",
    status: "connected",
    category: "Cloud",
    connectedAt: "2024-06-05",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    description: "Deploy agents to Google Cloud Platform",
    icon: "🔵",
    status: "available",
    category: "Cloud",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Manage billing and payments",
    icon: "⚪",
    status: "coming_soon",
    category: "Payments",
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    description: "Incident management and alerting",
    icon: "🔴",
    status: "available",
    category: "Incident Management",
  },
  {
    id: "webhook",
    name: "Custom Webhook",
    description: "Send data to custom endpoints",
    icon: "🔗",
    status: "available",
    category: "Custom",
  },
];

export default function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(integrations.map(i => i.category)));
  const connected = integrations.filter(i => i.status === "connected");
  const available = integrations.filter(i => i.status === "available");
  const comingSoon = integrations.filter(i => i.status === "coming_soon");

  const filtered = integrations.filter(i => 
    (searchTerm === "" || i.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === null || i.category === categoryFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
          <p className="text-slate-400">Connect external services to enhance Bixbott</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Connected</div>
            <div className="text-3xl font-bold text-green-400">{connected.length}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Available</div>
            <div className="text-3xl font-bold text-blue-400">{available.length}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Coming Soon</div>
            <div className="text-3xl font-bold text-slate-400">{comingSoon.length}</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
          <select
            value={categoryFilter || ""}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map(integration => (
            <div
              key={integration.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer group"
              onClick={() => setSelectedIntegration(integration)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{integration.icon}</div>
                <div className="flex items-center gap-2">
                  {integration.status === "connected" && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {integration.status === "coming_soon" && (
                    <AlertCircle className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{integration.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{integration.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                  {integration.category}
                </span>
                {integration.status === "connected" && (
                  <span className="text-xs text-green-400">Connected since {integration.connectedAt}</span>
                )}
              </div>

              <button
                className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                  integration.status === "connected"
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : integration.status === "coming_soon"
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={integration.status === "coming_soon"}
              >
                {integration.status === "connected" ? (
                  <>
                    <Link className="w-4 h-4" />
                    Configure
                  </>
                ) : integration.status === "coming_soon" ? (
                  "Coming Soon"
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Connect
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Connected Integrations Detail */}
        {selectedIntegration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedIntegration.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedIntegration.name}</h2>
                    <p className="text-slate-400">{selectedIntegration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    Connected
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Connected At</label>
                  <input
                    type="text"
                    value={selectedIntegration.connectedAt || "N/A"}
                    readOnly
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Configuration</label>
                  <textarea
                    defaultValue={`{\n  "api_key": "sk_live_****",\n  "webhook_enabled": true,\n  "auto_sync": true\n}`}
                    rows={5}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition font-medium flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Edit Configuration
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 hover:bg-red-600/30 transition font-medium flex items-center justify-center gap-2">
                  <Unlink className="w-5 h-5" />
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
