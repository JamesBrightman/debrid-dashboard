"use client";

import { useServerTime } from "@/hooks/useServerTime";

export const DebridServerTime: React.FC = () => {
  const { data: serverTime, isLoading, error } = useServerTime();

  const date = serverTime ? new Date(serverTime) : null;
  const hasValidData = Boolean(date && !Number.isNaN(date.getTime()));
  const formatted = hasValidData && date ? date.toLocaleString() : "-";

  const statusText = isLoading
    ? "Server time..."
    : error
      ? "Server time: unavailable"
      : formatted;
  const statusColorClass = isLoading
    ? "bg-yellow-400"
    : error
      ? "bg-red-500"
      : "bg-green-500";

  return (
    <div className="hidden items-center gap-2 self-center text-xs md:flex">
      <span
        aria-hidden="true"
        className={`block h-3.75 w-3.75 rounded-full animate-pulse ${statusColorClass}`}
      />
      <p>{statusText}</p>
    </div>
  );
};
