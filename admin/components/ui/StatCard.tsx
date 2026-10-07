import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  supportingText?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendType = 'positive',
  supportingText,
  icon,
  subtitle,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-gray-200/80 bg-white p-5 shadow-xs transition-all hover:border-gray-300 hover:shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {value}
            </span>
          </div>
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50/80 text-gray-600">
            {icon}
          </div>
        )}
      </div>

      {(trend || supportingText || subtitle) && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${
                trendType === 'positive'
                  ? 'bg-emerald-50 text-emerald-700'
                  : trendType === 'negative'
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {trendType === 'positive' && <ArrowUpRight className="h-3 w-3" />}
              {trendType === 'negative' && <ArrowDownRight className="h-3 w-3" />}
              {trendType === 'neutral' && <Minus className="h-3 w-3" />}
              {trend}
            </span>
          )}

          {supportingText && (
            <span className="text-gray-500">{supportingText}</span>
          )}

          {subtitle && (
            <span className="text-gray-400">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
