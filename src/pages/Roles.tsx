import { useState } from "react";
import { Plus, Edit, Trash2, Users, Shield, MoreVertical } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
  isDefault: boolean;
  createdDate: string;
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access and management capabilities",
    memberCount: 1,
    permissions: [
      "manage_users",
      "manage_agents",
      "manage_deployments",
      "view_analytics",
      "manage_settings",
      "view_logs",
      "manage_roles",
      "manage_api_keys"
    ],
    isDefault: false,
    createdDate: "Jan 1, 2024"
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage agents and team members",
    memberCount: 3,
    permissions: [
      "manage_agents",
      "manage_deployments",
      "view_analytics",
      "view_logs",
      "manage_api_keys"
    ],
    isDefault: false,
    createdDate: "Jan 15, 2024"
  },
  {
    id: "3",
    name: "Developer",
    description: "Can create and deploy agents",
    memberCount: 8,
    permissions: [
      "manage_agents",
      "manage_deployments",
      "view_analytics",
      "view_logs",
      "create_api_keys"
    ],
    isDefault: false,
    createdDate: "Jan 20, 2024"
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to dashboard and analytics",
    memberCount: 5,
    permissions: [
      "view_analytics",
      "view_logs",
      "view_agents"
    ],
    isDefault: true,
    createdDate: "Jan 1, 2024"
  }
];

const allPermissions = [
  { id: "manage_users", label: "Manage Users", category: "Users" },
  { id: "manage_roles", label: "Manage Roles", category: "Users" },
  { id: "manage_agents", label: "Manage Agents", category: "Agents" },
  { id: "view_agents", label: "View Agents", category: "Agents" },
  { id: "manage_deployments", label: "Manage Deployments", category: "Deployments" },
  { id: "view_analytics", label: "View Analytics", category: "Analytics" },
  { id: "manage_settings", label: "Manage Settings", category: "Settings" },
  { id: "view_logs", label: "View Logs", category: "Logs" },
  { id: "manage_api_keys", label: "Manage API Keys", category: "Security" },
  { id: "create_api_keys", label: "Create API Keys", category: "Security" }
];

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);

  const permissionCategories = Array.from(new Set(allPermissions.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Roles & Permissions</h1>
              <p className="text-slate-400 mt-1">Configure role-based access control</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              New Role
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="lg:col-span-1 space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-lg border cursor-pointer transition ${
                  selectedRole?.id === role.id
                    ? "bg-slate-700 border-blue-500"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{role.name}</h3>
                  {role.isDefault && (
                    <span className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300">Default</span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mb-2 line-clamp-1">{role.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users className="w-3 h-3" />
                  {role.memberCount} member{role.memberCount !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>

          {/* Role Details */}
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedRole.name}</h2>
                    <p className="text-slate-400 mt-1">{selectedRole.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                      <Edit className="w-5 h-5 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Role Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/50 rounded p-4 border border-slate-700/30">
                    <p className="text-sm text-slate-500">Members</p>
                    <p className="text-2xl font-bold mt-1">{selectedRole.memberCount}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4 border border-slate-700/30">
                    <p className="text-sm text-slate-500">Permissions</p>
                    <p className="text-2xl font-bold mt-1">{selectedRole.permissions.length}</p>
                  </div>
                </div>

                {/* Permissions by Category */}
                <div className="space-y-6">
                  <h3 className="font-bold text-white text-lg">Permissions</h3>
                  {permissionCategories.map((category) => {
                    const categoryPerms = allPermissions.filter(p => p.category === category);
                    return (
                      <div key={category}>
                        <h4 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wide">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {categoryPerms.map((perm) => {
                            const hasPermission = selectedRole.permissions.includes(perm.id);
                            return (
                              <div key={perm.id} className={`p-3 rounded border flex items-center gap-3 ${
                                hasPermission
                                  ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                                  : "bg-slate-700/30 border-slate-600/30 text-slate-500"
                              }`}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                  hasPermission
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-slate-600"
                                }`}>
                                  {hasPermission && <span className="text-white font-bold text-sm">✓</span>}
                                </div>
                                <span className="text-sm">{perm.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Members with this Role */}
                <div className="mt-8 pt-8 border-t border-slate-700/50">
                  <h3 className="font-bold text-white mb-4">Members with this role</h3>
                  <div className="space-y-2">
                    {["user1", "user2", "user3"].slice(0, selectedRole.memberCount).map((user, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/50 rounded border border-slate-700/30 flex items-center justify-between">
                        <span className="text-slate-300">{user}</span>
                        <button className="text-xs text-slate-500 hover:text-red-400 transition">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-12 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400">Select a role to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="mt-12 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Permission Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center py-3 px-4 text-slate-400">{role.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPermissions.map((perm) => (
                  <tr key={perm.id} className="border-b border-slate-700/30">
                    <td className="py-3 px-4 text-slate-300">{perm.label}</td>
                    {roles.map((role) => (
                      <td key={`${perm.id}-${role.id}`} className="text-center py-3 px-4">
                        {role.permissions.includes(perm.id) ? (
                          <div className="inline-flex w-6 h-6 rounded bg-emerald-500 items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="inline-flex w-6 h-6 rounded border border-slate-600" />
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
