import React, { useState } from "react";
import { 
  Key, 
  Copy, 
  Check,
  Trash2,
  Plus,
  Clock,
  Shield,
  AlertCircle
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  lastUsed: string;
  created: string;
  permissions: string[];
  status: "active" | "inactive" | "revoked";
}

const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_prod_****_placeholder_key****",
    lastUsed: "2 minutes ago",
    created: "2024-01-15",
    permissions: ["agents:read", "agents:write", "deployments:read", "deployments:write"],
    status: "active",
  },
  {
    id: "2",
    name: "Staging API Key",
    key: "sk_staging_stage_****_placeholder_key****",
    lastUsed: "1 hour ago",
    created: "2024-02-20",
    permissions: ["agents:read", "agents:write", "deployments:read"],
    status: "active",
  },
  {
    id: "3",
    name: "Development Key",
    key: "sk_dev_develop_****_placeholder_key****",
    lastUsed: "5 days ago",
    created: "2024-03-10",
    permissions: ["agents:read"],
    status: "inactive",
  },
  {
    id: "4",
    name: "Old Staging Key",
    key: "sk_old_archive_****_placeholder_key****",
    lastUsed: "30 days ago",
    created: "2024-01-01",
    permissions: ["agents:read", "deployments:read"],
    status: "revoked",
  },
];

const allPermissions = [
  { id: "agents:read", name: "Read Agents" },
  { id: "agents:write", name: "Create/Edit Agents" },
  { id: "deployments:read", name: "Read Deployments" },
  { id: "deployments:write", name: "Create/Edit Deployments" },
  { id: "logs:read", name: "Read Logs" },
  { id: "templates:read", name: "Read Templates" },
  { id: "team:read", name: "Read Team" },
  { id: "team:write", name: "Manage Team" },
];

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreateKey = () => {
    if (newKeyName && newKeyPermissions.length > 0) {
      const newKey: ApiKey = {
        id: String(apiKeys.length + 1),
        name: newKeyName,
        key: `sk_live_${Math.random().toString(36).substring(2, 34)}`,
        lastUsed: "Never",
        created: new Date().toISOString().split("T")[0],
        permissions: newKeyPermissions,
        status: "active",
      };
      setApiKeys([...apiKeys, newKey]);
      setShowCreateForm(false);
      setNewKeyName("");
      setNewKeyPermissions([]);
    }
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    if (selectedKey?.id === id) setSelectedKey(null);
  };

  const handlePermissionToggle = (permission: string) => {
    setNewKeyPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const statusColors = {
    active: "bg-green-600/20 text-green-400 border-green-600/50",
    inactive: "bg-slate-600/20 text-slate-400 border-slate-600/50",
    revoked: "bg-red-600/20 text-red-400 border-red-600/50",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
            <p className="text-slate-400">Manage API keys for integrations and automation</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Key
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Create New API Key</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                placeholder="e.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Permissions
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allPermissions.map(perm => (
                  <button
                    key={perm.id}
                    onClick={() => handlePermissionToggle(perm.id)}
                    className={`p-3 rounded-lg border-2 transition text-left ${
                      newKeyPermissions.includes(perm.id)
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newKeyPermissions.includes(perm.id)}
                        onChange={() => {}}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-white font-medium">{perm.name}</span>
                    </div>
                  </button>
                ))}
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
                onClick={handleCreateKey}
                disabled={!newKeyName || newKeyPermissions.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 transition font-medium"
              >
                Create Key
              </button>
            </div>
          </div>
        )}

        {/* API Keys Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Key</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Last Used</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(key => (
                  <tr key={key.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{key.name}</div>
                      <div className="text-sm text-slate-400">{key.created}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded">
                          {key.key.substring(0, 20)}...
                        </code>
                        <button
                          onClick={() => handleCopy(key.key, key.id)}
                          className="p-1 hover:bg-slate-600 rounded transition"
                        >
                          {copied === key.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[key.status]}`}>
                        {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{key.lastUsed}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedKey(key)}
                          className="p-2 hover:bg-slate-600 rounded transition text-slate-400"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteKey(key.id)}
                          className="p-2 hover:bg-red-600/20 rounded transition text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Detail Modal */}
        {selectedKey && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedKey.name}</h2>
                  <p className="text-slate-400">Created on {selectedKey.created}</p>
                </div>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full API Key</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={selectedKey.key}
                      readOnly
                      className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-mono text-sm"
                    />
                    <button
                      onClick={() => handleCopy(selectedKey.key, "detail")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      {copied === "detail" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedKey.permissions.map(perm => (
                      <div key={perm} className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{allPermissions.find(p => p.id === perm)?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    Keep your API key secure. Never commit it to version control or share it publicly.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedKey(null)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition font-medium"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 hover:bg-red-600/30 transition font-medium">
                  Revoke Key
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
