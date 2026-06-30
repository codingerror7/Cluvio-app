import React from "react";

const Table = ({ columns = [], rows = [], emptyLabel = "No records found." }) => {
  return (
    <div className="table-shell">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-[var(--surface-strong)] text-xs uppercase tracking-[0.08em] text-white/42">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={row.id || index} className="transition hover:bg-white/[0.035]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 text-white/72">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-10 text-center text-white/48" colSpan={columns.length || 1}>
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
