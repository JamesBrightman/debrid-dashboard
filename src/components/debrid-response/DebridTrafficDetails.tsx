"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTrafficDetails } from "@/hooks/useDebridTrafficDetails";
import type { TrafficDetailsResponse } from "@/types/response/trafficDetailsResponse";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimelineItem = {
  dateKey: string;
  dateLabel: string;
  bytes: number;
};

const panelClassName =
  "flex h-full w-full flex-col rounded-[1.4rem] border border-[#e9f0ff] bg-[linear-gradient(145deg,#ffffff,#ebf3ff)] p-5 shadow-[0_22px_34px_-30px_rgba(72,105,203,0.42),0_1px_0_rgba(255,255,255,0.95)_inset]";

const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const bytesToGbValue = (bytes: number): string => {
  const gb = bytes / 1024 ** 3;

  if (gb === 0) {
    return "0";
  }

  if (gb >= 100) {
    return Math.round(gb).toString();
  }

  return Number(gb.toFixed(2)).toString();
};

const bytesToGbLabel = (bytes: number): string => `${bytesToGbValue(bytes)} GB`;

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
    };
  });
};

export const DebridTrafficDetails: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridTrafficDetails();

  if (!hasKey) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Add a token to load traffic details.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={panelClassName}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
          Loading traffic timeline...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-full w-full flex-col rounded-[1.4rem] border border-[#f5c5b3] bg-[linear-gradient(145deg,#fff9f5,#ffece2)] p-5 shadow-[0_20px_30px_-30px_rgba(186,88,54,0.55),0_1px_0_rgba(255,255,255,0.95)_inset]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b25533]/85">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-[#b25533]">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 text-sm text-[#b25533]">{error.message}</p>
      </section>
    );
  }

  const timeline = getTimeline(data);
  const totalBytes = timeline.reduce((sum, day) => sum + day.bytes, 0);
  const averageBytes = totalBytes / Math.max(1, timeline.length);
  const peakDay = timeline.reduce(
    (currentPeak, day) => (day.bytes > currentPeak.bytes ? day : currentPeak),
    timeline[0],
  );

  return (
    <section className={panelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Traffic Analytics
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
            Traffic - Last 7 Days
          </h2>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Daily transfer volume with rolling week trend insight.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-[#a8d39f] bg-[#e4f9de] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f6f36]/90">
            Total
          </p>
          <p className="mt-1 text-lg font-semibold text-[#2f6f36]">
            {bytesToGbLabel(totalBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-[#98b7f0] bg-[#d9e8ff] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#365fa8]/90">
            Daily Avg
          </p>
          <p className="mt-1 text-lg font-semibold text-[#365fa8]">
            {bytesToGbLabel(averageBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-[#f0cf79] bg-[#fff0c8] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b6a00]/90">
            Peak Day
          </p>
          <p className="mt-1 text-lg font-semibold text-[#9b6a00]">
            {peakDay.dateLabel}
          </p>
        </div>
      </div>

      <div className="mt-4 h-72 w-full lg:h-auto lg:min-h-[18rem] lg:flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timeline}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trafficAreaFillNeo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4b6fd1" stopOpacity={0.48} />
                <stop offset="95%" stopColor="#4b6fd1" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#c8d3e4" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "#4b5563", fontSize: 12 }}
              axisLine={{ stroke: "#c8d3e4" }}
              tickLine={{ stroke: "#c8d3e4" }}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              axisLine={{ stroke: "#c8d3e4" }}
              tickLine={{ stroke: "#c8d3e4" }}
              tickFormatter={(value: number) => bytesToGbValue(value)}
              label={{
                value: "GB",
                angle: -90,
                position: "insideLeft",
                fill: "#4b5563",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => {
                return [bytesToGbLabel(value as number), "Traffic"];
              }}
              labelStyle={{ color: "#111827", fontWeight: 600 }}
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.98)",
                borderColor: "#b8c9e8",
                borderRadius: "0.9rem",
                boxShadow: "0 20px 28px -24px rgba(72,105,203,0.35)",
              }}
            />
            <Area
              type="monotone"
              dataKey="bytes"
              stroke="#4b6fd1"
              strokeWidth={2.5}
              fill="url(#trafficAreaFillNeo)"
              dot={{ r: 2.5, fill: "#4b6fd1" }}
              activeDot={{ r: 4.5, fill: "#2f56bf" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};


