import { LucideIcon } from 'lucide-react';
interface StatusCardProps {
  label: string;
  count: number;
  icon: LucideIcon;
  colorClass: string;
}

export const StatusCard = ({ label, count, icon: Icon, colorClass }: StatusCardProps) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
    <div className={`flex items-center gap-2 ${colorClass} mb-1 font-bold text-[12px] uppercase`}>
      <Icon size={14} /> {label}
    </div>
    <p className="text-[28px] font-bold text-slate-900">{count}</p>
  </div>
);