"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrents } from "@/hooks/useDebridTorrents";
import { useDeleteDebridTorrent } from "@/hooks/useDeleteDebridTorrent";
import { Card } from "@/components/ui/Card";
import type { TorrentItem } from "@/types/response/torrentsResponse";
import { formatBytes } from "@/utils/formatBytes";

const PAGE_SIZE = 20;

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

const formatStatus = (status: string): string =>
  status
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

export const DebridTorrents: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrents();
  const [page, setPage] = useState(0);
  const deleteMutation = useDeleteDebridTorrent();
  const torrents = data ?? [];
  const totalPages = Math.max(1, Math.ceil(torrents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;
  const columns = useMemo<Array<ColumnDef<TorrentItem>>>(
    () => [
      {
        header: "Name",
        accessorKey: "filename",
        cell: ({ row }) => (
          <span
            className="block w-[8.5rem] whitespace-normal break-words leading-5 sm:w-[13rem] lg:w-[18rem]"
            title={row.original.filename}
          >
            {row.original.filename}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => formatStatus(row.original.status),
      },
      {
        header: "Progress",
        accessorKey: "progress",
        cell: ({ row }) => `${row.original.progress}%`,
      },
      {
        header: "Size",
        accessorKey: "bytes",
        cell: ({ row }) => formatBytes(row.original.bytes, { unknownWhenZero: true }),
      },
      {
        header: "Added",
        accessorKey: "added",
        cell: ({ row }) => formatDate(row.original.added),
      },
      {
        id: "open",
        header: "Open",
        enableSorting: false,
        cell: ({ row }) => {
          const firstLink = row.original.links[0];

          return (
            firstLink ? (
              <a
                href={firstLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-sky-300 px-2.5 py-1.5 text-xs font-medium text-slate-900 hover:bg-sky-50"
              >
                Open
              </a>
            ) : (
              <span className="text-xs text-slate-600">N/A</span>
            )
          );
        },
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
          Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load torrents.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading torrents...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="error">
        <h2 className="text-base font-semibold text-coral-800">Torrents</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <h2 className="text-base font-semibold text-slate-900">
        Torrents
      </h2>
      {deleteMutation.error ? (
        <p className="mt-2 text-xs text-coral-800">{deleteMutation.error.message}</p>
      ) : null}
      <DataTable
        data={torrents}
        columns={columns}
        emptyText="No torrents found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />
      {torrents.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-600">
            Total rows: {torrents.length}
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

