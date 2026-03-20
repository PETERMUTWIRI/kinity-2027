'use client';

export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen bg-[#0074D9] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="h-12 bg-white/20 rounded w-3/4" />
            <div className="h-8 bg-white/20 rounded w-1/2" />
            <div className="h-4 bg-white/20 rounded w-full" />
            <div className="h-4 bg-white/20 rounded w-5/6" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 bg-white/30 rounded w-40" />
              <div className="h-12 bg-white/20 rounded w-32" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-[3/2] bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
          <div className="h-48 bg-slate-200" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-slate-200 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square bg-slate-800 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-64 bg-slate-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="h-12 bg-slate-200 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto" />
          <CardSkeleton count={4} />
        </div>
      </div>
    </div>
  );
}
