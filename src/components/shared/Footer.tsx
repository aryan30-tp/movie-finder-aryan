import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-brand-bg border-t border-gray-900 px-6 py-6 mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-textMuted">
      <div>
        © {new Date().getFullYear()} Watchit App. All cinema assets curated dynamically.
      </div>
      <div className="font-mono bg-brand-surface border border-gray-800 px-3 py-1 rounded-md text-brand-accent shadow-inner">
        Built for Jeevan Aryan Agrawal
      </div>
    </footer>
  );
}