"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDeleteDebridDownload } from "@/hooks/useDeleteDebridDownload";
import { useDebridDownloads } from "@/hooks/useDebridDownloads";
import type { DownloadItem } from "@/types/response/downloadsResponse";

const formatBytes = (bytes: number): string => {
  if (bytes <= 0) {
    return "Unknown size";
  }

  if (bytes >= 1024 ** 3) {
    return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  }

  if (bytes >= 1024 ** 2) {
    return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${bytes} B`;
};

const formatGeneratedDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

type DownloadRowProps = {
  item: DownloadItem;
  isDeleting: boolean;
  onDelete: (id: string) => void;
};

const DownloadRow: React.FC<DownloadRowProps> = ({
  item,
  isDeleting,
  onDelete,
}) => {
  return (
    <li className="rounded-lg border border-[color:var(--border)] bg-white p-3">
      <p className="truncate text-sm font-medium text-[color:var(--foreground)]">
        {item.filename}
      </p>
      <p className="mt-1 text-xs text-[color:var(--muted)]">
        {formatBytes(item.filesize)}
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs text-[color:var(--muted)]">
          {formatGeneratedDate(item.generated)}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={item.download}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs font-medium text-[color:var(--foreground)] hover:bg-[color:var(--surface-soft)]"
          >
            Download
          </a>
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

export const DebridDownloads: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridDownloads();
  const deleteMutation = useDeleteDebridDownload();

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

  const downloads = data ?? [];
  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Downloads
      </h2>
      {deleteMutation.error ? (
        <p className="mt-2 text-xs text-[#a5402a]">{deleteMutation.error.message}</p>
      ) : null}
      {downloads.length === 0 ? (
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          No downloads found.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {downloads.map((item) => (
            <DownloadRow
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
