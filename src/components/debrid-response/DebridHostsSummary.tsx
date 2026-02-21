"use client";

import { useMemo } from "react";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridHostsStatus } from "@/hooks/useDebridHostsStatus";
import { HostStatusSummaryCards } from "@/components/debrid-response/HostStatusSummaryCards";
import { Card } from "@/components/ui/Card";

export const DebridHostsSummary: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridHostsStatus();

  const { upCount, downCount, unsupportedCount } = useMemo(() => {
    const statusItems = Object.values(data ?? {});

    return {
      upCount: statusItems.filter((entry) => entry.status === "up").length,
      downCount: statusItems.filter((entry) => entry.status === "down").length,
      unsupportedCount: statusItems.filter(
        (entry) => entry.status === "unsupported",
      ).length,
    };
  }, [data]);

  if (!hasKey) {
    return (
      <Card variant="dashed">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load host status.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading host status...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="error">
        <h2 className="text-base font-semibold text-coral-800">Hosts</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </Card>
    );
  }

  if (Object.keys(data ?? {}).length === 0) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          Host health
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          No host status found.
        </p>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <h2 className="text-base font-semibold text-slate-900">
        Host health
      </h2>
      <HostStatusSummaryCards
        upCount={upCount}
        downCount={downCount}
        unsupportedCount={unsupportedCount}
        className="mt-3"
      />
    </Card>
  );
};

