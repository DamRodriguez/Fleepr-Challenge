'use client';
import { VideoPlayer } from '@/components/detail/VideoPlayer';
import { ContentDetails } from '@/components/detail/ContentDetails';
import { ReviewActions } from '@/components/detail/ReviewActions';
import { ReviewHeader } from '@/components/detail/ReviewHeader';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, XCircle } from 'lucide-react';
import { ContentPiece } from '@/types/types';
import { routes } from '@/routes/routes';
import { useReviewPiece } from '@/hooks/useReviewPiece';

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { piece, loading, handleAction } = useReviewPiece(params);

  if (loading) return <div className="flex items-center justify-center h-screen"><p className="text-gray-500">Loading content...</p></div>;
  if (!piece) return <div className="flex items-center justify-center h-screen"><p className="text-gray-500">Content not found.</p></div>;

  return (
    <section>
      <ReviewHeader title={piece.title} />

      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-[30px] font-bold text-gray-700">Review: {piece.title}</h1>
          <p className="text-gray-400 text-lg">Please review the final cut below.</p>
        </header>

        <VideoPlayer url={piece.video_url} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContentDetails piece={piece} />

          <div className="md:col-span-2 flex flex-col gap-6">
            {piece.status === 'pending' ? (
              <ReviewActions onAction={handleAction} />
            ) : (
              <StatusResultBanner piece={piece} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusResultBanner({ piece }: { piece: ContentPiece }) {
  const isApp = piece.status === 'approved';
  return (
    <div className={`rounded-2xl border-2 p-8 shadow-sm flex flex-col gap-6 ${isApp ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-100 border-slate-200'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isApp ? 'bg-emerald-500' : 'bg-rose-500'}`}>
          {isApp ? <ShieldCheck size={28} /> : <XCircle size={28} />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Content {isApp ? 'Approved' : 'Changes Requested'}</h3>
          <p className="text-slate-500 text-sm">Review completed on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      {piece.feedback && (
        <div className="space-y-2">
          <p className="text-[11px] uppercase font-black text-slate-400">Client Feedback:</p>
          <div className="bg-white p-5 rounded-xl border border-slate-200 italic text-slate-600 shadow-inner">"{piece.feedback}"</div>
        </div>
      )}
      <Link href={routes.home} className="inline-flex items-center gap-2 text-blue-600 font-bold"><ArrowLeft size={18} /> Return to Dashboard</Link>
    </div>
  );
}