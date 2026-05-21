'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';
import { fadeInUp } from '@/lib/animations';

export default function AccountPage() {
  const [saved, setSaved] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1" style={{ letterSpacing: '3px' }}>
          My Account
        </p>
        <h1 className="text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600 }}>
          Profile
        </h1>
      </div>

      <div className="space-y-6">
        {/* Avatar section */}
        <div
          className="rounded-2xl p-6 flex items-center gap-5"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,165,116,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)' }}
            >
              {mockUser.name[0]}
            </div>
            <button
              className="glass-btn-icon absolute -bottom-1 -right-1"
              style={{ minWidth: '30px', minHeight: '30px', width: '30px', height: '30px', padding: '6px', background: '#D4A574', border: 'none' }}
              aria-label="Change avatar"
            >
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-brand-charcoal" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
              {mockUser.name}
            </p>
            <p className="text-brand-charcoal/55 text-sm">{mockUser.email}</p>
            <button className="text-brand-gold text-xs hover:underline mt-1" style={{ fontSize: '11px' }}>
              Change photo
            </button>
          </div>
        </div>

        {/* Personal info form */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,165,116,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <h2 className="text-brand-charcoal font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', placeholder: mockUser.name, type: 'text', col2: true },
              { label: 'Email Address', placeholder: mockUser.email, type: 'email' },
              { label: 'Phone Number', placeholder: mockUser.phone ?? '+1 555 0100', type: 'tel' },
              { label: 'Date of Birth', placeholder: '', type: 'date' },
            ].map(({ label, placeholder, type, col2 }) => (
              <div key={label} className={col2 ? 'sm:col-span-2' : ''}>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  {label}
                </label>
                <input
                  type={type}
                  defaultValue={placeholder}
                  placeholder={placeholder}
                  className="glass-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,165,116,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <h2 className="text-brand-charcoal font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>
            Preferences
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Newsletter', desc: 'Receive new collection drops and exclusive offers', state: newsletter, toggle: () => setNewsletter(!newsletter) },
            ].map(({ label, desc, state, toggle }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-brand-charcoal font-medium text-sm">{label}</p>
                  <p className="text-brand-charcoal/50 text-xs mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={toggle}
                  className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
                  style={{ background: state ? '#D4A574' : 'rgba(42,42,42,0.15)' }}
                  aria-label={`Toggle ${label}`}
                  role="switch"
                  aria-checked={state}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                    style={{ transform: state ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="glass-btn glass-btn-primary flex items-center gap-2"
            style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '12px 24px' }}
          >
            {saved ? <Check size={14} /> : null}
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
