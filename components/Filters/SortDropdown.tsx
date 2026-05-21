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
        className="glass-btn flex items-center gap-2 whitespace-nowrap"
        style={{ fontSize: '13px', padding: '10px 16px' }}
        onClick={() => setOpen(!open)}
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
              background: 'rgba(245,241,235,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,165,116,0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm transition-colors duration-150 hover:bg-brand-gold/10"
                style={{
                  color: option.value === value ? '#D4A574' : '#2A2A2A',
                  fontWeight: option.value === value ? 600 : 400,
                  borderBottom: '1px solid rgba(212,165,116,0.08)',
                }}
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
