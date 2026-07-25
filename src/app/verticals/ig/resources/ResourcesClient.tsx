'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BookOpen, FileText, Search, ChevronRight, Clock, Copy, Check, Sparkles, User, Layers } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  type: string;
  tags: string[];
  content: string;
  author: string;
  readTime?: string;
  wordCount?: number;
}

interface ResourcesClientProps {
  initialResources: Resource[];
}

export default function ResourcesClient({ initialResources }: ResourcesClientProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    initialResources.length > 0 ? initialResources[0] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<'list' | 'reader'>('list');

  const categories = ['ALL', 'NLP', 'CV', 'RL'];

  const filteredResources = initialResources.filter((r) => {
    const matchesCategory = activeCategory === 'ALL' || r.type === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = () => {
    if (!selectedResource) return;
    navigator.clipboard.writeText(selectedResource.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadgeClass = (type: string) => {
    switch (type) {
      case 'NLP':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'CV':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      case 'RL':
        return 'bg-pink-950/80 text-pink-300 border-pink-500/40';
      default:
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e0826]/70 border border-purple-500/20 p-4 rounded-2xl backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search research papers, algorithms, tags..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#070314] border border-purple-500/30 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {cat === 'ALL' ? 'ALL PAPERS' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="flex md:hidden bg-[#0e0826] border border-purple-500/30 rounded-xl p-1">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2 text-xs font-mono font-medium rounded-lg transition-all ${
            mobileTab === 'list'
              ? 'bg-purple-900/70 text-white border border-purple-400'
              : 'text-gray-400'
          }`}
        >
          Documents ({filteredResources.length})
        </button>
        <button
          onClick={() => setMobileTab('reader')}
          className={`flex-1 py-2 text-xs font-mono font-medium rounded-lg transition-all ${
            mobileTab === 'reader'
              ? 'bg-purple-900/70 text-white border border-purple-400'
              : 'text-gray-400'
          }`}
        >
          Reader View
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar list of articles */}
        <div
          className={`lg:col-span-4 space-y-3 ${
            mobileTab === 'reader' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between px-2 mb-1">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> INDEXED PAPERS ({filteredResources.length})
            </h3>
          </div>

          {filteredResources.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-gray-500 bg-[#0e0826]/50 rounded-2xl border border-white/10">
              No matching research articles found.
            </div>
          ) : (
            filteredResources.map((res) => {
              const isSelected = selectedResource?.id === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedResource(res);
                    setMobileTab('reader');
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3 group overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-950/90 via-[#130b38] to-cyan-950/50 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.3)] scale-[1.01]'
                      : 'bg-[#0e0826]/70 border-white/10 text-gray-300 hover:border-purple-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(
                          res.type
                        )}`}
                      >
                        {res.type}
                      </span>
                      {res.readTime && (
                        <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-cyan-400" /> {res.readTime}
                        </span>
                      )}
                    </div>

                    <h4 className="font-semibold text-sm leading-snug font-orbitron group-hover:text-purple-300 transition-colors break-words">
                      {res.title}
                    </h4>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Article Reader Pane */}
        <div
          className={`lg:col-span-8 ${
            mobileTab === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          {selectedResource ? (
            <div className="bg-[#0e0826]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] min-w-0 overflow-hidden">
              {/* Header Bar */}
              <div className="pb-6 mb-8 border-b border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-mono uppercase px-3 py-1 rounded-full border ${getCategoryBadgeClass(
                        selectedResource.type
                      )}`}
                    >
                      {selectedResource.type} WING
                    </span>
                    {selectedResource.readTime && (
                      <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {selectedResource.readTime}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/40 hover:border-cyan-400 hover:text-cyan-300 px-3.5 py-1.5 rounded-xl transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white leading-snug break-words">
                  {selectedResource.title}
                </h2>

                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" /> {selectedResource.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" /> {selectedResource.wordCount || 0} words
                  </span>
                </div>
              </div>

              {/* Rendered Markdown Body */}
              <div className="prose prose-invert max-w-none prose-purple break-words overflow-hidden text-gray-300 text-sm sm:text-base leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl font-bold font-orbitron text-white mt-8 mb-4 border-b border-purple-500/30 pb-2 break-words">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl font-bold font-orbitron text-white mt-8 mb-4 border-b border-white/10 pb-2 break-words">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-bold font-orbitron text-purple-300 mt-6 mb-3 break-words">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-4 break-words">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 pl-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300 pl-2">
                        {children}
                      </ol>
                    ),
                    code: ({ node, className, children, ...props }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code
                            className="font-mono text-cyan-300 bg-purple-950/70 border border-purple-500/30 px-1.5 py-0.5 rounded text-xs break-words"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="my-6 rounded-2xl border border-purple-500/30 bg-[#070314] p-4 font-mono text-xs text-cyan-300 overflow-x-auto scrollbar-thin shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 border border-purple-500/30 rounded-xl bg-[#070314]/60">
                        <table className="w-full text-left text-xs font-mono border-collapse">
                          {children}
                        </table>
                      </div>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-cyan-400 bg-purple-950/30 p-4 rounded-r-xl my-4 italic text-purple-200 font-mono text-xs">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {selectedResource.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center p-8 bg-[#0e0826]/50 rounded-3xl border border-white/10 text-center">
              <FileText className="w-12 h-12 text-gray-500 mb-3" />
              <p className="font-mono text-gray-400">Select a document from the index to view its contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
