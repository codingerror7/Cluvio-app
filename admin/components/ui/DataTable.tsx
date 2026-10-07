import React from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyState,
  className = '',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="animate-pulse p-6 space-y-4">
          <div className="h-5 bg-gray-100 rounded-md w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-50 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-8">
        {emptyState}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-2xs ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200/90 bg-gray-50/70 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  style={{ width: col.width }}
                  className={`px-4 py-3 sm:px-5 ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((item, index) => {
              const isClickable = Boolean(onRowClick);
              return (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`transition-colors ${
                    isClickable ? 'cursor-pointer hover:bg-gray-50/80' : 'hover:bg-gray-50/50'
                  }`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3.5 sm:px-5 text-gray-700 ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {col.render
                        ? col.render(item, index)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
