"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridTrafficDetails } from "@/hooks/useDebridTrafficDetails";
import { Card } from "@/components/ui/Card";
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

const chartColors = {
  area: "var(--color-blue-600)",
  areaActive: "var(--color-blue-800)",
  axis: "var(--color-sky-300)",
  tick: "var(--color-slate-600)",
  label: "var(--color-slate-900)",
  tooltipBackground: "var(--color-white)",
  tooltipBorder: "var(--color-blue-200)",
};

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
      <Card variant="insightFill">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Add a token to load traffic details.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="insightFill">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 rounded-xl border border-dashed border-sky-300 px-4 py-4 text-sm text-slate-600">
          Loading traffic timeline...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="insightFillError">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-coral-700/85">
          Traffic Analytics
        </p>
        <h2 className="mt-2 text-lg font-semibold text-coral-700">
          Traffic - Last 7 Days
        </h2>
        <p className="mt-3 text-sm text-coral-700">{error.message}</p>
      </Card>
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
    <Card variant="insightFill">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Traffic Analytics
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Traffic - Last 7 Days
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Daily transfer volume with rolling week trend insight.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-sage-300 bg-sage-100 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-800/90">
            Total
          </p>
          <p className="mt-1 text-lg font-semibold text-sage-800">
            {bytesToGbLabel(totalBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-ocean-300 bg-ocean-100 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-700/90">
            Daily Avg
          </p>
          <p className="mt-1 text-lg font-semibold text-ocean-700">
            {bytesToGbLabel(averageBytes)}
          </p>
        </div>
        <div className="rounded-xl border border-amber-300 bg-amber-100 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700/90">
            Peak Day
          </p>
          <p className="mt-1 text-lg font-semibold text-amber-700">
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
                <stop offset="5%" stopColor={chartColors.area} stopOpacity={0.48} />
                <stop offset="95%" stopColor={chartColors.area} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke={chartColors.axis} />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: chartColors.tick, fontSize: 12 }}
              axisLine={{ stroke: chartColors.axis }}
              tickLine={{ stroke: chartColors.axis }}
            />
            <YAxis
              tick={{ fill: chartColors.tick, fontSize: 12 }}
              axisLine={{ stroke: chartColors.axis }}
              tickLine={{ stroke: chartColors.axis }}
              tickFormatter={(value: number) => bytesToGbValue(value)}
              label={{
                value: "GB",
                angle: -90,
                position: "insideLeft",
                fill: chartColors.tick,
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => {
                return [bytesToGbLabel(value as number), "Traffic"];
              }}
              labelStyle={{ color: chartColors.label, fontWeight: 600 }}
              contentStyle={{
                backgroundColor: chartColors.tooltipBackground,
                borderColor: chartColors.tooltipBorder,
                borderRadius: "0.9rem",
                boxShadow:
                  "0 20px 28px -24px color-mix(in srgb, var(--color-blue-600) 35%, transparent)",
              }}
            />
            <Area
              type="monotone"
              dataKey="bytes"
              stroke={chartColors.area}
              strokeWidth={2.5}
              fill="url(#trafficAreaFillNeo)"
              dot={{ r: 2.5, fill: chartColors.area }}
              activeDot={{ r: 4.5, fill: chartColors.areaActive }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};



