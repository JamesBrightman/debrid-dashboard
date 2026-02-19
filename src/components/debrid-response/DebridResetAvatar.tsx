"use client";

import { useState } from "react";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDeleteDebridAvatar } from "@/hooks/useDeleteDebridAvatar";
import { DangerZoneAPICard } from "@/components/danger-zone/DangerZoneAPICard";
import { ManualApprovalModal } from "@/components/modal/ManualApprovalModal";

export const DebridResetAvatar: React.FC = () => {
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const { hasKey } = useDebridApiKey();
  const { error, isPending, isSuccess, mutate, reset } = useDeleteDebridAvatar();

  const handleApprove = () => {
    setIsApprovalOpen(false);
    mutate();
  };

  return (
    <DangerZoneAPICard
      title="Reset Avatar"
      hasKey={hasKey}
      noKeyMessage="Add a token to enable this action."
      actionLabel="Reset avatar"
      actionLoadingLabel="Resetting..."
      onAction={() => {
        reset();
        setIsApprovalOpen(true);
      }}
      isActionDisabled={isPending}
      isActionLoading={isPending}
    >
      <ManualApprovalModal
        isOpen={isApprovalOpen}
        isLoading={isPending}
        onCancel={() => setIsApprovalOpen(false)}
        onApprove={handleApprove}
      />
      {error ? <p className="mt-3 text-sm text-[#a5402a]">{error.message}</p> : null}
      {isSuccess ? (
        <p className="mt-3 text-sm text-[#a5402a]">
          Avatar reset to default.
        </p>
      ) : null}
    </DangerZoneAPICard>
  );
};
