import React, { useState } from "react";
import { 
  Activity, 
  Search,
  Calendar,
  User,
  GitCommit,
  Download
} from "lucide-react";

interface Event {
  id: string;
  timestamp: string;
  type: "deployment" | "agent-update" | "user-action" | "integration" | "configuration";
  title: string;
  description: string;
  user?: string;
  resource?: string;
  status: "success" | "pending" | "failed";
}

const mockEvents: Event[] = [
  {
    id: "1",
    timestamp: "2024-06-24 14:32:15",
    type: "deployment",
    title: "Agent v1.0.5 Deployed",
    description: "Successfully deployed agent-01 to production",
    user: "john.doe@example.com",
    resource: "agent-01",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2024-06-24 14:28:42",
    type: "agent-update",
    title: "Agent Configuration Updated",
    description: "Updated agent-02 configuration with new parameters",
    user: "jane.smith@example.com",
    resource: "agent-02",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2024-06-24 14:25:08",
    type: "integration",
    title: "Slack Integration Connected",
    description: "Connected Slack workspace for notifications",
    user: "admin@example.com",
    status: "success",
  },
  {
    id: "4",
    timestamp: "2024-06-24 14:20:33",
    type: "user-action",
    title: "User Invited to Team",
    description: "Invited alex.johnson@example.com to development team",
    user: "john.doe@example.com",
    status: "pending",
  },
  {
    id: "5",
    timestamp: "2024-06-24 14:15:21",
    type: "configuration",
    title: "System Settings Changed",
    description: "Updated system timezone and language preferences",
    user: "admin@example.com",
    status: "success",
  },
  {
    id: "6",
    timestamp: "2024-06-24 14:10:44",
    type: "deployment",
    title: "Deployment Rollback",
    description: "Rolled back agent-03 to previous version due to errors",
    user: "jane.smith@example.com",
    resource: "agent-03",
    status: "failed",
  },
  {
    id: "7",
    timestamp: "2024-06-24 14:05:12",
    type: "agent-update",
    title: "Agent Status Changed",
    description: "Agent-04 status changed from running to stopped",
    user: "system",
    resource: "agent-04",
    status: "success",
  },
  {
    id: "8",
    timestamp: "2024-06-24 13:58:37",
    type: "integration",
    title: "API Key Regenerated",
    description: "Regenerated API key for external integration",
    user: "admin@example.com",
    status: "success",
  },
];

const typeColors = {
  deployment: { bg: "bg-blue-600/20", text: "text-blue-400", label: "Deployment" },
  "agent-update": { bg: "bg-purple-600/20", text: "text-purple-400", label: "Agent Update" },
  "user-action": { bg: "bg-green-600/20", text: "text-green-400", label: "User Action" },
  integration: { bg: "bg-orange-600/20", text: "text-orange-400", label: "Integration" },
  configuration: { bg: "bg-cyan-600/20", text: "text-cyan-400", label: "Configuration" },
};

const statusColors = {
  success: "bg-green-600/20 text-green-400",
  pending: "bg-yellow-600/20 text-yellow-400",
  failed: "bg-red-600/20 text-red-400",
};

export default function Events() {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("7d");

  const types = Object.keys(typeColors) as (keyof typeof typeColors)[];
  const statuses = ["success", "pending", "failed"];

  const filtered = events.filter(event =>
    (searchTerm === "" || 
     event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === null || event.type === typeFilter) &&
    (statusFilter === null || event.status === statusFilter)
  );

  const stats = {
    total: events.length,
    success: events.filter(e => e.status === "success").length,
    pending: events.filter(e => e.status === "pending").length,
    failed: events.filter(e => e.status === "failed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
            <p className="text-slate-400">Track system and team activities</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Total Events</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Successful</div>
            <div className="text-3xl font-bold text-green-400">{stats.success}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-400">{stats.failed}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
              <select
                value={typeFilter || ""}
                onChange={(e) => setTypeFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{typeColors[type].label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="space-y-4">
          {filtered.map((event, index) => {
            const typeConfig = typeColors[event.type];
            const statusConfig = statusColors[event.status];

            return (
              <div
                key={event.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${typeConfig.bg}`}>
                    <Activity className={`w-5 h-5 ${typeConfig.text}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{event.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusConfig}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap mt-4 pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {event.timestamp}
                      </div>

                      {event.user && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <User className="w-4 h-4" />
                          {event.user}
                        </div>
                      )}

                      {event.resource && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <GitCommit className="w-4 h-4" />
                          {event.resource}
                        </div>
                      )}

                      <span className={`text-xs px-2 py-1 rounded ${typeConfig.bg} ${typeConfig.text}`}>
                        {typeConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
