// app/admin/DashboardContent.tsx - NATIONAL VISION PARTY DASHBOARD
'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaCalendarAlt, 
  FaNewspaper, 
  FaVideo, 
  FaHeart, 
  FaUsers,
  FaHandshake,
  FaEnvelope,
  FaFlag,
  FaArrowRight,
  FaEye,
  FaChartLine,
} from 'react-icons/fa';

/* ---------- types ---------- */
interface Post {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
  cover?: string;
  published?: boolean;
  isPressRelease?: boolean;
}

interface Event {
  id: number;
  title: string;
  category: string;
  startDate: string;
  cover?: string;
  location?: string;
  county?: string;
}

interface Video {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

interface Volunteer {
  id: string;
  name: string;
  email: string;
  county: string;
  role: string;
  status: string;
  createdAt: string;
}

interface DonationTier {
  id: number;
  title: string;
  amountKES: number;
  category: string;
  published: boolean;
}

interface Contribution {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}


// Safe fetcher that returns empty array on error
const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) {
      console.warn(`API error: ${url} returned ${res.status}`);
      return [];
    }
    const data = await res.json();
    // Handle both array responses and { posts, pagination } object
    if (Array.isArray(data)) return data;
    if (data.posts && Array.isArray(data.posts)) return data.posts;
    return [];
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return [];
  }
};

