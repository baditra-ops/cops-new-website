import fs from 'fs';
import path from 'path';
import ResourcesClient, { Resource } from './ResourcesClient';

export type { Resource };

async function getResources(): Promise<Resource[]> {
  const dir = path.join(process.cwd(), 'public', 'igteam', 'webmds');
  
  let files: string[] = [];
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch (error) {
    console.error('Error reading igteam/webmds directory:', error);
    return [];
  }

  const resources = files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Extract title from the first level 1 heading (# Title)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    let title = file.replace('.md', '').toUpperCase() + ' PAPER';
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    }
    
    // Categorize into NLP, CV, RL or RESEARCH based on filename
    let type = 'NLP';
    const lowerFile = file.toLowerCase();
    if (lowerFile.includes('vision') || lowerFile.includes('cv')) {
      type = 'CV';
    } else if (lowerFile.includes('reinforcement') || lowerFile.includes('rl')) {
      type = 'RL';
    } else if (lowerFile.includes('llm') || lowerFile.includes('rag') || lowerFile.includes('nlp')) {
      type = 'NLP';
    } else {
      type = 'RESEARCH';
    }

    // Estimate reading time & word count
    const words = content.split(/\s+/).filter(Boolean).length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      id: file,
      title,
      type,
      tags: [type.toLowerCase(), lowerFile.replace('.md', ''), 'ai-research'],
      content,
      author: 'COPS IG AI',
      readTime: `${readTimeMinutes} min read`,
      wordCount: words,
    };
  });

  return resources;
}

export default async function IGResourcesPage() {
  const resources = await getResources();

  return (
    <main className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <header className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>RESEARCH PUBLICATIONS & GUIDES</span>
        </div>
        <h1 className="font-orbitron text-4xl sm:text-5xl font-bold text-white tracking-wide mb-3">
          AI Knowledge Base & Specs
        </h1>
        <p className="font-mono text-gray-400 text-sm sm:text-base max-w-3xl">
          {'// EXPLORE RESEARCH PAPERS, BLUEPRINTS & TECHNICAL GUIDES ACROSS NLP, COMPUTER VISION & REINFORCEMENT LEARNING'}
        </p>
      </header>

      <ResourcesClient initialResources={resources} />
    </main>
  );
}
