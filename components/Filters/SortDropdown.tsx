'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest First',         value: 'newest' },
  { label: 'Price: Low to High',   value: 'price-asc' },
  { label: 'Price: High to Low',   value: 'price-desc' },
  { label: 'Best Sellers',         value: 'popular' },
  { label: 'Highest Rated',        value: 'rating' },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-2 px-4 h-10 border border-[var(--color-divider-strong)] text-[11px] uppercase tracking-[1.5px] font-semibold text-[var(--color-ink)] hover:bg-[var(--color-paper-soft)] transition-colors whitespace-nowrap"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>Sort: {selected.label}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-2 w-56 z-20 bg-[var(--color-surface)] border border-[var(--color-divider)]"
            style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  onClick={() => { onChange(option.value); setOpen(false); }}
                  className="w-full text-left px-4 py-3 text-[13px] transition-colors border-b border-[var(--color-divider)] last:border-b-0 hover:bg-[var(--color-paper-soft)]"
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-ink)',
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
