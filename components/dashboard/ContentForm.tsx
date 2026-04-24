import { PlusCircle, UploadCloud } from 'lucide-react';

interface ContentFormProps {
  title: string;
  videoUrl: string;
  loading: boolean;
  setTitle: (val: string) => void;
  setVideoUrl: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ContentForm = ({ title, videoUrl, loading, setTitle, setVideoUrl, onSubmit }: ContentFormProps) => (
  <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <h2 className="text-[20px] font-semibold text-gray-700 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
      <PlusCircle size={22} className="text-blue-600" /> New Content
    </h2>
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-tight mb-1">Title</label>
        <input
          className="w-full h-11 px-3 rounded-lg border placeholder:text-gray-400 text-black border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
          placeholder="Enter content title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-tight mb-1">Video URL</label>
        <input
          className="w-full h-11 px-3 rounded-lg border placeholder:text-gray-400 text-black border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
          placeholder="https://youtube.com/..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
      </div>
      <button
        disabled={loading}
        className="w-full h-11 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
      >
        <UploadCloud size={18} />
        {loading ? 'Submitting...' : 'Submit for Review'}
      </button>
    </form>
  </section>
);