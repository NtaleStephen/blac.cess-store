'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, Plus, Trash2, MapPin } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ background: checked ? '#D4A574' : 'rgba(42,42,42,0.15)' }}
      aria-label={label}
      role="switch"
      aria-checked={checked}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(2px)' }}
      />
    </button>
  );
}

const SAVED_ADDRESSES = [
  { id: '1', label: 'Home', street: '123 Crown Street, Apt 4B', city: 'New York, NY 10001', country: 'United States', isDefault: true },
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

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
    padding: 24,
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <div className="mb-8">
        <span className="section-eyebrow">My Account</span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#2A2A2A' }}>
          Settings
        </h1>
      </div>

      <div className="space-y-5">
        {/* Security */}
        <div style={cardStyle}>
          <h2 className="font-serif font-semibold mb-5" style={{ fontSize: '18px', color: '#2A2A2A' }}>
            Security
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="input-label">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className="input"
                  style={{ paddingRight: 48 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-brand-gold"
                  style={{ color: 'rgba(42,42,42,0.4)' }}
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
                  className="input"
                  style={{ paddingRight: 48 }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-brand-gold"
                  style={{ color: 'rgba(42,42,42,0.4)' }}
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

          {/* 2FA toggle */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: '#F5F1EB', border: '1px solid rgba(42,42,42,0.07)' }}
          >
            <div>
              <p className="font-medium text-sm" style={{ color: '#2A2A2A' }}>Two-Factor Authentication</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>Add an extra layer of security to your account</p>
            </div>
            <Toggle checked={toggles.twoFactor} onChange={() => toggle('twoFactor')} label="Two-factor authentication" />
          </div>
        </div>

        {/* Notifications */}
        <div style={cardStyle}>
          <h2 className="font-serif font-semibold mb-5" style={{ fontSize: '18px', color: '#2A2A2A' }}>
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: 'newsletter' as const, label: 'Newsletter',     desc: 'New collections, drops, cultural stories' },
              { key: 'marketing'  as const, label: 'Marketing Emails', desc: 'Promotions, discounts, special offers' },
              { key: 'orders'     as const, label: 'Order Updates',  desc: 'Shipping confirmations, delivery notifications' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm" style={{ color: '#2A2A2A' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>{desc}</p>
                </div>
                <Toggle checked={toggles[key]} onChange={() => toggle(key)} label={label} />
              </div>
            ))}
          </div>
        </div>

        {/* Saved Addresses */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif font-semibold" style={{ fontSize: '18px', color: '#2A2A2A' }}>
              Saved Addresses
            </h2>
            <button className="btn btn-sm btn-outline" style={{ gap: 6 }}>
              <Plus size={13} />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {SAVED_ADDRESSES.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: addr.isDefault ? 'rgba(212,165,116,0.05)' : '#F5F1EB',
                  border: `1px solid ${addr.isDefault ? 'rgba(212,165,116,0.25)' : 'rgba(42,42,42,0.07)'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,165,116,0.12)' }}
                >
                  <MapPin size={14} style={{ color: '#D4A574' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm" style={{ color: '#2A2A2A' }}>{addr.label}</p>
                    {addr.isDefault && (
                      <span
                        className="text-white font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: '#D4A574', fontSize: '9px', letterSpacing: '0.5px' }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(42,42,42,0.6)' }}>{addr.street}</p>
                  <p className="text-xs" style={{ color: 'rgba(42,42,42,0.6)' }}>{addr.city}, {addr.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs hover:underline" style={{ color: '#D4A574', fontSize: '11px' }}>Edit</button>
                  {!addr.isDefault && (
                    <button
                      className="transition-colors hover:text-red-400"
                      style={{ color: 'rgba(244,67,54,0.5)' }}
                      aria-label="Delete address"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`btn ${saved ? 'btn-gold' : ''}`}
          >
            {saved && <Check size={14} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
    </motion.div>
  );
}
