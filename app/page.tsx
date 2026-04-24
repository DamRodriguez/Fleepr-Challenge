'use client';
import { History, Video, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { ContentForm } from '@/components/dashboard/ContentForm';
import { ContentItem } from '@/components/dashboard/ContentItem';
import { useAgencyDashboard } from '@/hooks/useAgencyDashboard';

export default function AgencyDashboard() {
  const {
    pieces,
    title,
    videoUrl,
    loading,
    setTitle,
    setVideoUrl,
    handleSubmit,
    copyToClipboard,
  } = useAgencyDashboard();

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-[30px] font-bold text-gray-700 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Manage your submissions and active content reviews.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ContentForm
            title={title}
            videoUrl={videoUrl}
            loading={loading}
            setTitle={setTitle}
            setVideoUrl={setVideoUrl}
            onSubmit={handleSubmit}
          />
          <section className="grid grid-cols-2 gap-4">
            <StatusCard
              label="Pending"
              count={pieces.filter(p => p.status === 'pending').length}
              icon={Clock}
              colorClass="text-amber-600"
            />
            <StatusCard
              label="Approved"
              count={pieces.filter(p => p.status === 'approved').length}
              icon={CheckCircle2}
              colorClass="text-emerald-600"
            />
            <StatusCard
              label="Rejected"
              count={pieces.filter(p => p.status === "rejected").length}
              icon={XCircle}
              colorClass="text-red-500"
            />
          </section>
        </div>

        <div className="lg:col-span-2">
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-[20px] font-semibold text-gray-700 flex items-center gap-2">
                <History size={22} className="text-slate-400" /> Active Submissions
              </h2>
            </div>

            <div className="flex-1 overflow-auto max-h-[600px] divide-y divide-slate-100">
              {pieces.length === 0 ? (
                <div className="p-20 text-center text-slate-400">
                  <Video size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No content submitted yet.</p>
                </div>
              ) : (
                pieces.map((piece) => (
                  <ContentItem key={piece.id} piece={piece} onShare={copyToClipboard} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}