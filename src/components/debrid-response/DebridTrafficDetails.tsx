"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTrafficDetails } from "@/hooks/useDebridTrafficDetails";
import type { TrafficDetailsResponse } from "@/types/response/trafficDetailsResponse";
import { formatBytes } from "@/utils/formatBytes";

type TimelineItem = {
  dateKey: string;
  dateLabel: string;
  bytes: number;
  hostCount: number;
};

const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTimeline = (
  data: TrafficDetailsResponse | undefined,
): TimelineItem[] => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const dateKey = toLocalDateString(date);
    const dayTraffic = data?.[dateKey];

    return {
      dateKey,
      dateLabel: date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      bytes: dayTraffic?.bytes ?? 0,
      hostCount: Object.keys(dayTraffic?.host ?? {}).length,
    };
  });
};

export const DebridTrafficDetails: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTrafficDetails();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load traffic details.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading traffic timeline...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">
          Taffic - last 7 days
        </h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  const timeline = getTimeline(data);
  const maxBytes = Math.max(...timeline.map((item) => item.bytes), 1);

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        Taffic - last 7 days
      </h2>
      <ul className="mt-3 space-y-3">
        {timeline.map((item) => {
          const percentage = (item.bytes / maxBytes) * 100;
          const width = item.bytes > 0 ? Math.max(percentage, 2) : 0;

          return (
            <li key={item.dateKey}>
              <div className="flex items-center justify-between gap-3 text-xs text-[color:var(--muted)]">
                <span>{item.dateLabel}</span>
                <span>
                  {formatBytes(item.bytes)} ({item.hostCount} hosts)
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-[#a5402a]"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
