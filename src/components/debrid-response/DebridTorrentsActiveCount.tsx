"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrentsActiveCount } from "@/hooks/useDebridTorrentsActiveCount";
import { Card } from "@/components/ui/Card";

export const DebridTorrentsActiveCount: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrentsActiveCount();

  if (!hasKey) {
    return (
      <Card variant="dashed">
        <h2 className="text-base font-semibold text-slate-900">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load active torrent count.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading active torrent count...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="error">
        <h2 className="text-base font-semibold text-coral-800">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </Card>
    );
  }

  const active = data?.nb ?? 0;
  const limit = data?.limit ?? 0;
  const percentage = limit > 0 ? Math.min(100, (active / limit) * 100) : 0;

  return (
    <Card variant="default">
      <h2 className="text-base font-semibold text-slate-900">
        Active Torrents
      </h2>
      <p className="mt-3 text-2xl font-semibold text-slate-900">
        {active} / {limit}
      </p>
      <div className="mt-3 h-2 rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-coral-800"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
};



