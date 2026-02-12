"use client";

import { Modal } from "@/components/modal/modal";

type ManualApprovalModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onApprove: () => void;
};

export const ManualApprovalModal: React.FC<ManualApprovalModalProps> = ({
  isOpen,
  isLoading = false,
  onCancel,
  onApprove,
}) => {
  return (
    <Modal isOpen={isOpen} title="Manual Approval Required" onClose={onCancel}>
      <p className="text-sm text-[color:var(--muted)]">
        Are you sure? This action cannot be reversed.
      </p>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={isLoading}
          className="rounded-lg bg-[#a5402a] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};
