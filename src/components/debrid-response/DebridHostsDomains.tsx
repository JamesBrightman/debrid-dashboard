"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebridHostsDomains } from "@/hooks/useDebridHostsDomains";
import { DataTable } from "@/components/table/DataTable";
import { PaginationControls } from "@/components/table/PaginationControls";
import { Card } from "@/components/ui/Card";

const PAGE_SIZE = 20;

type HostDomainRow = {
  domain: string;
};

export const DebridHostsDomains: React.FC = () => {
  const { data, isLoading, error } = useDebridHostsDomains();
  const [page, setPage] = useState(0);
  const domains = useMemo(
    () => [...(data ?? [])].sort((a, b) => a.localeCompare(b)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(domains.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const domainRows = useMemo<Array<HostDomainRow>>(
    () => domains.map((domain) => ({ domain })),
    [domains],
  );
  const columns = useMemo<Array<ColumnDef<HostDomainRow>>>(
    () => [
      {
        header: "Domain",
        accessorKey: "domain",
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <Card variant="insight">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Network
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Host Domains
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Loading domains...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="insightError">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-coral-700/85">
          Network
        </p>
        <h2 className="mt-2 text-lg font-semibold text-coral-700">Host Domains</h2>
        <p className="mt-3 text-sm text-coral-700">{error.message}</p>
      </Card>
    );
  }

  return (
    <Card variant="insight">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Network
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Host Domains
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Domain-level endpoints available in the network.
          </p>
        </div>
        <span className="rounded-full border border-ocean-200 bg-ocean-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-800">
          {domains.length} domains
        </span>
      </div>

      <DataTable
        data={domainRows}
        columns={columns}
        emptyText="No domains found."
        page={currentPage}
        pageSize={PAGE_SIZE}
      />

      {domains.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-600">
            Total rows: {domains.length}
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



