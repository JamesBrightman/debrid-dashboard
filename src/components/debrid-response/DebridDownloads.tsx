"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDeleteDebridDownload } from "@/hooks/useDeleteDebridDownload";
import { useDebridDownloads } from "@/hooks/useDebridDownloads";
import { Card } from "@/components/ui/Card";
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
          <span
            className="block max-w-[8.5rem] whitespace-normal break-all leading-5 sm:max-w-[13rem] lg:max-w-[18rem]"
            title={row.original.filename}
          >
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
            className="rounded-md border border-sky-300 px-2.5 py-1.5 text-xs font-medium text-slate-900 hover:bg-sky-50"
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
            className="rounded-md border border-coral-200 px-2.5 py-1.5 text-xs font-medium text-coral-800 hover:bg-coral-50 disabled:cursor-not-allowed disabled:opacity-60"
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
      <Card variant="dashed">
        <h2 className="text-base font-semibold text-slate-900">
          Downloads
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load downloads.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          Downloads
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading downloads...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="error">
        <h2 className="text-base font-semibold text-coral-800">Downloads</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <h2 className="text-base font-semibold text-slate-900">
        Downloads
      </h2>
      {deleteMutation.error ? (
        <p className="mt-2 text-xs text-coral-800">{deleteMutation.error.message}</p>
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
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-600">
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
    </Card>
  );
};



