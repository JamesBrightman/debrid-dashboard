"use client";

import { type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h3
          id="modal-title"
          className="text-base font-semibold text-[color:var(--foreground)]"
        >
          {title}
        </h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};
