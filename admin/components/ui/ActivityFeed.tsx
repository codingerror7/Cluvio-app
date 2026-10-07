import React from 'react';
import { ActivityItem } from '@/lib/mockData';
import { Sparkles, UserCheck, UserPlus, FileEdit, Calendar, AlertCircle } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  className?: string;
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = 'Recent Activity',
  className = '',
  maxItems,
}) => {
  const items = maxItems ? activities.slice(0, maxItems) : activities;

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'club':
        return <Sparkles className="h-3.5 w-3.5 text-blue-600" />;
      case 'president':
        return <UserCheck className="h-3.5 w-3.5 text-emerald-600" />;
      case 'student':
        return <UserPlus className="h-3.5 w-3.5 text-indigo-600" />;
      case 'event':
        return <Calendar className="h-3.5 w-3.5 text-amber-600" />;
      case 'alert':
        return <AlertCircle className="h-3.5 w-3.5 text-rose-600" />;
      default:
        return <FileEdit className="h-3.5 w-3.5 text-gray-500" />;
    }
  };

  const getIconBg = (type: ActivityItem['type']) => {
    switch (type) {
      case 'club':
        return 'bg-blue-50 border-blue-200';
      case 'president':
        return 'bg-emerald-50 border-emerald-200';
      case 'student':
        return 'bg-indigo-50 border-indigo-200';
      case 'event':
        return 'bg-amber-50 border-amber-200';
      case 'alert':
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={`rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="text-[11px] font-medium text-gray-400">Live platform feed</span>
        </div>
      )}

      <div className="flow-root">
        <ul className="-mb-6">
          {items.map((activity, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={activity.id}>
                <div className="relative pb-5">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-2xs ${getIconBg(
                        activity.type
                      )}`}
                    >
                      {getIcon(activity.type)}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-xs font-semibold text-gray-900">
                          {activity.title}
                        </p>
                        <time className="shrink-0 text-[11px] text-gray-400">
                          {activity.timestamp}
                        </time>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
