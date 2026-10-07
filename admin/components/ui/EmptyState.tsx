import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'Try adjusting your search query or filters to find what you are looking for.',
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-12 px-6 text-center ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-2xs ring-1 ring-gray-200">
        {icon || <SearchX className="h-6 w-6 text-gray-400" />}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-gray-500 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-gray-900"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
