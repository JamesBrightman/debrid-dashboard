"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

type DataTableProps<TData extends object> = {
  data: TData[];
  columns: Array<ColumnDef<TData>>;
  emptyText: string;
  page?: number;
  pageSize?: number;
};

export function DataTable<TData extends object>({
  data,
  columns,
  emptyText,
  page = 0,
  pageSize,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // TanStack Table manages row-model helpers internally and is intended for this usage.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: true,
    state: {
      sorting,
    },
  });

  if (data.length === 0) {
    return (
      <p className="mt-4 rounded-xl border border-dashed border-sky-300 px-4 py-5 text-sm text-slate-600">
        {emptyText}
      </p>
    );
  }

  const allRows = table.getRowModel().rows;
  const effectivePageSize = pageSize && pageSize > 0 ? pageSize : allRows.length;
  const totalPages = Math.max(1, Math.ceil(allRows.length / effectivePageSize));
  const currentPage = Math.min(Math.max(0, Math.trunc(page)), totalPages - 1);
  const startIndex = currentPage * effectivePageSize;
  const endIndex = startIndex + effectivePageSize;
  const visibleRows = allRows.slice(startIndex, endIndex);

  return (
    <div className="-mx-1 mt-4 overflow-x-auto px-1">
      <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left text-xs sm:min-w-[560px] sm:text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortState = header.column.getIsSorted();
                const sortLabel =
                  sortState === "asc"
                    ? " ^"
                    : sortState === "desc"
                      ? " v"
                      : "";
                const ariaSort =
                  sortState === "asc"
                    ? "ascending"
                    : sortState === "desc"
                      ? "descending"
                      : "none";
                const headerContent = (
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortLabel}
                  </>
                );

                return (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={canSort ? ariaSort : undefined}
                    className="border-b border-sky-300 bg-ocean-50/70 px-2.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ocean-700 sm:px-4 sm:py-3 sm:text-[11px] sm:tracking-[0.16em]"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none text-left transition-colors hover:text-slate-900"
                      >
                        {headerContent}
                      </button>
                    ) : (
                      headerContent
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {visibleRows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`border-b border-sky-300 ${
                rowIndex % 2 === 0 ? "bg-white/70" : "bg-ocean-50/45"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2.5 py-2.5 align-top text-[12px] sm:px-4 sm:py-3 sm:text-[13px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



