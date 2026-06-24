import { useState } from "react";
import { Plus, Copy, Star, Download, Trash2, Eye, Edit } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  uses: number;
  rating: number;
  model: string;
  author: string;
  isStarred: boolean;
  previewCode: string;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Email Assistant",
    description: "Automatically classify and respond to emails with intelligent summaries",
    category: "Communication",
    uses: 2451,
    rating: 4.8,
    model: "Claude 3.5 Sonnet",
    author: "Bixbott Team",
    isStarred: true,
    previewCode: `const emailAgent = new Agent({
  name: "Email Assistant",
  tasks: ["classify", "summarize", "respond"]
});`
  },
  {
    id: "2",
    name: "Data Pipeline",
    description: "ETL pipeline for processing and analyzing structured data",
    category: "Data Processing",
    uses: 1823,
    rating: 4.6,
    model: "GPT-4 Turbo",
    author: "Data Team",
    isStarred: false,
    previewCode: `const pipeline = new DataPipeline({
  source: "database",
  transforms: [parse, validate, enrich],
  target: "warehouse"
});`
  },
  {
    id: "3",
    name: "Monitoring Alert",
    description: "Real-time system monitoring with intelligent alert routing",
    category: "Monitoring",
    uses: 3456,
    rating: 4.9,
    model: "Claude 3 Opus",
    author: "DevOps Team",
    isStarred: true,
    previewCode: `const monitor = new Monitor({
  metrics: ["cpu", "memory", "disk"],
  alertRules: [
    { metric: "cpu", threshold: 80, action: "notify" }
  ]
});`
  },
  {
    id: "4",
    name: "Report Generator",
    description: "Generate comprehensive reports from various data sources",
    category: "Reporting",
    uses: 892,
    rating: 4.5,
    model: "Gemini Pro",
    author: "Analytics Team",
    isStarred: false,
    previewCode: `const reporter = new ReportGenerator({
  format: "pdf",
  schedule: "daily",
  recipients: ["team@company.com"]
});`
  },
  {
    id: "5",
    name: "Code Reviewer",
    description: "Analyze pull requests and provide intelligent code review comments",
    category: "Development",
    uses: 1234,
    rating: 4.7,
    model: "Claude 3.5 Sonnet",
    author: "Engineering Team",
    isStarred: true,
    previewCode: `const reviewer = new CodeReviewer({
  checks: ["style", "security", "performance"],
  autoComment: true
});`
  },
  {
    id: "6",
    name: "Inventory Manager",
    description: "Smart inventory tracking with predictive restocking",
    category: "Business",
    uses: 567,
    rating: 4.4,
    model: "GPT-4",
    author: "Operations Team",
    isStarred: false,
    previewCode: `const inventory = new InventoryManager({
  tracking: "real-time",
  prediction: "demand-forecasting"
});`
  }
];

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(templates.map(t => t.category))];
  
  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStar = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, isStarred: !t.isStarred } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Agent Templates</h1>
              <p className="text-slate-400 mt-1">Pre-built templates for common agent patterns</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
              />
            </div>

            {/* Categories */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded capitalize transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Templates</span>
                  <span className="font-bold">{templates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Starred</span>
                  <span className="font-bold">{templates.filter(t => t.isStarred).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Avg Rating</span>
                  <span className="font-bold">{(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No templates found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white group-hover:text-blue-400 transition">{template.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{template.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(template.id);
                        }}
                        className="p-1.5 hover:bg-slate-700/50 rounded transition"
                      >
                        <Star className={`w-5 h-5 ${template.isStarred ? "fill-yellow-400 text-yellow-400" : "text-slate-400"}`} />
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 mb-4 line-clamp-2">{template.description}</p>

                    <div className="mb-4 p-3 bg-slate-900/50 border border-slate-700/30 rounded font-mono text-xs text-slate-300 overflow-hidden">
                      <div className="line-clamp-3">{template.previewCode}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div>
                        <p className="text-slate-500">Model</p>
                        <p className="text-slate-300 font-medium">{template.model}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Uses</p>
                        <p className="text-slate-300 font-medium">{template.uses.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{template.rating}</span>
                        <span className="text-xs text-slate-500">({template.author})</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-slate-700/50 rounded transition">
                          <Copy className="w-4 h-4 text-slate-400 hover:text-blue-400" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-700/50 rounded transition">
                          <Download className="w-4 h-4 text-slate-400 hover:text-emerald-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <div
              className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
                    <p className="text-slate-400 mt-1">{selectedTemplate.category}</p>
                  </div>
                  <button onClick={() => setSelectedTemplate(null)} className="text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>

                <p className="text-slate-300 mb-6">{selectedTemplate.description}</p>

                <div className="mb-6">
                  <h3 className="font-bold text-white mb-3">Preview Code</h3>
                  <pre className="bg-slate-900 p-4 rounded border border-slate-700 text-sm text-slate-300 overflow-x-auto">
                    {selectedTemplate.previewCode}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-slate-500">Model</p>
                    <p className="text-white font-medium">{selectedTemplate.model}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Author</p>
                    <p className="text-white font-medium">{selectedTemplate.author}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Uses</p>
                    <p className="text-white font-medium">{selectedTemplate.uses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Rating</p>
                    <p className="text-white font-medium">⭐ {selectedTemplate.rating}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                    <Copy className="w-4 h-4" />
                    Use Template
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
