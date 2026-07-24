import fs from 'fs';
import path from 'path';
import ResourcesClient from './ResourcesClient';

export interface Resource {
  id: string;
  title: string;
  type: string;
  tags: string[];
  content: string;
  author: string;
}

async function getResources(): Promise<Resource[]> {
  const dir = path.join(process.cwd(), 'public', 'sdgteam', 'webmds');
  
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch (error) {
    console.error('Error reading webmds directory:', error);
    return [];
  }

  const resources = files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Extract title from the first level 1 heading, strip HTML tags if any (like <img>)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    let title = file.replace('.md', '').toUpperCase() + ' GUIDE';
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    }
    
    // Auto-tag based on filename
    const tags = [file.replace('.md', '')];
    
    return {
      id: file,
      title,
      type: 'DOC',
      tags,
      content,
      author: 'COPS SDG',
    };
  });

  return resources;
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <main className="relative min-h-screen bg-bg-void overflow-x-hidden flex flex-col pt-24 pb-12 px-6">
      {/* Background scanline noise */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(51,255,102,1) 0px, transparent 1px, transparent 5px)',
        }}
      />
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        <header className="mb-10">
          {/* <h1 className="font-space font-bold uppercase text-phosphor-green text-3xl md:text-5xl tracking-tight flex items-center gap-4">
            <span className="text-phosphor-green/50 opacity-50 select-none">/</span>
            RESOURCES
          </h1>
          <p className="font-jetbrains text-phosphor-green/60 text-sm mt-3 tracking-widest uppercase">
            &gt; INDEX OF INTERNAL DOCUMENTATION & GUIDES
          </p> */}
          {/* Header */}
          <div className="mb-12 md:mb-20">
            <h1 className="font-space text-5xl md:text-7xl font-bold text-phosphor-green uppercase tracking-tighter mb-4">
              [RESOURCES]
            </h1>
            <p className="font-jetbrains text-phosphor-green/50 text-sm md:text-base uppercase tracking-widest">
              &gt; INDEX OF INTERNAL DOCUMENTATION & GUIDES
            </p>
          </div>
        </header>

        <ResourcesClient initialResources={resources} />
      </div>
    </main>
  );
}
