// app/admin/page.tsx - KIKIMO FOUNDATION ADMIN DASHBOARD
import { Suspense } from 'react';
import DashboardContent from './DashboardContent';

export default function AdminDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="h-10 bg-slate-800 rounded mb-8 animate-pulse w-1/3" />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
      
      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 h-80 border border-slate-700">
            <div className="h-6 bg-slate-700 rounded mb-4 animate-pulse w-1/2" />
            <div className="space-y-3">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-12 bg-slate-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
