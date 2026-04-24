import { ContentPiece } from '@/types/types';
import { Clock, ShieldCheck, XCircle, Calendar } from 'lucide-react';

export function ContentDetails({ piece }: { piece: ContentPiece }) {
  const statusStyles = {
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-rose-100 text-rose-700',
    pending: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm h-fit">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">Details</h3>
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Status</span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusStyles[piece.status]}`}>
            {piece.status === 'pending' && <Clock size={12} />}
            {piece.status === 'approved' && <ShieldCheck size={12} />}
            {piece.status === 'rejected' && <XCircle size={12} />}
            {piece.status}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Submission Date</span>
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Calendar size={16} className="text-slate-400" />
            {new Date(piece.created_at).toLocaleDateString('es-AR', { dateStyle: 'long' })}
          </div>
        </div>
      </div>
    </div>
  );
}