"use client";

import { type ReactNode } from "react";

type DangerZoneAPICardProps = {
  title: string;
  hasKey: boolean;
  noKeyMessage: string;
  children: ReactNode;
  actionLabel?: string;
  actionLoadingLabel?: string;
  onAction?: () => void;
  isActionDisabled?: boolean;
  isActionLoading?: boolean;
};

export const DangerZoneAPICard: React.FC<DangerZoneAPICardProps> = ({
  title,
  hasKey,
  noKeyMessage,
  children,
  actionLabel,
  actionLoadingLabel,
  onAction,
  isActionDisabled = false,
  isActionLoading = false,
}) => {
  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{noKeyMessage}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
      <h2 className="text-base font-semibold text-[#a5402a]">{title}</h2>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          disabled={isActionDisabled || isActionLoading}
          className="mt-3 rounded-lg bg-[#a5402a] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isActionLoading ? (actionLoadingLabel ?? actionLabel) : actionLabel}
        </button>
      ) : null}
      {children}
    </section>
  );
};
