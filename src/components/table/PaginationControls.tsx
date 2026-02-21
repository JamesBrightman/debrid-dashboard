"use client";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const buttonClassName =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-ocean-300 bg-gradient-to-br from-ocean-50 to-ocean-100 px-2.5 text-xs font-semibold text-ocean-800 shadow-sm shadow-ocean-300/40 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45";
  const canPrevious = page > 0;
  const canNext = page < totalPages - 1;
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
      <button
        type="button"
        aria-label="First page"
        onClick={() => onPageChange(0)}
        disabled={!canPrevious}
        className={buttonClassName}
      >
        {"<<"}
      </button>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrevious}
        className={buttonClassName}
      >
        {"<"}
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        className={buttonClassName}
      >
        {">"}
      </button>
      <button
        type="button"
        aria-label="Last page"
        onClick={() => onPageChange(safeTotalPages - 1)}
        disabled={!canNext}
        className={buttonClassName}
      >
        {">>"}
      </button>

      <span className="w-full rounded-full border border-ocean-300 bg-ocean-100 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-ocean-800 sm:ml-1 sm:w-auto sm:text-left">
        Page {page + 1} of {safeTotalPages}
      </span>
    </div>
  );
};