export default function DashboardContent() {
  const { data: posts, mutate: mutatePosts } = useSWR<Post[]>('/api/blog', fetcher);
  const { data: events, mutate: mutateEvents } = useSWR<Event[]>('/api/events', fetcher);
  const { data: videos, mutate: mutateVideos } = useSWR<Video[]>('/api/videos', fetcher);
  const { data: volunteers } = useSWR<Volunteer[]>('/api/volunteers', fetcher);
  const { data: donationTiers } = useSWR<DonationTier[]>('/api/donation-tiers', fetcher);
  const { data: contributions } = useSWR<Contribution[]>('/api/contributions', fetcher);

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    mutatePosts(posts?.filter((p) => p.id !== id) ?? [], false);
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    mutateEvents(events?.filter((e) => e.id !== id) ?? [], false);
  };

  const deleteVideo = async (id: number) => {
    if (!confirm('Delete this video?')) return;
    await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
    mutateVideos(videos?.filter((v) => v.id !== id) ?? [], false);
  };

  /* ---------- computed stats ---------- */
  const totalContributions = contributions?.reduce((sum, c) => 
    c.status === 'completed' ? sum + c.amount : sum, 0) || 0;
  
  const totalVolunteers = volunteers?.length || 0;
  const activeVolunteers = volunteers?.filter(v => v.status === 'active').length || 0;
  
  const upcomingEvents = events
    ?.filter(e => new Date(e.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) || [];

  const recentVideos = videos
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  const pendingVolunteers = volunteers
    ?.filter(v => v.status === 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5) || [];

  /* ---------- skeleton while loading ---------- */
  if (!posts || !events || !videos || !volunteers) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="h-10 bg-slate-800 rounded mb-8 animate-pulse w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- dashboard ---------- */
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <FaFlag className="text-[#1E3A8A]" /> Campaign Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Track the movement&apos;s progress across all 47 counties
          </p>
        </div>
        <div className="text-sm text-slate-400">
          {new Date().toLocaleDateString('en-KE', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          label="Total Volunteers" 
          value={totalVolunteers} 
          subValue={`${activeVolunteers} active`}
          icon={<FaHandshake />} 
          href="/admin/volunteers" 
          color="blue" 
        />
        <MetricCard 
          label="Contributions" 
          value={`KES ${(totalContributions / 100).toLocaleString()}`}
          icon={<FaHeart />} 
          href="/admin/donations" 
          color="red" 
        />
        <MetricCard 
          label="Upcoming Events" 
          value={upcomingEvents.length} 
          icon={<FaCalendarAlt />} 
          href="/admin/events" 
          color="green" 
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <QuickStatCard 
          label="Press Releases" 
          value={posts?.filter(p => p.isPressRelease).length || 0} 
          icon={<FaNewspaper />}
          color="blue"
        />
        <QuickStatCard 
          label="Videos" 
          value={videos?.filter(v => v.published).length || 0} 
          icon={<FaVideo />}
          color="purple"
        />
        <QuickStatCard 
          label="Pending Volunteers" 
          value={volunteers?.filter(v => v.status === 'pending').length || 0} 
          icon={<FaUsers />}
          color="orange"
        />
        <QuickStatCard 
          label="Donation Tiers" 
          value={donationTiers?.length || 0} 
          icon={<FaHeart />}
          color="red"
        />
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* RECENT POSTS */}
        <SectionCard
          title="Recent Posts"
          href="/admin/posts"
          onNew="/admin/posts/edit"
          items={posts?.slice(0, 5) || []}
          render={(p) => (
            <ItemRow
              id={p.id}
              title={p.title}
              subtitle={`${p.category} • ${new Date(p.publishedAt).toLocaleDateString('en-KE')}`}
              cover={p.cover}
              editLink={`/admin/posts/edit?id=${p.id}`}
              onDelete={() => deletePost(p.id)}
              status={p.published === false ? 'Draft' : p.isPressRelease ? 'Press' : undefined}
              statusColor={p.isPressRelease ? 'purple' : undefined}
            />
          )}
        />

        {/* UPCOMING EVENTS */}
        <SectionCard
          title="Upcoming Events"
          href="/admin/events"
          onNew="/admin/events/new"
          items={upcomingEvents.slice(0, 5)}
          render={(e) => (
            <ItemRow
              id={e.id}
              title={e.title}
              subtitle={`${new Date(e.startDate).toLocaleDateString('en-KE')} • ${e.county || e.location}`}
              cover={e.cover}
              editLink={`/admin/events/${e.id}`}
              onDelete={() => deleteEvent(e.id)}
            />
          )}
        />

        {/* RECENT VIDEOS */}
        <SectionCard
          title="Recent Videos"
          href="/admin/videos/list"
          onNew="/admin/videos"
          items={recentVideos.slice(0, 5)}
          render={(v) => (
            <ItemRow
              id={v.id}
              title={v.title}
              subtitle={`${v.category} • Order: ${v.order}`}
              cover={v.thumbnail}
              editLink={`/admin/videos?id=${v.id}`}
              onDelete={() => deleteVideo(v.id)}
              status={v.published ? undefined : 'Draft'}
            />
          )}
        />

        {/* PENDING VOLUNTEERS */}
        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaUsers className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-white">Pending Volunteers</h2>
            </div>
            <Link href="/admin/volunteers" className="text-[#1E3A8A] hover:text-[#0F172A] text-sm font-bold flex items-center gap-1">
              <FaEye /> View All
            </Link>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {pendingVolunteers.length ? (
              pendingVolunteers.map((v) => (
                <div key={v.id} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-orange-500/50 transition">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <FaHandshake className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{v.name}</p>
                    <p className="text-xs text-slate-400">{v.county} • {v.role}</p>
                  </div>
                  <Link 
                    href={`/admin/volunteers/${v.id}`}
                    className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white transition"
                  >
                    Review
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">No pending volunteers</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <QuickActionButton href="/admin/posts/edit" icon={<FaNewspaper />} label="New Post" />
          <QuickActionButton href="/admin/events/new" icon={<FaCalendarAlt />} label="New Event" />
          <QuickActionButton href="/admin/videos" icon={<FaVideo />} label="Add Video" />
          <QuickActionButton href="/admin/volunteers" icon={<FaUsers />} label="Review Volunteers" />
          <QuickActionButton href="/admin/manifesto/new" icon={<FaFlag />} label="Add Pillar" />
          <QuickActionButton href="/admin/donations" icon={<FaHeart />} label="View Donations" />
        </div>
      </div>
    </div>
  );
}

/* ---------- re-usable components ---------- */

function MetricCard({ 
  label, 
  value, 
  subValue,
  icon, 
  href, 
  color = 'blue' 
}: { 
  label: string; 
  value: string | number; 
  subValue?: string;
  icon: React.ReactNode; 
  href: string; 
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'; 
}) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:shadow-blue-500/25',
    green: 'from-green-600 to-green-700 hover:shadow-green-500/25',
    purple: 'from-purple-600 to-purple-700 hover:shadow-purple-500/25',
    orange: 'from-orange-600 to-orange-700 hover:shadow-orange-500/25',
    red: 'from-red-600 to-red-700 hover:shadow-red-500/25',
  };
  
  return (
    <Link 
      href={href} 
      className={`group block bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {subValue && (
            <p className="text-white/60 text-xs mt-1">{subValue}</p>
          )}
        </div>
        <div className="text-white/30 text-3xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </Link>
  );
}

function QuickStatCard({ 
  label, 
  value, 
  icon, 
  color = 'blue' 
}: { 
  label: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'; 
}) {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-500/10',
    green: 'text-green-500 bg-green-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    red: 'text-red-500 bg-red-500/10',
  };
  
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-xs">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function SectionCard<T>({
  title,
  href,
  onNew,
  items,
  render,
}: {
  title: string;
  href: string;
  onNew: string;
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Link href={onNew} className="text-[#1E3A8A] hover:text-[#0F172A] text-sm font-bold flex items-center gap-1">
          <FaPlus /> New
        </Link>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {items.length ? (
          items.map(render)
        ) : (
          <p className="text-sm text-slate-400 text-center py-8">No items yet</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700">
        <Link href={href} className="text-sm text-[#1E3A8A] hover:text-[#0F172A] font-semibold flex items-center gap-1">
          View all <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function ItemRow({ 
  id, 
  title, 
  subtitle, 
  cover, 
  editLink, 
  onDelete, 
  status,
  statusColor = 'gray'
}: { 
  id: number; 
  title: string; 
  subtitle: string; 
  cover?: string; 
  editLink: string; 
  onDelete: () => void; 
  status?: string;
  statusColor?: 'gray' | 'purple';
}) {
  const statusColors = {
    gray: 'bg-slate-600 text-slate-200',
    purple: 'bg-purple-600 text-purple-100',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition group">
      {cover ? (
        <img src={cover} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FaNewspaper className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm truncate">{title}</p>
        <p className="text-xs text-slate-400 truncate">{subtitle}</p>
      </div>
      {status && (
        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${statusColors[statusColor]}`}>
          {status}
        </span>
      )}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
        <Link href={editLink} className="text-[#1E3A8A] hover:text-[#0F172A] p-2" title="Edit">
          <FaEdit />
        </Link>
        <button onClick={onDelete} className="text-red-400 hover:text-red-300 p-2" title="Delete">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

function QuickActionButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition backdrop-blur-sm">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
