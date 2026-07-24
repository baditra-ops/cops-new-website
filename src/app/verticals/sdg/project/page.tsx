'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import projectsData from "../../../../../public/sdgprojectsdata/sdgprojectsdata.json";
import StatusBadge from "../../../../components/sdg/StatusBadge";

// --- Scroll Animation: Parallax Scrolling Terminal Code Background ---
const ParallaxBackground = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none font-mono text-[10px] text-phosphor-green/5 opacity-[0.08] z-0 leading-tight">
      <motion.div style={{ y: y1 }} className="absolute top-10 left-10 w-48 whitespace-pre font-mono">
        {`SECTION .text\nglobal _start\n_start:\n  mov eax, 4\n  mov ebx, 1\n  mov ecx, msg\n  mov edx, len\n  int 0x80\n  mov eax, 1\n  xor ebx, ebx\n  int 0x80`}
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-80 right-20 w-64 whitespace-pre font-mono">
        {`curl -X POST https://api.copsiitbhu.co.in/sdg/deploy \\\n  -H "Authorization: Bearer $SDG_TOKEN" \\\n  -d '{"status":"OK","trigger":"scroll"}'`}
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-[80vh] left-12 w-56 whitespace-pre font-mono">
        {`[STDOUT] compiling web.go...\n[STDOUT] packaging build...\n[STDOUT] uploading artifacts...\n[STDOUT] docker run -d -p 80:80 cops/sdg-web:latest\n[STATUS] container started successfully.`}
      </motion.div>
      <motion.div style={{ y: y4 }} className="absolute top-[120vh] right-10 w-72 whitespace-pre font-mono">
        {`{ \n  "cops": "SDG",\n  "status": "online",\n  "system_integrity": 1.00,\n  "payloads": ["page.tsx", "layout.tsx", "projects.json"]\n}`}
      </motion.div>
    </div>
  );
};

// --- Scroll Animation: CLI HUD Progress Bar ---
const ScrollProgressHUD = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const percent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [roundedPercent, setRoundedPercent] = useState(0);

  useEffect(() => {
    return percent.onChange((latest) => {
      setRoundedPercent(Math.floor(latest));
    });
  }, [percent]);

  const totalBars = 20;
  const filledBars = Math.round((roundedPercent / 100) * totalBars);
  const barStr = '='.repeat(filledBars) + (filledBars < totalBars && filledBars > 0 ? '>' : '') + ' '.repeat(Math.max(0, totalBars - filledBars - 1));

  return (
    <div className="fixed bottom-6 right-6 z-40 font-jetbrains text-xs text-phosphor-green bg-[#03110a] border border-phosphor-green/30 p-3 shadow-[0_0_15px_rgba(51,255,102,0.1)] hidden md:block">
      <div>SYS_MONITOR: ACTIVE</div>
      <div>SCROLL_DEPTH: {roundedPercent}%</div>
      <div className="font-vt323 text-base mt-1">[{barStr}]</div>
    </div>
  );
};

// --- Terminal Verbose Text Streamer ---
const VerboseText = ({ text, delay, trigger }: { text: string; delay: number; trigger: boolean }) => {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (!trigger) {
      setDisplayed("");
      setIsTyping(false);
      return;
    }

    let i = 0;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15);
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      setIsTyping(false);
    };
  }, [text, delay, trigger]);

  return (
    <div className="font-vt323 text-lg md:text-xl text-phosphor-green/80 leading-relaxed min-h-[1.5rem]">
      {displayed}
      {isTyping && <span className="animate-pulse bg-phosphor-green text-bg-void ml-1 px-1">█</span>}
    </div>
  );
};

