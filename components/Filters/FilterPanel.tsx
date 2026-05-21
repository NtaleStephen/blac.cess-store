'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Cream', hex: '#F5F1EB' },
  { name: 'Charcoal', hex: '#2A2A2A' },
  { name: 'Gold', hex: '#D4A574' },
  { name: 'Navy', hex: '#1A1A2E' },
];
const CATEGORIES = [
  { label: 'Crop Tops', value: 'crop-tops' },
  { label: 'Sweatpants', value: 'sweatpants' },
  { label: 'Hoodies', value: 'hoodies' },
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
    <div className="border-b pb-4 mb-4" style={{ borderColor: 'rgba(42,42,42,0.08)' }}>
      <button
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold uppercase" style={{ letterSpacing: '1.5px', fontSize: '11px', color: '#2A2A2A' }}>
          {title}
        </span>
        {open
          ? <ChevronUp size={14} style={{ color: '#D4A574' }} />
          : <ChevronDown size={14} style={{ color: '#D4A574' }} />
        }
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

export default function FilterPanel({ filters, onChange, isMobileOpen = true, onMobileClose }: FilterPanelProps) {
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
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-serif font-semibold" style={{ fontSize: '16px', color: '#2A2A2A' }}>
            Filter
          </h3>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs mt-0.5 hover:underline"
              style={{ color: '#D4A574' }}
            >
              Clear all ({activeCount})
            </button>
          )}
        </div>
        {onMobileClose && (
          <button
            className="btn-icon lg:hidden"
            onClick={onMobileClose}
            aria-label="Close filters"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-2.5">
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
                  className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  style={{
                    background: checked ? '#D4A574' : '#FFFFFF',
                    border: `1.5px solid ${checked ? '#D4A574' : 'rgba(42,42,42,0.2)'}`,
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
                  className="text-sm transition-colors duration-200 group-hover:text-brand-gold"
                  style={{ color: checked ? '#D4A574' : '#2A2A2A' }}
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
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  background: active ? '#2A2A2A' : '#FFFFFF',
                  border: `1.5px solid ${active ? '#2A2A2A' : 'rgba(42,42,42,0.15)'}`,
                  color: active ? '#FFFFFF' : '#2A2A2A',
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
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: color.hex,
                  border: active ? '2px solid #D4A574' : '2px solid rgba(42,42,42,0.15)',
                  boxShadow: active ? '0 0 0 3px rgba(212,165,116,0.25)' : 'none',
                  transform: active ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(42,42,42,0.6)' }}>
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
            style={{ accentColor: '#D4A574' }}
            aria-label="Maximum price"
          />
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden lg:block rounded-xl sticky top-24 overflow-y-auto"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(42,42,42,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
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
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 lg:hidden overflow-y-auto transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 'min(320px, 90vw)',
          background: '#FFFFFF',
          borderRight: '1px solid rgba(42,42,42,0.08)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        }}
      >
        {content}
      </div>
    </>
  );
}
