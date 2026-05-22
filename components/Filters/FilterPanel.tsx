'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black',    hex: '#000000' },
  { name: 'Cream',    hex: '#F6F2EC' },
  { name: 'Charcoal', hex: '#2A2A2A' },
  { name: 'Gold',     hex: '#B8956A' },
  { name: 'Navy',     hex: '#1A1A2E' },
];
const CATEGORIES = [
  { label: 'Crop Tops',  value: 'crop-tops' },
  { label: 'Sweatpants', value: 'sweatpants' },
  { label: 'Hoodies',    value: 'hoodies' },
];

interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[var(--color-divider)] pb-5 mb-5 last:border-b-0">
      <button
        className="flex items-center justify-between w-full mb-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold uppercase tracking-[1.5px] text-[11px] text-[var(--color-ink)]">
          {title}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterPanel({
  filters,
  onChange,
  isMobileOpen = true,
  onMobileClose,
}: FilterPanelProps) {
  const toggle = (key: 'categories' | 'sizes' | 'colors', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const clearAll = () => {
    onChange({ categories: [], sizes: [], colors: [], priceMin: 0, priceMax: 500 });
  };

  const activeCount = filters.categories.length + filters.sizes.length + filters.colors.length;

  const content = (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="heading-md">Filter</h3>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-[12px] mt-1 hover:underline text-[var(--color-accent)] uppercase tracking-[1px]"
            >
              Clear ({activeCount})
            </button>
          )}
        </div>
        {onMobileClose && (
          <button
            className="icon-btn lg:hidden"
            onClick={onMobileClose}
            aria-label="Close filters"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const checked = filters.categories.includes(cat.value);
            return (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle('categories', cat.value)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: checked ? 'var(--color-ink)' : 'var(--color-surface)',
                    border: `1px solid ${checked ? 'var(--color-ink)' : 'var(--color-divider-strong)'}`,
                  }}
                  aria-hidden="true"
                >
                  {checked && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[13px] transition-colors group-hover:text-[var(--color-accent)]"
                  style={{ color: checked ? 'var(--color-ink)' : 'var(--color-ink-soft)', fontWeight: checked ? 600 : 400 }}
                >
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggle('sizes', size)}
                className="w-10 h-10 text-[11px] font-semibold transition-all"
                style={{
                  background: active ? 'var(--color-ink)' : 'var(--color-surface)',
                  border: `1px solid ${active ? 'var(--color-ink)' : 'var(--color-divider-strong)'}`,
                  color: active ? '#FFFFFF' : 'var(--color-ink)',
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => {
            const active = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggle('colors', color.name)}
                aria-label={color.name}
                aria-pressed={active}
                title={color.name}
                className="rounded-full transition-transform"
                style={{
                  width: 24,
                  height: 24,
                  background: color.hex,
                  border: active
                    ? '1.5px solid var(--color-ink)'
                    : '1px solid var(--color-divider-strong)',
                  outline: active ? '2px solid var(--color-paper)' : 'none',
                  outlineOffset: -4,
                  transform: active ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px] text-[var(--color-ink-muted)]">
            <span>${filters.priceMin}</span>
            <span>${filters.priceMax}</span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full"
            style={{ accentColor: 'var(--color-ink)' }}
            aria-label="Maximum price"
          />
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto border border-[var(--color-divider)] bg-[var(--color-surface)]">
        {content}
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 lg:hidden overflow-y-auto bg-[var(--color-surface)] border-r border-[var(--color-divider)] transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 'min(340px, 90vw)' }}
      >
        {content}
      </div>
    </>
  );
}
