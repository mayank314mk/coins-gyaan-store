"use client";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 sm:gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="h-9 rounded-full border border-gray-200 px-3 text-xs font-semibold text-brand-strong transition-colors hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-brand-strong sm:h-10 sm:px-4 sm:text-sm"
      >
        Previous
      </button>
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold transition-colors sm:h-10 sm:w-10 sm:text-sm ${
              p === page
                ? "bg-brand text-white"
                : "text-brand-strong hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="h-9 rounded-full border border-gray-200 px-3 text-xs font-semibold text-brand-strong transition-colors hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-brand-strong sm:h-10 sm:px-4 sm:text-sm"
      >
        Next
      </button>
    </nav>
  );
}
