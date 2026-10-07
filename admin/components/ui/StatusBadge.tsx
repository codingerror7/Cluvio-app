import React from 'react';

export type StatusType = 'Active' | 'Pending' | 'Inactive' | 'Suspended' | 'Completed' | 'Upcoming' | 'In Progress';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (normalized === 'active' || normalized === 'completed') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'pending' || normalized === 'upcoming') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200/60';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'suspended') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/60';
    dotColor = 'bg-rose-500';
  } else if (normalized === 'inactive') {
    styles = 'bg-slate-100 text-slate-600 border-slate-200';
    dotColor = 'bg-slate-400';
  } else if (normalized === 'in progress') {
    styles = 'bg-blue-50 text-blue-700 border-blue-200/60';
    dotColor = 'bg-blue-500';
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs font-medium'
      : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${styles} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};
