"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTorrents } from "@/hooks/useDebridTorrents";
import { useDeleteDebridTorrent } from "@/hooks/useDeleteDebridTorrent";
import type { TorrentItem } from "@/types/response/torrentsResponse";
import { formatBytes } from "@/utils/formatBytes";

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

type TorrentRowProps = {
  item: TorrentItem;
  isDeleting: boolean;
  onDelete: (id: string) => void;
};

const TorrentRow: React.FC<TorrentRowProps> = ({ item, isDeleting, onDelete }) => {
  const firstLink = item.links[0];

  return (
    <li className="rounded-lg border border-[color:var(--border)] bg-white p-3">
      <p className="truncate text-sm font-medium text-[color:var(--foreground)]">
        {item.filename}
      </p>
      <p className="mt-1 text-xs text-[color:var(--muted)]">
        {formatStatus(item.status)} · {item.progress}% ·{" "}
        {formatBytes(item.bytes, { unknownWhenZero: true })}
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs text-[color:var(--muted)]">
          Added {formatDate(item.added)}
        </span>
        <div className="flex items-center gap-2">
          {firstLink ? (
            <a
              href={firstLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs font-medium text-[color:var(--foreground)] hover:bg-[color:var(--surface-soft)]"
            >
              Open
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            disabled={isDeleting}
            className="rounded-md border border-[#ffd5cc] px-2 py-1 text-xs font-medium text-[#a5402a] hover:bg-[color:var(--accent-coral-soft)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </li>
  );
};

export const DebridTorrents: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTorrents();
  const deleteMutation = useDeleteDebridTorrent();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Torrents
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load torrents.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Torrents
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading torrents...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">Torrents</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const torrents = data ?? [];
  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Torrents
      </h2>
      {deleteMutation.error ? (
        <p className="mt-2 text-xs text-[#a5402a]">{deleteMutation.error.message}</p>
      ) : null}
      {torrents.length === 0 ? (
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          No torrents found.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {torrents.map((item) => (
            <TorrentRow
              key={item.id}
              item={item}
              isDeleting={deletingId === item.id}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
