import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar, Download } from "lucide-react";

const analyticsData = [
  { time: "00:00", cpu: 32, memory: 45, requests: 120 },
  { time: "04:00", cpu: 28, memory: 42, requests: 98 },
  { time: "08:00", cpu: 54, memory: 68, requests: 245 },
  { time: "12:00", cpu: 72, memory: 85, requests: 412 },
  { time: "16:00", cpu: 68, memory: 78, requests: 380 },
  { time: "20:00", cpu: 45, memory: 55, requests: 210 },
  { time: "24:00", cpu: 35, memory: 48, requests: 145 }
];

const serviceDistribution = [
  { name: "API Gateway", value: 35, color: "#0ea5e9" },
  { name: "Database", value: 28, color: "#8b5cf6" },
  { name: "Cache Layer", value: 22, color: "#10b981" },
  { name: "Message Queue", value: 15, color: "#f59e0b" }
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics</h1>
              <p className="text-slate-400 mt-1">System performance metrics and trends</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Time Range Selector */}
        <div className="flex gap-3 mb-8">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                range === "24h"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="space-y-6">
          {/* CPU and Memory Trends */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-6">Resource Usage Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#8b5cf6" name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Requests Overview */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-6">Request Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="requests" fill="#10b981" name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Service Distribution and KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Load Distribution */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-6">Service Load Distribution</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Key Performance Indicators
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Avg Response Time", value: "124ms", trend: "-8%" },
                  { label: "Error Rate", value: "0.12%", trend: "-3%" },
                  { label: "Uptime", value: "99.98%", trend: "+0.02%" },
                  { label: "Throughput", value: "2.4K req/s", trend: "+12%" }
                ].map((kpi, idx) => (
                  <div key={idx} className="p-4 bg-slate-700/30 rounded border border-slate-600/30">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">{kpi.label}</p>
                      <span className={`text-xs font-bold ${
                        kpi.trend.startsWith("+") ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {kpi.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
