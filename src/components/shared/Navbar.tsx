'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Heart } from 'lucide-react';
import { useMovieStore } from '@/store/useMovieStore';

export function Navbar() {
  const pathname = usePathname();
  const favoritesCount = useMovieStore((state) => state.favorites.length);

  return (
    <nav className="sticky top-0 z-40 bg-brand-surface/80 backdrop-blur-md border-b border-gray-800/60 px-6 py-4 flex justify-between items-center transition-all">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-2 rounded-lg bg-brand-gradient text-white shadow-lg shadow-brand-accent/20 group-hover:scale-105 transition-transform">
          <Film size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          WATCH<span className="text-brand-accent">IT</span>
        </span>
      </Link>

      <div className="flex items-center gap-6 font-medium text-sm">
        <Link 
          href="/" 
          className={`transition-colors hover:text-brand-accent ${pathname === '/' ? 'text-brand-accent' : 'text-brand-textMuted'}`}
        >
          Discover
        </Link>
        <Link 
          href="/favorites" 
          className={`flex items-center gap-2 transition-colors hover:text-brand-secondary ${pathname === '/favorites' ? 'text-brand-secondary' : 'text-brand-textMuted'}`}
        >
          <Heart size={16} className={pathname === '/favorites' ? 'fill-brand-secondary text-brand-secondary' : ''} />
          <span>Favorites</span>
          {favoritesCount > 0 && (
            <span className="bg-brand-secondary text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}