"use client";

import { type ReactNode } from "react";
import { Card } from "@/components/ui/Card";

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
      <Card variant="dashed">
        <h2 className="text-base font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{noKeyMessage}</p>
      </Card>
    );
  }

  return (
    <section className="w-full rounded-xl border border-coral-300 bg-white/90 p-4 shadow-sm shadow-coral-400/20">
      <h2 className="text-base font-semibold text-coral-800">{title}</h2>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          disabled={isActionDisabled || isActionLoading}
          className="mt-3 rounded-lg bg-coral-800 px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isActionLoading ? (actionLoadingLabel ?? actionLabel) : actionLabel}
        </button>
      ) : null}
      {children}
    </section>
  );
};



