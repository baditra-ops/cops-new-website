'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Resource } from './page';

export default function ResourcesClient({ initialResources }: { initialResources: Resource[] }) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Resource | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialResources.forEach((res) => res.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [initialResources]);

  // Filter resources based on search and tags
  const filteredResources = useMemo(() => {
    return initialResources.filter((res) => {
      const matchesQuery = res.title.toLowerCase().includes(query.toLowerCase()) || 
                           res.content.toLowerCase().includes(query.toLowerCase());
      const matchesTags = activeTags.length === 0 || 
                          res.tags.some(tag => activeTags.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags, initialResources]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedDoc]);

  return (
    <>
      {/* ── Search & Filters ── */}
      <div className="mb-10 space-y-5 relative z-10">
        {/* Terminal Input */}
        <div className="relative flex items-center bg-[#03110a] border border-phosphor-green/40 p-4 font-jetbrains text-sm focus-within:border-phosphor-green focus-within:shadow-[0_0_15px_rgba(51,255,102,0.15)] transition-all group">
          {/* Box drawing corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-phosphor-green opacity-50 group-focus-within:opacity-100" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-phosphor-green opacity-50 group-focus-within:opacity-100" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-phosphor-green opacity-50 group-focus-within:opacity-100" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-phosphor-green opacity-50 group-focus-within:opacity-100" />

          <span className="text-phosphor-green/50 mr-2 select-none shrink-0">&gt; grep resources --query="</span>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-phosphor-green w-full placeholder-phosphor-green/20 min-w-[50px]"
            placeholder="..."
            spellCheck="false"
          />
          <span className="text-phosphor-green/50 ml-1 select-none shrink-0">"</span>
          <span className="animate-pulse text-phosphor-green select-none ml-2 shrink-0">█</span>
        </div>

        {/* CLI Flag Chips */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {allTags.map(tag => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`relative font-jetbrains text-xs px-3 py-1.5 transition-all group ${
                    isActive 
                      ? 'border border-phosphor-green bg-phosphor-green/20 text-phosphor-green shadow-[0_0_10px_rgba(51,255,102,0.2)]'
                      : 'border border-phosphor-green/30 text-phosphor-green/50 hover:border-phosphor-green/60 hover:text-phosphor-green/80 hover:bg-phosphor-green/[0.05]'
                  }`}
                >
                  {/* Box drawing corners */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-phosphor-green opacity-30 group-hover:opacity-100" />
                  <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-phosphor-green opacity-30 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-phosphor-green opacity-30 group-hover:opacity-100" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-phosphor-green opacity-30 group-hover:opacity-100" />
                  --tag={tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Resource List ── */}
      <div className="space-y-4 relative z-10">
        {filteredResources.map((res) => (
          <div 
            key={res.id}
            onClick={() => setSelectedDoc(res)}
            className="relative group cursor-pointer font-jetbrains border border-phosphor-green/45 bg-[#03110a] hover:bg-phosphor-green/10 hover:border-phosphor-green p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 shadow-[0_0_15px_rgba(51,255,102,0.03)] hover:shadow-[0_0_20px_rgba(51,255,102,0.15)]"
          >
            {/* Box drawing corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-phosphor-green opacity-50 group-hover:opacity-100" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-phosphor-green opacity-50 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-phosphor-green opacity-50 group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-phosphor-green opacity-50 group-hover:opacity-100" />

            <div className="flex items-center gap-4">
              <span className="text-phosphor-green font-bold opacity-80 shrink-0">[{res.type}]</span>
              <span className="text-white/80 group-hover:text-phosphor-green transition-colors text-base sm:text-lg tracking-wide">
                {res.title}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="uppercase">AUTHOR: {res.author}</span>
              <div className="flex gap-2">
                {res.tags.map(tag => (
                  <span key={tag} className="text-phosphor-green bg-phosphor-green/15 px-1.5 py-0.5">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="p-10 text-center font-jetbrains text-phosphor-green/40 border border-dashed border-phosphor-green/20">
            &gt; NO_RESULTS_FOUND
          </div>
        )}
      </div>

      {/* ── Modal (Markdown Viewer) ── */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 bg-bg-void/80 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#03110a] border border-phosphor-green shadow-[0_0_40px_rgba(51,255,102,0.25)] max-w-5xl w-full max-h-[calc(100vh-140px)] flex flex-col relative"
            >
              {/* Box drawing corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-phosphor-green" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-phosphor-green" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-phosphor-green" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-phosphor-green" />
              {/* Modal Header */}
              <div className="border-b border-phosphor-green/30 p-4 flex justify-between items-center bg-phosphor-green/[0.03]">
                <div className="font-jetbrains text-sm text-phosphor-green flex items-center gap-3">
                  <span className="opacity-50">cat</span>
                  <span className="font-bold">{selectedDoc.id}</span>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="font-vt323 text-2xl text-phosphor-green/70 hover:text-phosphor-green transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  [X]
                </button>
              </div>

              {/* Modal Body: Markdown rendered with github-markdown-css */}
              <div className="p-6 sm:p-8 overflow-y-auto bg-bg-void/50 custom-scrollbar">
                <div 
                  className="markdown-body" 
                  style={{ backgroundColor: 'transparent' }}
                >
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {selectedDoc.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
