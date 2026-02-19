"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrentsActiveCount } from "@/hooks/useDebridTorrentsActiveCount";

export const DebridTorrentsActiveCount: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrentsActiveCount();
  console.log(data);

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load active torrent count.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading active torrent count...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">
          Active Torrents
        </h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const active = data?.nb ?? 0;
  const limit = data?.limit ?? 0;
  const percentage = limit > 0 ? Math.min(100, (active / limit) * 100) : 0;

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Active Torrents
      </h2>
      <p className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
        {active} / {limit}
      </p>
      <div className="mt-3 h-2 rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-[#a5402a]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};
