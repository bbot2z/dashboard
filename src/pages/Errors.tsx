import React, { useState } from "react";
import { 
  XCircle, 
  AlertTriangle, 
  TrendingUp,
  Search,
  ChevronDown,
  Copy,
  Check,
  Code
} from "lucide-react";

interface ErrorEntry {
  id: string;
  errorType: string;
  message: string;
  count: number;
  lastOccurrence: string;
  severity: "low" | "medium" | "high";
  stackTrace?: string;
  affectedEndpoints: string[];
}

const mockErrors: ErrorEntry[] = [
  {
    id: "1",
    errorType: "TypeError",
    message: "Cannot read property 'name' of undefined",
    count: 247,
    lastOccurrence: "2 minutes ago",
    severity: "high",
    stackTrace: "at AgentManager.getAgent (agent.ts:45)\nat Router.handleRequest (router.ts:128)\nat App.request (app.ts:87)",
    affectedEndpoints: ["/api/agents", "/api/agents/:id"],
  },
  {
    id: "2",
    errorType: "ValidationError",
    message: "Missing required field: deploymentConfig",
    count: 156,
    lastOccurrence: "5 minutes ago",
    severity: "medium",
    affectedEndpoints: ["/api/deployments", "/api/deployments/create"],
  },
  {
    id: "3",
    errorType: "ConnectionError",
    message: "Unable to connect to database",
    count: 89,
    lastOccurrence: "1 hour ago",
    severity: "high",
    stackTrace: "at Database.connect (db.ts:23)\nat Application.initialize (app.ts:15)",
    affectedEndpoints: ["/api/data", "/api/logs"],
  },
  {
    id: "4",
    errorType: "TimeoutError",
    message: "Request timeout after 30000ms",
    count: 64,
    lastOccurrence: "3 hours ago",
    severity: "medium",
    affectedEndpoints: ["/api/external-service"],
  },
  {
    id: "5",
    errorType: "AuthenticationError",
    message: "Invalid API key provided",
    count: 42,
    lastOccurrence: "2 hours ago",
    severity: "high",
    affectedEndpoints: ["/api/*"],
  },
  {
    id: "6",
    errorType: "RateLimitError",
    message: "Rate limit exceeded",
    count: 128,
    lastOccurrence: "30 minutes ago",
    severity: "low",
    affectedEndpoints: ["/api/webhooks"],
  },
];

const severityColors = {
  low: { bg: "bg-blue-600/20", text: "text-blue-400", border: "border-blue-600/50" },
  medium: { bg: "bg-yellow-600/20", text: "text-yellow-400", border: "border-yellow-600/50" },
  high: { bg: "bg-red-600/20", text: "text-red-400", border: "border-red-600/50" },
};

export default function Errors() {
  const [errors, setErrors] = useState(mockErrors);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [expandedErrorId, setExpandedErrorId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("24h");

  const filtered = errors.filter(error =>
    (searchTerm === "" || 
     error.errorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     error.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (severityFilter === null || error.severity === severityFilter)
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const stats = {
    total: errors.reduce((acc, e) => acc + e.count, 0),
    critical: errors.filter(e => e.severity === "high").reduce((acc, e) => acc + e.count, 0),
    unique: errors.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Error Tracking</h1>
          <p className="text-slate-400">Monitor and analyze application errors</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Total Errors</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Critical</div>
            <div className="text-3xl font-bold text-red-400">{stats.critical}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Unique Errors</div>
            <div className="text-3xl font-bold text-blue-400">{stats.unique}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Severity</label>
              <select
                value={severityFilter || ""}
                onChange={(e) => setSeverityFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search errors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-3">
          {filtered.map(error => {
            const severityConfig = severityColors[error.severity];
            const isExpanded = expandedErrorId === error.id;

            return (
              <div
                key={error.id}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedErrorId(isExpanded ? null : error.id)}
                  className="w-full p-4 hover:bg-slate-700/50 transition text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded ${severityConfig.bg}`}>
                      <XCircle className={`w-5 h-5 ${severityConfig.text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="text-lg font-semibold text-white">{error.errorType}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityConfig.bg} ${severityConfig.text} ${severityConfig.border}`}>
                          {error.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-400 mb-2 truncate">{error.message}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{error.count} occurrences</span>
                        </div>
                        <span>Last: {error.lastOccurrence}</span>
                      </div>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 py-4 bg-slate-900 border-t border-slate-700 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Error Message</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={error.message}
                          readOnly
                          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 font-mono text-sm"
                        />
                        <button
                          onClick={() => handleCopy(error.message, `msg-${error.id}`)}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-slate-400"
                        >
                          {copied === `msg-${error.id}` ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {error.stackTrace && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Stack Trace
                        </label>
                        <pre className="bg-slate-950 rounded-lg p-3 text-slate-400 font-mono text-xs overflow-x-auto">
                          {error.stackTrace}
                        </pre>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Affected Endpoints</label>
                      <div className="flex flex-wrap gap-2">
                        {error.affectedEndpoints.map((endpoint, idx) => (
                          <span key={idx} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded font-mono">
                            {endpoint}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                        View Full Report
                      </button>
                      <button className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition font-medium">
                        Create Issue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No errors found</p>
          </div>
        )}
      </div>
    </div>
  );
}
