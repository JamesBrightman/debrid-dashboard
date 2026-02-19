"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrentsAvailableHosts } from "@/hooks/useDebridTorrentsAvailableHosts";
import { formatBytes } from "@/utils/formatBytes";

export const DebridTorrentsAvailableHosts: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrentsAvailableHosts();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Torrent Hosts
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load available hosts.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Torrent Hosts
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading available hosts...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">
          Torrent Hosts
        </h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const hosts = data ?? [];

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Torrent Hosts
      </h2>
      {hosts.length === 0 ? (
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          No available hosts found.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {hosts.map((item) => (
            <li
              key={item.host}
              className="flex items-center justify-between rounded-lg border border-[color:var(--border)] bg-white px-3 py-2"
            >
              <span className="text-sm text-[color:var(--foreground)]">
                {item.host}
              </span>
              <span className="text-xs text-[color:var(--muted)]">
                Max split:{" "}
                {formatBytes(item.max_file_size, {
                  unknownWhenZero: true,
                  unknownLabel: "Unknown",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
