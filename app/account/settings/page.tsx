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
  { id: '2', label: 'Work', street: '456 Heritage Ave', city: 'Brooklyn, NY 11201', country: 'United States', isDefault: false },
];

export default function SettingsPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({
    newsletter: true,
    marketing: false,
    orders: true,
    twoFactor: false,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <div className="mb-8">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1" style={{ letterSpacing: '3px' }}>
          My Account
        </p>
        <h1 className="text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600 }}>
          Settings
        </h1>
      </div>

      <div className="space-y-6">
        {/* Change password */}
        <div
          className="card rounded-2xl p-6"
        >
          <h2 className="text-brand-charcoal font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
            Security
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Current Password</label>
              <div className="relative">
                <input type={showCurrent ? 'text' : 'password'} placeholder="Enter current password" className="glass-input pr-12" autoComplete="current-password" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors" aria-label="Toggle password visibility">
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>New Password</label>
              <div className="relative">
                <input type={showNew ? 'text' : 'password'} placeholder="New password" className="glass-input pr-12" autoComplete="new-password" />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors" aria-label="Toggle password visibility">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" className="glass-input" autoComplete="new-password" />
            </div>
          </div>

          {/* 2FA toggle */}
          <div
            className="flex items-center justify-between p-4 rounded-xl mt-2"
            style={{ background: 'rgba(212,165,116,0.05)', border: '1px solid rgba(212,165,116,0.1)' }}
          >
            <div>
              <p className="text-brand-charcoal font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-brand-charcoal/50 text-xs mt-0.5">Add an extra layer of security to your account</p>
            </div>
            <Toggle checked={toggles.twoFactor} onChange={() => toggle('twoFactor')} label="Two-factor authentication" />
          </div>
        </div>

        {/* Notifications */}
        <div
          className="card rounded-2xl p-6"
        >
          <h2 className="text-brand-charcoal font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: 'newsletter' as const, label: 'Newsletter', desc: 'New collections, drops, cultural stories' },
              { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Promotions, discounts, special offers' },
              { key: 'orders' as const, label: 'Order Updates', desc: 'Shipping confirmations, delivery notifications' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-brand-charcoal font-medium text-sm">{label}</p>
                  <p className="text-brand-charcoal/50 text-xs mt-0.5">{desc}</p>
                </div>
                <Toggle checked={toggles[key]} onChange={() => toggle(key)} label={label} />
              </div>
            ))}
          </div>
        </div>

        {/* Saved Addresses */}
        <div
          className="card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-brand-charcoal font-semibold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
              Saved Addresses
            </h2>
            <button
              className="glass-btn flex items-center gap-1.5"
              style={{ fontSize: '11px', letterSpacing: '0.5px', padding: '8px 14px' }}
            >
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
                  background: addr.isDefault ? 'rgba(212,165,116,0.06)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${addr.isDefault ? 'rgba(212,165,116,0.25)' : 'rgba(212,165,116,0.1)'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,165,116,0.1)' }}
                >
                  <MapPin size={14} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-brand-charcoal font-semibold text-sm">{addr.label}</p>
                    {addr.isDefault && (
                      <span
                        className="text-white font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: '#D4A574', fontSize: '9px', letterSpacing: '0.5px' }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-brand-charcoal/60 text-xs">{addr.street}</p>
                  <p className="text-brand-charcoal/60 text-xs">{addr.city}, {addr.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-brand-gold text-xs hover:underline" style={{ fontSize: '11px' }}>Edit</button>
                  {!addr.isDefault && (
                    <button className="text-red-400/70 hover:text-red-400 transition-colors" aria-label="Delete address">
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
            className="glass-btn glass-btn-primary flex items-center gap-2"
            style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '12px 24px' }}
          >
            {saved && <Check size={14} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button className="glass-btn" style={{ fontSize: '13px', padding: '12px 20px' }}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