// --- Project Row (ps aux aesthetic) ---
const ProjectRow = ({ project }: { project: any }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-phosphor-green/20 hover:border-phosphor-green/50 bg-[#03110a] transition-all overflow-hidden relative group">
       {/* Box corner decorations */}
       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-phosphor-green opacity-30 group-hover:opacity-100" />
       <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-phosphor-green opacity-30 group-hover:opacity-100" />
       <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-phosphor-green opacity-30 group-hover:opacity-100" />
       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-phosphor-green opacity-30 group-hover:opacity-100" />

       {/* `ps aux` style row */}
       <div onClick={() => setExpanded(!expanded)} className="p-4 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 cursor-pointer relative z-10">
         <div className="w-full lg:w-32 shrink-0 flex items-center justify-between lg:justify-start">
           <span className="lg:hidden text-xs text-phosphor-green/50">STATUS:</span>
           <StatusBadge status={project.status as any} />
         </div>
         <div className="w-full lg:w-40 shrink-0 text-phosphor-green/70 uppercase truncate font-jetbrains text-sm flex gap-2">
           <span className="lg:hidden text-xs text-phosphor-green/50">DEV:</span> {project.developer}
         </div>
         <div className="w-full lg:w-48 shrink-0 font-bold text-phosphor-green font-space uppercase truncate flex gap-2">
           <span className="lg:hidden text-xs text-phosphor-green/50">NAME:</span> {project.projectname}
         </div>
         <div className="flex-grow text-phosphor-green/60 truncate font-jetbrains text-xs lg:text-sm pt-2 lg:pt-0 border-t lg:border-none border-phosphor-green/10 mt-2 lg:mt-0">
           {project.description}
         </div>
       </div>

       {/* Expanded Verbose Details */}
       <AnimatePresence>
         {expanded && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="border-t border-phosphor-green/20 relative z-10 bg-black/40"
           >
             <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start">
               {/* Image Display */}
               <div className="w-full lg:w-5/12 aspect-video relative border border-phosphor-green/30 p-1 bg-bg-void shrink-0">
                 <div className="relative w-full h-full grayscale contrast-125">
                   {project.image ? (
                     <Image src={project.image} alt={project.projectname} fill className="object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center font-vt323 text-phosphor-green/30">NO_IMAGE_DATA</div>
                   )}
                   {/* Phosphor glow overlay */}
                   <div className="absolute inset-0 bg-phosphor-green/20 mix-blend-screen pointer-events-none" />
                 </div>
               </div>
               
               {/* Streaming Output */}
               <div className="w-full lg:w-7/12 font-vt323 text-phosphor-green flex flex-col">
                  <VerboseText text={`> INIT_CONNECTION... OK`} delay={0.1} trigger={expanded} />
                  <VerboseText text={`> FETCHING_PAYLOAD --id=${project.id}`} delay={0.4} trigger={expanded} />
                  <div className="h-4" />
                  <VerboseText text={`NAME: ${project.projectname}`} delay={0.8} trigger={expanded} />
                  <VerboseText text={`LEAD_OP: ${project.developer}`} delay={1.1} trigger={expanded} />
                  <VerboseText text={`TECH_STACK: ${project.stack.join(" | ")}`} delay={1.4} trigger={expanded} />
                  <VerboseText text={`MISSION_BRIEF: ${project.description}`} delay={1.7} trigger={expanded} />
                  <div className="h-4" />
                  <VerboseText text={`> AWAITING_COMMAND...`} delay={2.4} trigger={expanded} />
                  
                  {/* Action Links */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 0.5 }}
                    className="mt-6 flex flex-wrap gap-4 font-jetbrains text-sm"
                  >
                    {project.githublink && (
                      <a href={project.githublink} target="_blank" rel="noopener noreferrer" className="border border-phosphor-green/50 px-4 py-2 hover:bg-phosphor-green hover:text-bg-void transition-colors uppercase">
                        [SOURCE_CODE]
                      </a>
                    )}
                    {project.deployedlink && (
                      <a href={project.deployedlink} target="_blank" rel="noopener noreferrer" className="border border-phosphor-green/50 px-4 py-2 hover:bg-phosphor-green hover:text-bg-void transition-colors uppercase">
                        [LIVE_DEPLOYMENT]
                      </a>
                    )}
                  </motion.div>
               </div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

// --- Main Page Component ---
export default function ProjectPage() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll within this main container
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start start", "end end"] 
  });

  return (
    <main ref={ref} className="relative bg-bg-void min-h-[150vh] pt-32 pb-32 overflow-x-hidden">
       {/* Global Background Grid */}
       <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ background: 'repeating-linear-gradient(0deg, rgba(51,255,102,1) 0px, transparent 1px, transparent 5px)' }} />

        {/* Parallax Scrolling Terminal Code Background */}
        <ParallaxBackground scrollYProgress={scrollYProgress} />

        {/* Scroll HUD Indicator */}
        <ScrollProgressHUD scrollYProgress={scrollYProgress} />

        {/* Content */}
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 md:mb-20">
            <h1 className="font-space text-5xl md:text-7xl font-bold text-phosphor-green uppercase tracking-tighter mb-4">
              [SDG_Projects]
            </h1>
            <p className="font-jetbrains text-phosphor-green/50 text-sm md:text-base uppercase tracking-widest">
              &gt; ps aux | grep projects
            </p>
          </div>
          
          {/* ps aux Column Headers (Hidden on Mobile) */}
          <div className="hidden lg:flex font-jetbrains text-xs text-phosphor-green/40 uppercase tracking-widest border-b border-phosphor-green/20 pb-3 mb-4 px-4 gap-4">
             <div className="w-32 shrink-0">STATUS</div>
             <div className="w-40 shrink-0">DEV_LEAD</div>
             <div className="w-48 shrink-0">PID / NAME</div>
             <div className="flex-grow">COMMAND_DESC</div>
          </div>

          {/* Project List */}
          <div className="space-y-3">
             {projectsData.map(proj => <ProjectRow key={proj.id} project={proj} />)}
          </div>
       </div>
    </main>
  );
}
