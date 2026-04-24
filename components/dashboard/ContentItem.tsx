import Link from 'next/link';
import { Video, Share2 } from 'lucide-react';
import { routes } from '@/routes/routes';

interface ContentItemProps {
  piece: any;
  onShare: (e: React.MouseEvent, id: string) => void;
}

export const ContentItem = ({ piece, onShare }: ContentItemProps) => {
  const statusStyles = {
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-rose-100 text-rose-700',
    pending: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="relative group">
      <Link
        href={routes.review(piece.id)}
        className="p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between hover:bg-slate-50 transition-colors w-full text-left"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="h-12 w-12 bg-slate-100 rounded-lg flex-shrink-0 border border-slate-200 flex items-center justify-center group-hover:bg-white group-hover:border-blue-200 transition-colors">
            <Video size={20} className="text-slate-400 group-hover:text-blue-500" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] text-slate-900 font-semibold truncate group-hover:text-blue-600">
              {piece.title}
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Added {new Date(piece.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusStyles[piece.status as keyof typeof statusStyles]}`}>
            {piece.status}
          </span>

          <button
            onClick={(e) => onShare(e, piece.id)}
            className="relative z-20 h-9 px-4 bg-white border border-slate-200 rounded-lg text-slate-700 text-[13px] font-medium hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2 shadow-sm active:scale-95"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </Link>
    </div>
  );
};