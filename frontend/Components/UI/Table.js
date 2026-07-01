import React from "react";

const Table = ({ columns = [], rows = [], emptyLabel = "No records found." }) => {
  return (
    <div className="table-shell">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-[var(--surface-strong)] text-[10px] uppercase tracking-wider text-[var(--muted-soft)] border-b border-[var(--border)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 font-semibold select-none">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] bg-transparent">
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={row.id || index} className="transition-colors hover:bg-[var(--surface-hover)]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-3.5 text-sm text-[var(--muted)]">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-10 text-center text-sm text-[var(--muted-soft)] bg-transparent" colSpan={columns.length || 1}>
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
