import React, { useState } from "react";
import { 
  Save, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  Shield,
  Eye,
  EyeOff,
  Copy,
  Check
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    appName: "Bixbott Dashboard",
    description: "Advanced AI agent orchestration platform",
    timezone: "UTC-0",
    language: "English",
    theme: "dark",
    emailNotifications: true,
    slackNotifications: false,
    alertsOnError: true,
    dailyDigest: true,
    weeklyReport: false,
  });

  const [copied, setCopied] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const apiKey = "sk_live_****_placeholder_key****";

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your workspace and system preferences</p>
        </div>

        {/* General Settings */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">General</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Application Name
              </label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => handleSettingChange("appName", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={settings.description}
                onChange={(e) => handleSettingChange("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange("timezone", e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option>UTC-0</option>
                  <option>UTC+1</option>
                  <option>UTC+2</option>
                  <option>UTC-5</option>
                  <option>UTC-8</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange("language", e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">
              Theme
            </label>
            <div className="flex gap-4">
              {[
                { value: "dark", label: "Dark", color: "from-slate-900 to-slate-800" },
                { value: "light", label: "Light", color: "from-slate-100 to-slate-200" },
                { value: "auto", label: "Auto", color: "from-slate-700 to-slate-900" },
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleSettingChange("theme", theme.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    settings.theme === theme.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className={`w-8 h-8 rounded bg-gradient-to-br ${theme.color} mb-2 mx-auto`} />
                  <span className="text-sm font-medium text-slate-300">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "slackNotifications", label: "Slack Integration", desc: "Send notifications to Slack" },
              { key: "alertsOnError", label: "Alerts on Error", desc: "Get notified of system errors" },
              { key: "dailyDigest", label: "Daily Digest", desc: "Receive daily summary at 9 AM" },
              { key: "weeklyReport", label: "Weekly Report", desc: "Get comprehensive weekly report" },
            ].map((notif) => (
              <div key={notif.key} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <div className="font-medium text-white">{notif.label}</div>
                  <div className="text-sm text-slate-400">{notif.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings[notif.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(notif.key, e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                API Key
              </label>
              <div className="flex gap-2">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:border-slate-500 transition text-slate-400"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleCopy(apiKey, "api-key")}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:border-slate-500 transition text-slate-400"
                >
                  {copied === "api-key" ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 hover:bg-red-600/30 transition font-medium">
              Regenerate API Key
            </button>

            <button className="w-full px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition font-medium">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
              saveStatus === "saved"
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Save className="w-5 h-5" />
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
