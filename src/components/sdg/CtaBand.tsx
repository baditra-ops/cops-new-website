'use client';

import { useState } from 'react';

export default function CtaBand() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative z-20 w-full py-24 bg-bg-void border-b border-phosphor-green/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-space text-3xl md:text-4xl text-phosphor-green font-bold uppercase tracking-widest mb-6 drop-shadow-[0_0_8px_rgba(51,255,102,0.4)]">
          &gt; Join_The_Mission
        </h2>
        <p className="font-jetbrains text-crt-white/70 mb-10">
          Ready to commit? Enter your email to receive recruitment updates and mission briefings.
        </p>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); alert(`Registered: ${email}`); setEmail(''); }}
          className="relative max-w-lg mx-auto flex items-center border border-phosphor-green bg-[#03110a] p-1 shadow-[0_0_15px_rgba(51,255,102,0.1)] focus-within:shadow-[0_0_20px_rgba(51,255,102,0.3)] transition-shadow"
        >
          <span className="text-phosphor-green font-vt323 text-2xl pl-4 pr-2 select-none">&gt;</span>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@host.com"
            required
            className="flex-1 bg-transparent border-none outline-none text-phosphor-green font-jetbrains placeholder:text-phosphor-green/30 px-2 py-3"
          />
          <button 
            type="submit"
            className="bg-phosphor-green text-bg-void font-jetbrains font-bold uppercase px-6 py-3 hover:bg-white hover:text-bg-void transition-colors"
          >
            Execute
          </button>
        </form>
      </div>
    </section>
  );
}
