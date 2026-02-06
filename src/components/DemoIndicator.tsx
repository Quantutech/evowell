import React from 'react';

export const DemoBanner: React.FC = () => {
  const isDemo = localStorage.getItem('evowell_mock_store') !== null;
  
  if (!isDemo) return null;

  return (
    <div className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1 text-center sticky top-0 z-[100] shadow-sm flex items-center justify-center gap-2">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      Demo Mode Active • Handcrafted & Generative Mock Data
    </div>
  );
};

export const DemoBadge: React.FC = () => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 ml-2">
      🟡 Demo Data
    </span>
  );
};
