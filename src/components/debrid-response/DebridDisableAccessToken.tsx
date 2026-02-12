"use client";

import { useState } from "react";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDisableAccessToken } from "@/hooks/useDisableAccessToken";
import { DangerZoneAPICard } from "@/components/danger-zone/DangerZoneAPICard";
import { ManualApprovalModal } from "@/components/modal/ManualApprovalModal";

export const DebridDisableAccessToken: React.FC = () => {
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const { hasKey } = useDebridApiKey();
  const { data, error, isPending, isSuccess, mutate } = useDisableAccessToken();

  const handleApprove = () => {
    setIsApprovalOpen(false);
    mutate();
  };

  return (
    <DangerZoneAPICard
      title="Disable Access Token"
      hasKey={hasKey}
      noKeyMessage="Add a token to enable this action."
      actionLabel="Disable access token"
      actionLoadingLabel="Disabling..."
      onAction={() => setIsApprovalOpen(true)}
      isActionDisabled={isPending}
      isActionLoading={isPending}
    >
      <ManualApprovalModal
        isOpen={isApprovalOpen}
        isLoading={isPending}
        onCancel={() => setIsApprovalOpen(false)}
        onApprove={handleApprove}
      />
      {error ? (
        <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p>
      ) : null}
      {isSuccess ? (
        <p className="mt-3 text-sm text-[#a5402a]">
          {data?.trim() ? data : "Access token disabled."}
        </p>
      ) : null}
    </DangerZoneAPICard>
  );
};
