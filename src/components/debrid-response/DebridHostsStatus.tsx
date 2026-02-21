"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridHostsStatus } from "@/hooks/useDebridHostsStatus";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { HostStatusSummaryCards } from "@/components/debrid-response/HostStatusSummaryCards";
import { Card } from "@/components/ui/Card";

const PAGE_SIZE = 20;

type HostStatusRowData = {
  domain: string;
  name: string;
  status: string;
  supported: number;
};

const getStatusClass = (status: string): string => {
  if (status === "up") {
    return "bg-sage-100 text-sage-800 ring-1 ring-sage-300";
  }

  if (status === "down") {
    return "bg-coral-100 text-coral-700 ring-1 ring-coral-300";
  }

  return "bg-amber-100 text-amber-700 ring-1 ring-amber-300";
};

const getSupportedClass = (supported: number): string => {
  if (supported === 1) {
    return "bg-ocean-100 text-ocean-800 ring-1 ring-ocean-300";
  }

  return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
};

export const DebridHostsStatus: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridHostsStatus();
  const [page, setPage] = useState(0);
  const hosts = useMemo<Array<HostStatusRowData>>(
    () =>
      Object.entries(data ?? {})
        .map(([domain, item]) => ({
          domain,
          name: item.name,
          status: item.status,
          supported: item.supported,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(hosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const columns = useMemo<Array<ColumnDef<HostStatusRowData>>>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Domain",
        accessorKey: "domain",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`inline-flex min-w-20 justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusClass(row.original.status)}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Supported",
        accessorKey: "supported",
        cell: ({ row }) => (
          <span
            className={`inline-flex min-w-24 justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getSupportedClass(row.original.supported)}`}
          >
            {row.original.supported === 1 ? "supported" : "unsupported"}
          </span>
        ),
      },
    ],
    [],
  );

  if (!hasKey) {
    return (
      <Card variant="insight">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Host Status
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Add a token to load host status.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="insight">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Host Status
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Loading host status...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="insightError">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-coral-700/85">
          Runtime
        </p>
        <h2 className="mt-2 text-lg font-semibold text-coral-700">
          Host Status
        </h2>
        <p className="mt-3 text-sm text-coral-700">{error.message}</p>
      </Card>
    );
  }

  const upCount = hosts.filter((entry) => entry.status === "up").length;
  const downCount = hosts.filter((entry) => entry.status === "down").length;
  const unsupportedCount = hosts.filter(
    (entry) => entry.status === "unsupported",
  ).length;

  return (
    <Card variant="insight">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Runtime
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Host Status
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Real-time operational and support availability by host.
          </p>
        </div>
        <span className="rounded-full border border-ocean-200 bg-ocean-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-800">
          {hosts.length} hosts
        </span>
      </div>

      <HostStatusSummaryCards
        upCount={upCount}
        downCount={downCount}
        unsupportedCount={unsupportedCount}
        className="mt-4"
      />

      {hosts.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-sky-300 px-4 py-5 text-sm text-slate-600">
          No host status found.
        </p>
      ) : (
        <DataTable
          data={hosts}
          columns={columns}
          emptyText="No host status found."
          page={currentPage}
          pageSize={PAGE_SIZE}
        />
      )}

      {hosts.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-600">
            Total rows: {hosts.length}
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
