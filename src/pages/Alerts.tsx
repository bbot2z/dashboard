import React, { useState } from "react";
import { 
  Bell, 
  Plus, 
  Edit2, 
  Trash2,
  Power,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface Alert {
  id: string;
  name: string;
  condition: string;
  threshold: string;
  severity: "low" | "medium" | "high" | "critical";
  enabled: boolean;
  channels: string[];
  lastTriggered: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    name: "High CPU Usage",
    condition: "CPU > 80%",
    threshold: "80%",
    severity: "high",
    enabled: true,
    channels: ["email", "slack"],
    lastTriggered: "2 hours ago",
  },
  {
    id: "2",
    name: "High Memory Usage",
    condition: "Memory > 85%",
    threshold: "85%",
    severity: "high",
    enabled: true,
    channels: ["slack"],
    lastTriggered: "4 hours ago",
  },
  {
    id: "3",
    name: "Error Rate High",
    condition: "Error rate > 5%",
    threshold: "5%",
    severity: "critical",
    enabled: true,
    channels: ["email", "slack", "pagerduty"],
    lastTriggered: "10 minutes ago",
  },
  {
    id: "4",
    name: "Response Time Slow",
    condition: "Response time > 2000ms",
    threshold: "2000ms",
    severity: "medium",
    enabled: false,
    channels: ["email"],
    lastTriggered: "Never",
  },
  {
    id: "5",
    name: "Deployment Failed",
    condition: "Deployment status = failed",
    threshold: "Any",
    severity: "critical",
    enabled: true,
    channels: ["email", "slack"],
    lastTriggered: "3 days ago",
  },
];

const severityColors = {
  low: { bg: "bg-blue-600/20", text: "text-blue-400", border: "border-blue-600/50" },
  medium: { bg: "bg-yellow-600/20", text: "text-yellow-400", border: "border-yellow-600/50" },
  high: { bg: "bg-orange-600/20", text: "text-orange-400", border: "border-orange-600/50" },
  critical: { bg: "bg-red-600/20", text: "text-red-400", border: "border-red-600/50" },
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [newAlert, setNewAlert] = useState({
    name: "",
    condition: "",
    threshold: "",
    severity: "medium" as const,
    channels: [] as string[],
  });

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
  };

  const handleCreateAlert = () => {
    if (newAlert.name && newAlert.condition && newAlert.channels.length > 0) {
      const alert: Alert = {
        id: String(alerts.length + 1),
        name: newAlert.name,
        condition: newAlert.condition,
        threshold: newAlert.threshold,
        severity: newAlert.severity,
        enabled: true,
        channels: newAlert.channels,
        lastTriggered: "Never",
      };
      setAlerts([...alerts, alert]);
      setShowCreateForm(false);
      setNewAlert({
        name: "",
        condition: "",
        threshold: "",
        severity: "medium",
        channels: [],
      });
    }
  };

  const handleChannelToggle = (channel: string) => {
    setNewAlert(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const enabledCount = alerts.filter(a => a.enabled).length;
  const criticalCount = alerts.filter(a => a.severity === "critical" && a.enabled).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Alerts</h1>
            <p className="text-slate-400">Configure and manage system alerts</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Alert
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Active Alerts</div>
            <div className="text-3xl font-bold text-white">{enabledCount}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Critical</div>
            <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Total</div>
            <div className="text-3xl font-bold text-white">{alerts.length}</div>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Alert</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Alert Name</label>
                <input
                  type="text"
                  placeholder="e.g., High CPU Usage"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Condition</label>
                  <input
                    type="text"
                    placeholder="e.g., CPU > 80%"
                    value={newAlert.condition}
                    onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Severity</label>
                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as any })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Notification Channels</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["email", "slack", "pagerduty", "webhook"].map(channel => (
                    <button
                      key={channel}
                      onClick={() => handleChannelToggle(channel)}
                      className={`p-3 rounded-lg border-2 transition text-center font-medium ${
                        newAlert.channels.includes(channel)
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                disabled={!newAlert.name || !newAlert.condition || newAlert.channels.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 transition font-medium"
              >
                Create Alert
              </button>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map(alert => {
            const severityConfig = severityColors[alert.severity];

            return (
              <div
                key={alert.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{alert.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityConfig.bg} ${severityConfig.text} ${severityConfig.border}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-400 mb-3">{alert.condition}</p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">Last triggered: {alert.lastTriggered}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {alert.channels.map(ch => (
                          <span key={ch} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleAlert(alert.id)}
                      className={`p-2 rounded transition ${
                        alert.enabled
                          ? "bg-green-600/20 text-green-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      <Power className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="p-2 hover:bg-slate-700 rounded transition text-slate-400"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-2 hover:bg-red-600/20 rounded transition text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
