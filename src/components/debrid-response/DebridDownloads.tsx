"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDeleteDebridDownload } from "@/hooks/useDeleteDebridDownload";
import { useDebridDownloads } from "@/hooks/useDebridDownloads";
import type { DownloadItem } from "@/types/response/downloadsResponse";
import { formatBytes } from "@/utils/formatBytes";

const PAGE_SIZE = 20;

const formatGeneratedDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

export const DebridDownloads: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridDownloads();
  const [page, setPage] = useState(0);
  const deleteMutation = useDeleteDebridDownload();
  const downloads = data ?? [];
  const totalPages = Math.max(1, Math.ceil(downloads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;
  const columns = useMemo<Array<ColumnDef<DownloadItem>>>(
    () => [
      {
        header: "Filename",
        accessorKey: "filename",
        cell: ({ row }) => (
          <span className="block max-w-[18rem] truncate">
            {row.original.filename}
          </span>
        ),
      },
      {
        header: "Size",
        accessorKey: "filesize",
        cell: ({ row }) => formatBytes(row.original.filesize, { unknownWhenZero: true }),
      },
      {
        header: "Generated",
        accessorKey: "generated",
        cell: ({ row }) => formatGeneratedDate(row.original.generated),
      },
      {
        id: "download",
        header: "Download",
        enableSorting: false,
        cell: ({ row }) => (
          <a
            href={row.original.download}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs font-medium text-[color:var(--foreground)] hover:bg-[color:var(--surface-soft)]"
          >
            Download
          </a>
        ),
      },
      {
        id: "delete",
        header: "Delete",
        enableSorting: false,
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => deleteMutation.mutate(row.original.id)}
            disabled={deletingId === row.original.id}
            className="rounded-md border border-[#ffd5cc] px-2 py-1 text-xs font-medium text-[#a5402a] hover:bg-[color:var(--accent-coral-soft)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingId === row.original.id ? "Deleting..." : "Delete"}
          </button>
        ),
      },
    ],
    [deleteMutation, deletingId],
  );

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Downloads
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load downloads.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Downloads
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading downloads...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">Downloads</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Downloads
      </h2>
      {deleteMutation.error ? (
        <p className="mt-2 text-xs text-[#a5402a]">{deleteMutation.error.message}</p>
      ) : null}
      <DataTable
        data={downloads}
        columns={columns}
        emptyText="No downloads found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />
      {downloads.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
            Total rows: {downloads.length}
          </p>
          <PaginationControls
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(nextPage) =>
              setPage(Math.min(Math.max(0, nextPage), totalPages - 1))
            }
          />
        </>
      ) : null}
    </section>
  );
};


