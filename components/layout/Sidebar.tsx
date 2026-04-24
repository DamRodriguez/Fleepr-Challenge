'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileSearch } from 'lucide-react';
import { routes } from '@/routes/routes';

export function Sidebar() {
  const pathname = usePathname();
  const isDashboard = pathname === routes.home;

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path || (path !== routes.home && pathname.startsWith(path));
    return `flex items-center gap-3 px-4 py-2.5 lg:py-3 rounded-xl transition-all font-medium text-sm lg:text-base
      ${isActive
        ? 'bg-blue-50 text-blue-700 font-bold shadow-sm shadow-blue-500/5'
        : 'text-slate-400 hover:bg-blue-50 hover:text-blue-700'
      } 
      ${path === "/review" && isDashboard ? 'pointer-events-none opacity-50' : ''}`;
  };

  return (
    <nav className="
      fixed top-0 left-0 right-0 h-16 flex flex-row items-center justify-between px-6 bg-white border-b border-slate-200 z-50
      xl:flex-col xl:fixed xl:left-0 xl:top-0 xl:bottom-0 xl:w-64 xl:h-auto xl:py-6 xl:px-4 xl:border-r xl:border-b-0
    ">

      <div className="xl:mb-8 xl:px-4 xl:w-full">
        <h2 className="text-base xl:text-lg font-bold text-slate-900 tracking-tight">
          Agency<span className="hidden xl:inline"> Portal</span>
        </h2>
      </div>

      <ul className="flex flex-row xl:flex-col gap-2 xl:flex-1 xl:w-full">
        <li>
          <Link href={routes.home} className={getLinkStyles('/')}>
            <LayoutDashboard size={20} />
            <span className="hidden sm:inline xl:inline">Dashboard</span>
          </Link>
        </li>
        <li>
          <div className={getLinkStyles('/review')}>
            <FileSearch size={20} />
            <span className="hidden sm:inline xl:inline">Reviewing</span>
          </div>
        </li>
      </ul>

      <div className="w-8 xl:hidden" />
    </nav>
  );
}