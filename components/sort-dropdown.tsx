"use client";

import { sortOptions, type SortOption } from "../lib/products";

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <label className="flex shrink-0 items-center gap-2 text-xs font-medium text-brand-strong sm:text-sm">
      <span className="hidden sm:inline">Sort by</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="h-9 appearance-none rounded-full border border-gray-200 bg-white pl-3 pr-8 text-xs font-semibold text-brand-strong outline-none transition-colors hover:border-accent/60 focus:border-accent focus:ring-2 focus:ring-accent/10 sm:h-10 sm:text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
      </div>
    </label>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
