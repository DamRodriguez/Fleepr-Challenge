import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import showToast from '../toast/showToast';

interface Props {
  onAction: (status: 'approved' | 'rejected', feedback?: string) => void;
}

export function ReviewActions({ onAction }: Props) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (showFeedback) {
    return (
      <div className="bg-white rounded-2xl border-2 border-rose-100 p-6 shadow-xl shadow-rose-900/5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle size={20} className="text-rose-500" /> Change Requests
          </h3>
          <span className="text-[11px] font-black text-rose-500 bg-rose-50 py-1 px-2 rounded-lg">REQUIRED</span>
        </div>
        <textarea
          className="w-full bg-slate-50 border border-slate-200 rounded-xl text-black placeholder:text-gray-400 p-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all min-h-[140px]"
          placeholder="Detail the necessary changes..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowFeedback(false)} className="text-slate-500 font-bold py-2 px-6 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
          <button
            disabled={!feedback.trim()}
            onClick={() => {
              onAction('rejected', feedback);
              showToast('success', 'Change request submitted');
            }}
            className="bg-rose-600 text-white font-bold py-2 px-8 rounded-xl hover:bg-rose-700 disabled:opacity-30 cursor-pointer"
          >
            Submit Rejection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => {
          onAction('approved');
          showToast('success', 'Content approved successfully');
        }}
        className="flex-1 bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-600/20 cursor-pointer"
      >
        <CheckCircle size={20} />
        Approve Content
      </button>
      <button
        onClick={() => setShowFeedback(true)}
        className="flex-1 bg-white border-2 border-rose-100 text-rose-600 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-50 cursor-pointer"
      >
        <XCircle size={20} />
        Request Changes
      </button>
    </div>
  );
}