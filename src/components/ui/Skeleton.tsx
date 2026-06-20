import React from 'react';

export function MovieCardSkeleton() {
  return (
    <div className="bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-gray-800/50 flex flex-col h-[420px]">
      <div className="w-full h-[300px] animate-shimmer" />
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded animate-shimmer" />
          <div className="h-4 w-1/4 rounded animate-shimmer" />
        </div>
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="h-4 w-1/3 rounded animate-shimmer" />
          <div className="h-8 w-8 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}