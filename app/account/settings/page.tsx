'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, Plus, Trash2, MapPin } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ background: checked ? 'var(--color-ink)' : 'var(--color-divider-strong)' }}
      aria-label={label}
      role="switch"
      aria-checked={checked}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

const SAVED_ADDRESSES = [
  { id: '1', label: 'Home', street: '123 Crown Street, Apt 4B', city: 'New York, NY 10001', country: 'United States', isDefault: true  },
  { id: '2', label: 'Work', street: '456 Heritage Ave',          city: 'Brooklyn, NY 11201',  country: 'United States', isDefault: false },
];

export default function SettingsPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [saved, setSaved]             = useState(false);
  const [toggles, setToggles] = useState({
    newsletter: true,
    marketing:  false,
    orders:     true,
    twoFactor:  false,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <header className="mb-8">
        <h2 className="heading-lg">Settings</h2>
        <p className="body-sm mt-2">Manage security, notifications, and saved addresses.</p>
      </header>

      <div className="space-y-6">
        {/* Security */}
        <section className="card-static p-7">
          <h3 className="heading-md mb-6">Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="sm:col-span-2">
              <label className="input-label">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className="input pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="input-label">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="New password"
                  className="input pr-12"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="input-label">Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" className="input" autoComplete="new-password" />
            </div>
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between p-5 bg-[var(--color-paper-soft)] border border-[var(--color-divider)]">
            <div>
              <p className="font-medium text-[14px] text-[var(--color-ink)]">Two-Factor Authentication</p>
              <p className="text-[12px] mt-1 text-[var(--color-ink-muted)]">
                Add an extra layer of security to your account
              </p>
            </div>
            <Toggle checked={toggles.twoFactor} onChange={() => toggle('twoFactor')} label="Two-factor authentication" />
          </div>
        </section>

        {/* Notifications */}
        <section className="card-static p-7">
          <h3 className="heading-md mb-6">Notifications</h3>
          <div className="divide-y divide-[var(--color-divider)]">
            {[
              { key: 'newsletter' as const, label: 'Newsletter',      desc: 'New collections, drops, cultural stories' },
              { key: 'marketing'  as const, label: 'Marketing Emails', desc: 'Promotions, discounts, special offers'    },
              { key: 'orders'     as const, label: 'Order Updates',    desc: 'Shipping confirmations, delivery notifications' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium text-[14px] text-[var(--color-ink)]">{label}</p>
                  <p className="text-[12px] mt-1 text-[var(--color-ink-muted)]">{desc}</p>
                </div>
                <Toggle checked={toggles[key]} onChange={() => toggle(key)} label={label} />
              </div>
            ))}
          </div>
        </section>

        {/* Saved Addresses */}
        <section className="card-static p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-md">Saved Addresses</h3>
            <button className="btn btn-outline btn-sm">
              <Plus size={13} />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {SAVED_ADDRESSES.map((addr) => (
              <article
                key={addr.id}
                className="flex items-start gap-4 p-5 border"
                style={{
                  background: addr.isDefault ? 'var(--color-accent-soft)' : 'var(--color-paper-soft)',
                  borderColor: addr.isDefault ? 'var(--color-accent)' : 'var(--color-divider)',
                }}
              >
                <div className="w-9 h-9 inline-flex items-center justify-center flex-shrink-0 border border-[var(--color-divider-strong)] bg-[var(--color-surface)]">
                  <MapPin size={14} className="text-[var(--color-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[14px] text-[var(--color-ink)]">{addr.label}</p>
                    {addr.isDefault && (
                      <span className="text-white font-semibold px-2 py-0.5 text-[9px] uppercase tracking-[1px] bg-[var(--color-accent)]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--color-ink-muted)]">{addr.street}</p>
                  <p className="text-[12px] text-[var(--color-ink-muted)]">{addr.city}, {addr.country}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[11px] uppercase tracking-[1px] hover:underline text-[var(--color-accent)]">
                    Edit
                  </button>
                  {!addr.isDefault && (
                    <button
                      className="text-[var(--color-ink-faint)] hover:text-[var(--color-danger)] transition-colors"
                      aria-label="Delete address"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className={`btn ${saved ? 'btn-gold' : ''}`}>
            {saved && <Check size={14} />}
            {saved ? 'Saved' : 'Save Changes'}
          </button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
    </motion.div>
  );
}
