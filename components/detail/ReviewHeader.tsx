import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { routes } from '@/routes/routes';

interface ReviewHeaderProps {
  title: string;
}

export function ReviewHeader({ title }: ReviewHeaderProps) {
  return (
    <header className="bg-white lg:left-64 border-b border-slate-200 z-30 fixed top-0 flex justify-between items-center w-full h-16">
      <div className="flex items-center gap-4 w-full pl-6 lg:pl-20">
        <nav className="hidden lg:flex items-center text-slate-400 text-sm font-medium">
          <Link
            href={routes.home}
            className="hover:text-slate-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight size={16} className="mx-2 text-slate-300" />
          <span>Reviews</span>
          <ChevronRight size={16} className="mx-2 text-slate-300" />
          <span className="text-slate-900 truncate max-w-[200px] xl:max-w-[400px]">
            {title}
          </span>
        </nav>

        <Link
          href={routes.home}
          className="lg:hidden text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={24} />
        </Link>
      </div>
    </header>
  );
}