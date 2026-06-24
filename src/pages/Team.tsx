import { useState } from "react";
import { Plus, Mail, MoreVertical, Trash2, Shield, CheckCircle, AlertCircle, Users, Clock } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "developer" | "viewer";
  joinDate: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  avatar?: string;
}

const mockMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "admin",
    joinDate: "Jan 15, 2024",
    status: "active",
    lastActive: "Just now"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@company.com",
    role: "manager",
    joinDate: "Feb 3, 2024",
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@company.com",
    role: "developer",
    joinDate: "Mar 10, 2024",
    status: "active",
    lastActive: "30 mins ago"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@company.com",
    role: "developer",
    joinDate: "Mar 20, 2024",
    status: "pending",
    lastActive: "Never"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@company.com",
    role: "viewer",
    joinDate: "Apr 5, 2024",
    status: "inactive",
    lastActive: "5 days ago"
  }
];

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "manager" | "developer" | "viewer">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "pending">("all");

  const filteredMembers = members.filter(m => {
    const matchesRole = filterRole === "all" || m.role === filterRole;
    const matchesStatus = filterStatus === "all" || m.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const roleColors = {
    admin: "bg-red-500/20 text-red-300 border-red-500/30",
    manager: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    developer: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    viewer: "bg-slate-500/20 text-slate-300 border-slate-500/30"
  };

  const statusIcons = {
    active: CheckCircle,
    inactive: AlertCircle,
    pending: Clock
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Team Members</h1>
              <p className="text-slate-400 mt-1">Manage team access and permissions</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Members", value: members.length, icon: Users },
            { label: "Active", value: members.filter(m => m.status === "active").length, icon: CheckCircle },
            { label: "Pending", value: members.filter(m => m.status === "pending").length, icon: Clock },
            { label: "Admins", value: members.filter(m => m.role === "admin").length, icon: Shield }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 opacity-30" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-col sm:flex-row">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="viewer">Viewer</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.map((member) => {
            const StatusIcon = statusIcons[member.status];
            const statusColors = {
              active: "text-emerald-400",
              inactive: "text-slate-400",
              pending: "text-amber-400"
            };
            return (
              <div key={member.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-blue-300">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-slate-400">{member.email}</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className={`px-3 py-1 rounded border text-xs font-bold capitalize ${roleColors[member.role]}`}>
                        {member.role}
                      </span>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`w-4 h-4 ${statusColors[member.status]}`} />
                        <span className="text-xs text-slate-400 capitalize">{member.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition hidden md:block">
                      <Shield className="w-5 h-5 text-slate-400 hover:text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Mobile Details */}
                <div className="sm:hidden mt-4 pt-4 border-t border-slate-700/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded border capitalize ${roleColors[member.role]}`}>
                      {member.role}
                    </span>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={`w-3 h-3 ${statusColors[member.status]}`} />
                      <span className="text-slate-400 capitalize">{member.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Role Permissions Matrix */}
        <div className="mt-12 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Role Permissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400">Permission</th>
                  {["Admin", "Manager", "Developer", "Viewer"].map(role => (
                    <th key={role} className="text-center py-3 px-4 text-slate-400">{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { perm: "View Dashboard", perms: [true, true, true, true] },
                  { perm: "Manage Agents", perms: [true, true, true, false] },
                  { perm: "Manage Team", perms: [true, false, false, false] },
                  { perm: "View Analytics", perms: [true, true, true, true] },
                  { perm: "Deploy Agents", perms: [true, true, false, false] },
                  { perm: "View Logs", perms: [true, true, true, false] }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-700/30">
                    <td className="py-3 px-4 text-slate-300">{row.perm}</td>
                    {row.perms.map((allowed, i) => (
                      <td key={i} className="py-3 px-4 text-center">
                        {allowed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 rounded border border-slate-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
