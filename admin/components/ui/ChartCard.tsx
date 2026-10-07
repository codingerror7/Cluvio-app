import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  headerAction,
  children,
  footer,
  className = '',
}) => {
  return (
    <div
      className={`rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs transition-all hover:border-gray-300 sm:p-6 ${className}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
          )}
        </div>

        {headerAction && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {headerAction}
          </div>
        )}
      </div>

      <div className="w-full">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};
