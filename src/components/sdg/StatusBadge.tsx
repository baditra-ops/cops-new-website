import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'offline' | 'pending' | 'ok' | 'in_progress' | 'planned' | 'OK' | 'IN_PROGRESS' | 'PLANNED';
  text?: string;
}

export default function StatusBadge({ status, text }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'ok':
        return 'text-phosphor-green border-phosphor-green bg-phosphor-green/10 shadow-[0_0_10px_rgba(51,255,102,0.2)]';
      case 'offline':
        return 'text-error-red border-error-red bg-error-red/10 shadow-[0_0_10px_rgba(255,59,59,0.2)]';
      case 'pending':
      case 'in_progress':
        return 'text-amber border-amber bg-amber/10 shadow-[0_0_10px_rgba(255,176,0,0.2)]';
      case 'planned':
        return 'text-gray-400 border-gray-400 bg-gray-400/10 shadow-[0_0_10px_rgba(156,163,175,0.2)]';
      default:
        return 'text-crt-white border-crt-white/50';
    }
  };

  const displayText = text || status.toUpperCase();

  return (
    <span className={`inline-flex items-center px-2 py-0.5 border text-xs font-jetbrains uppercase tracking-wider ${getStatusColor()}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 bg-current rounded-full ${status === 'active' ? 'animate-pulse' : ''}`} />
      {displayText}
    </span>
  );
}
