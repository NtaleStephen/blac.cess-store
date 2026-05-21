'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Sellers', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
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
        className="btn btn-sm btn-outline flex items-center gap-2 whitespace-nowrap"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-2 w-52 z-20 rounded-xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(42,42,42,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm transition-colors duration-150"
                style={{
                  color: option.value === value ? '#D4A574' : '#2A2A2A',
                  fontWeight: option.value === value ? 600 : 400,
                  borderBottom: '1px solid rgba(42,42,42,0.06)',
                  background: option.value === value ? 'rgba(212,165,116,0.06)' : 'transparent',
                }}
                onMouseEnter={e => { if (option.value !== value) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(42,42,42,0.03)'; }}
                onMouseLeave={e => { if (option.value !== value) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
