import { useState } from "react";
import { Plus, Search, Edit, Trash2, Lock, Unlock, Mail, MoreVertical, Activity } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  createdDate: string;
  lastLogin: string;
  loginCount: number;
  twoFactorEnabled: boolean;
  apiKeysCount: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    username: "admin_user",
    email: "admin@company.com",
    status: "active",
    createdDate: "Jan 1, 2024",
    lastLogin: "Just now",
    loginCount: 2451,
    twoFactorEnabled: true,
    apiKeysCount: 3
  },
  {
    id: "2",
    username: "sarah_chen",
    email: "sarah@company.com",
    status: "active",
    createdDate: "Jan 15, 2024",
    lastLogin: "2 hours ago",
    loginCount: 1823,
    twoFactorEnabled: true,
    apiKeysCount: 1
  },
  {
    id: "3",
    username: "dev_user",
    email: "dev@company.com",
    status: "active",
    createdDate: "Feb 10, 2024",
    lastLogin: "5 mins ago",
    loginCount: 1234,
    twoFactorEnabled: false,
    apiKeysCount: 5
  },
  {
    id: "4",
    username: "test_user",
    email: "test@company.com",
    status: "inactive",
    createdDate: "Mar 5, 2024",
    lastLogin: "15 days ago",
    loginCount: 42,
    twoFactorEnabled: false,
    apiKeysCount: 0
  },
  {
    id: "5",
    username: "suspended_user",
    email: "suspended@company.com",
    status: "suspended",
    createdDate: "Feb 20, 2024",
    lastLogin: "30 days ago",
    loginCount: 156,
    twoFactorEnabled: false,
    apiKeysCount: 0
  }
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all");

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    inactive: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    suspended: "bg-red-500/20 text-red-300 border-red-500/30"
  };

  const toggleUserStatus = (id: string, newStatus: User["status"]) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Users</h1>
              <p className="text-slate-400 mt-1">Manage system users and access control</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              New User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length },
            { label: "Active", value: users.filter(u => u.status === "active").length },
            { label: "Inactive", value: users.filter(u => u.status === "inactive").length },
            { label: "2FA Enabled", value: users.filter(u => u.twoFactorEnabled).length }
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/50">
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold">User</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold hidden md:table-cell">Email</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-semibold">Status</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-semibold hidden lg:table-cell">2FA</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-semibold hidden lg:table-cell">Logins</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-semibold hidden lg:table-cell">API Keys</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/20 transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-white">{user.username}</p>
                        <p className="text-xs text-slate-500 md:hidden">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300 hidden md:table-cell">{user.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded border text-xs font-bold capitalize ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center hidden lg:table-cell">
                      {user.twoFactorEnabled ? (
                        <Lock className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <Unlock className="w-5 h-5 text-slate-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center hidden lg:table-cell text-slate-300">
                      {user.loginCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center hidden lg:table-cell text-slate-300">
                      {user.apiKeysCount}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 hover:bg-slate-700/50 rounded transition">
                          <Edit className="w-4 h-4 text-slate-400 hover:text-blue-400" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-700/50 rounded transition">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity Summary */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Logins */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
                  <div>
                    <p className="font-medium text-white">{user.username}</p>
                    <p className="text-xs text-slate-500">Last login: {user.lastLogin}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    user.status === "active" ? "bg-emerald-500" : "bg-slate-500"
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Security Overview */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Overview
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "2FA Adoption Rate",
                  value: `${Math.round((users.filter(u => u.twoFactorEnabled).length / users.length) * 100)}%`
                },
                {
                  label: "Average API Keys",
                  value: (users.reduce((sum, u) => sum + u.apiKeysCount, 0) / users.length).toFixed(1)
                },
                {
                  label: "Account Health",
                  value: "Good"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded border border-slate-600/30">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
