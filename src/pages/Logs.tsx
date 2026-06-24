import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Filter,
  Search,
  ChevronDown,
  Info,
  AlertCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-06-24 14:32:15",
    level: "info",
    source: "agent-01",
    message: "Agent deployed successfully",
    details: '{"version": "1.0.5", "environment": "production"}',
  },
  {
    id: "2",
    timestamp: "2024-06-24 14:28:42",
    level: "warning",
    source: "system",
    message: "High memory usage detected",
    details: '{"usage": "85%", "threshold": "80%"}',
  },
  {
    id: "3",
    timestamp: "2024-06-24 14:25:08",
    level: "error",
    source: "api-gateway",
    message: "Failed to connect to external service",
    details: '{"service": "stripe", "status": 503, "retries": 3}',
  },
  {
    id: "4",
    timestamp: "2024-06-24 14:20:33",
    level: "info",
    source: "scheduler",
    message: "Scheduled task executed",
    details: '{"task": "cleanup", "duration": "2.3s", "status": "success"}',
  },
  {
    id: "5",
    timestamp: "2024-06-24 14:15:21",
    level: "debug",
    source: "database",
    message: "Query executed",
    details: '{"query": "SELECT * FROM agents", "rows": 42, "duration": "125ms"}',
  },
  {
    id: "6",
    timestamp: "2024-06-24 14:10:44",
    level: "warning",
    source: "deployment",
    message: "Deployment taking longer than expected",
    details: '{"deployment_id": "deploy-789", "elapsed": "5m", "estimated": "3m"}',
  },
  {
    id: "7",
    timestamp: "2024-06-24 14:05:12",
    level: "info",
    source: "auth",
    message: "User logged in",
    details: '{"user_id": "user-456", "ip": "192.168.1.1"}',
  },
  {
    id: "8",
    timestamp: "2024-06-24 13:58:37",
    level: "error",
    source: "webhook",
    message: "Webhook delivery failed",
    details: '{"webhook_id": "hook-123", "attempts": 5, "reason": "timeout"}',
  },
];

const levelIcons = {
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-600/20" },
  warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-600/20" },
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-600/20" },
  debug: { icon: FileText, color: "text-slate-400", bg: "bg-slate-600/20" },
};

export default function Logs() {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("1h");

  const sources = Array.from(new Set(logs.map(l => l.source)));
  const levels = ["info", "warning", "error", "debug"];

  const filtered = logs.filter(log =>
    (searchTerm === "" || log.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (levelFilter === null || log.level === levelFilter) &&
    (sourceFilter === null || log.source === sourceFilter)
  );

  const stats = {
    total: logs.length,
    errors: logs.filter(l => l.level === "error").length,
    warnings: logs.filter(l => l.level === "warning").length,
    info: logs.filter(l => l.level === "info").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Logs</h1>
            <p className="text-slate-400">View and analyze system logs</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Total Logs</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Errors</div>
            <div className="text-3xl font-bold text-red-400">{stats.errors}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Warnings</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.warnings}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Info</div>
            <div className="text-3xl font-bold text-blue-400">{stats.info}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Level</label>
              <select
                value={levelFilter || ""}
                onChange={(e) => setLevelFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Source</label>
              <select
                value={sourceFilter || ""}
                onChange={(e) => setSourceFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-2">
          {filtered.map(log => {
            const levelConfig = levelIcons[log.level];
            const LevelIcon = levelConfig.icon;
            const isExpanded = expandedLogId === log.id;

            return (
              <div key={log.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                  className="w-full p-4 hover:bg-slate-700/50 transition text-left flex items-start gap-4"
                >
                  <div className={`p-2 rounded ${levelConfig.bg}`}>
                    <LevelIcon className={`w-5 h-5 ${levelConfig.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-slate-300 font-mono text-sm">{log.timestamp}</span>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {log.source}
                      </span>
                    </div>
                    <p className="text-white font-medium truncate">{log.message}</p>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && log.details && (
                  <div className="px-4 py-4 bg-slate-900 border-t border-slate-700">
                    <div className="text-sm text-slate-300 mb-2 font-medium">Details:</div>
                    <pre className="bg-slate-950 rounded-lg p-3 text-slate-400 font-mono text-xs overflow-x-auto">
                      {JSON.stringify(JSON.parse(log.details), null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
