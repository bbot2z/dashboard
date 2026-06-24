import { useState, useMemo, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { CORE_MODULES, SERVICE_LAYERS, REPOSITORIES, BIXBOTT_DOCS_CHAPTERS } from "./data";
import { ServiceState, LogEntry, DocChapter } from "./types";
import { ServiceCard } from "./components/ServiceCard";
import { RepoCard } from "./components/RepoCard";
import { BixbottAgentChat } from "./components/BixbottAgentChat";
import { InteractivePlayground } from "./components/InteractivePlayground";
import { PulseRateMeter } from "./components/PulseRateMeter";
import { HealthGaugeSection } from "./components/HealthGaugeSection";
import { PRBlueprintWorkspace } from "./components/PRBlueprintWorkspace";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Monitoring from "./pages/Monitoring";
import Agents from "./pages/Agents";
import Templates from "./pages/Templates";
import Deployments from "./pages/Deployments";
import { 
  Bot, 
  Cpu, 
  Database,
  Terminal, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Github,
  Monitor,
  Heart,
  GitPullRequest,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Search,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Code,
  Copy,
  Check,
  Zap,
  Workflow,
  ShieldAlert,
  Info,
  Download,
  Command,
  Keyboard,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";


function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", icon: Activity, label: "Dashboard" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/monitoring", icon: AlertCircle, label: "Monitoring" },
    { path: "/agents", icon: Bot, label: "Agents" },
    { path: "/templates", icon: Code, label: "Templates" },
    { path: "/deployments", icon: GitPullRequest, label: "Deployments" },
    { path: "/tools", icon: Cpu, label: "Tools" },
    { path: "/repos", icon: Github, label: "Repos" },
    { path: "/chat", icon: Bot, label: "Chat" },
    { path: "/docs", icon: BookOpen, label: "Documentation" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700/50 z-40 transition-transform lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Bixbott</p>
              <p className="text-xs text-slate-400">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

function LandingPage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [coreModules, setCoreModules] = useState<ServiceState[]>(CORE_MODULES);
  const [serviceLayers, setServiceLayers] = useState<ServiceState[]>(SERVICE_LAYERS);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [systemLogs, setSystemLogs] = useState<LogEntry[]>([
    {
      id: "log-initial",
      timestamp: new Date().toLocaleTimeString(),
      service: "System",
      message: "Orchestrator online. Connected to dotcom-03 repo registry.",
      type: "success"
    }
  ]);
  const [activeTab, setActiveTab] = useState<"landing" | "tools" | "repos" | "chat" | "pr-blueprint">("landing");
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const commandSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoScrollEnabled && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [systemLogs, autoScrollEnabled]);

  const handleServiceStateChange = (key: string, nextStatus: "running" | "stopped" | "idle" | "error") => {
    const update = (items: ServiceState[]) => 
      items.map(item => {
        if (item.key === key) {
          let cpu = 0;
          let memory = 0;
          if (nextStatus === "running") {
            cpu = parseFloat((Math.random() * 9.2 + 0.5).toFixed(1));
            memory = Math.floor(Math.random() * 470 + 40);
          }
          return { ...item, status: nextStatus, cpu, memory };
        }
        return item;
      });

    setCoreModules(prev => update(prev));
    setServiceLayers(prev => update(prev));
  };

  const handleAddLog = (serviceName: string, text: string, type: "info" | "success" | "warn" | "error") => {
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      service: serviceName,
      message: text,
      type
    };
    
    setSystemLogs(prev => [...prev, newLog].slice(-50));

    const appendServiceLog = (items: ServiceState[]) =>
      items.map(item => {
        if (item.name === serviceName) {
          return {
            ...item,
            logs: [text, ...item.logs].slice(0, 20)
          };
        }
        return item;
      });

    setCoreModules(prev => appendServiceLog(prev));
    setServiceLayers(prev => appendServiceLog(prev));
  };

  const handleDownloadLogs = () => {
    if (systemLogs.length === 0) return;
    const logContent = systemLogs
      .map(log => `[${log.timestamp}] [${log.service.toUpperCase()}] [${log.type.toUpperCase()}] ${log.message}`)
      .join("\r\n");
    
    const blob = new Blob([logContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bixbott_diagnostic_logs_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const commands = useMemo(() => [
    { id: "goto-tools", label: "Tools", desc: "Manage microservices", action: () => { setActiveTab("tools"); setShowCommandPalette(false); } },
    { id: "goto-repos", label: "Repos", desc: "Manage build and repos", action: () => { setActiveTab("repos"); setShowCommandPalette(false); } },
    { id: "goto-chat", label: "Chat", desc: "AI Chatbot assistant", action: () => { setActiveTab("chat"); setShowCommandPalette(false); } },
    { id: "action-restart-all", label: "Restart All", desc: "Start all services", action: () => {
        const resetStatus = (items: ServiceState[]) => items.map(item => ({ ...item, status: "running" as const, cpu: parseFloat((Math.random() * 9.2 + 0.5).toFixed(1)), memory: Math.floor(Math.random() * 470 + 40) }));
        setCoreModules(resetStatus);
        setServiceLayers(resetStatus);
        setShowCommandPalette(false);
      }
    },
    { id: "action-download-logs", label: "Download Logs", desc: "Export system logs", action: () => {
        handleDownloadLogs();
        setShowCommandPalette(false);
      } 
    },
  ], [systemLogs]);

  const filteredCommands = useMemo(() => {
    if (!commandSearch.trim()) return commands;
    const query = commandSearch.toLowerCase();
    return commands.filter(
      cmd =>
        cmd.label.toLowerCase().includes(query) ||
        cmd.desc.toLowerCase().includes(query)
    );
  }, [commands, commandSearch]);

  useEffect(() => {
    if (showCommandPalette) {
      setCommandSearch("");
      const timer = setTimeout(() => {
        commandSearchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showCommandPalette]);

  useEffect(() => {
    const timer = setInterval(() => {
      const fluctuate = (items: ServiceState[]) =>
        items.map(item => {
          if (item.status === "running") {
            const change = (Math.random() * 2.0 - 1.0);
            const nextCpu = Math.max(0.2, Math.min(9.8, parseFloat((item.cpu + change).toFixed(1))));
            const memChange = Math.floor(Math.random() * 28 - 14);
            const nextMem = Math.max(15, Math.min(500, item.memory + memChange));
            return {
              ...item,
              cpu: nextCpu,
              memory: nextMem
            };
          }
          return item;
        });

      setCoreModules(prev => fluctuate(prev));
      setServiceLayers(prev => fluctuate(prev));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const repoStats = useMemo(() => {
    let stars = 0;
    let forks = 0;
    REPOSITORIES.forEach(r => {
      stars += r.stars;
      forks += r.forks;
    });
    return { stars, forks, total: REPOSITORIES.length };
  }, []);

  const handleAskAIAboutRepo = (repoName: string) => {
    const targetRepo = REPOSITORIES.find(r => r.name === repoName);
    if (!targetRepo) return;

    setChatPrompt(
      `Tôi muốn tìm hiểu kỹ lưỡng về kho lưu trữ: **dotcom-03/${targetRepo.name}**.\n\n` +
      `Hãy giải thích nhiệm vụ chính của dự án này, ngôn ngữ lập trình \`${targetRepo.mainLanguage}\` được tối ưu hóa như thế nào, và cách nó ăn khớp vào kiến trúc phân phối Bixbott (Web, App, Server).`
    );

    const chatElement = document.getElementById("bixbott-chat");
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }

      if (e.key === "Escape") {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Main Tab Navigation */}
      <div className="sticky top-0 z-30 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center overflow-x-auto gap-1">
            {[
              { id: "landing", icon: Sparkles, label: "Overview" },
              { id: "tools", icon: Cpu, label: "Tools" },
              { id: "repos", icon: Github, label: "Repos" },
              { id: "chat", icon: Bot, label: "Chat" },
              { id: "pr-blueprint", icon: GitPullRequest, label: "PR Blueprint" }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HealthGaugeSection coreModules={coreModules} serviceLayers={serviceLayers} />
              <PulseRateMeter coreModules={coreModules} serviceLayers={serviceLayers} />
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <h2 className="text-2xl font-bold mb-6">Core Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {coreModules.map(module => (
                    <ServiceCard
                      key={module.key}
                      service={module}
                      onStatusChange={handleServiceStateChange}
                      onAddLog={handleAddLog}
                    />
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-6">Service Layers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceLayers.map(layer => (
                    <ServiceCard
                      key={layer.key}
                      service={layer}
                      onStatusChange={handleServiceStateChange}
                      onAddLog={handleAddLog}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InteractivePlayground onAddLog={handleAddLog} />
            </motion.div>
          )}
          {activeTab === "repos" && (
            <motion.div key="repos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Repositories</h1>
                  <div className="flex gap-6 text-slate-400">
                    <div>📦 {repoStats.total} repositories</div>
                    <div>⭐ {repoStats.stars} stars</div>
                    <div>🔗 {repoStats.forks} forks</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {REPOSITORIES.map(repo => (
                    <RepoCard key={repo.name} repo={repo} onAskAI={() => handleAskAIAboutRepo(repo.name)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="bixbott-chat">
              <BixbottAgentChat initialPrompt={chatPrompt} />
            </motion.div>
          )}
          {activeTab === "pr-blueprint" && (
            <motion.div key="pr-blueprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PRBlueprintWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommandPalette(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                  <Command className="w-4 h-4 text-slate-400" />
                  <input
                    ref={commandSearchInputRef}
                    type="text"
                    placeholder="Search commands..."
                    value={commandSearch}
                    onChange={(e) => setCommandSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white placeholder-slate-500"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredCommands.map(cmd => (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition border-b border-slate-700/50 last:border-0"
                    >
                      <p className="font-medium text-white">{cmd.label}</p>
                      <p className="text-xs text-slate-400">{cmd.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-slate-900">
        <Sidebar />
        <div className="flex-1 overflow-auto lg:ml-64">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/*" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
