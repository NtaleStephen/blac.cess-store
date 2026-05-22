'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';
import { fadeInUp } from '@/lib/animations';

export default function AccountPage() {
  const [saved, setSaved]           = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <header className="mb-8">
        <h2 className="heading-lg">Profile</h2>
        <p className="body-sm mt-2">Manage your personal information and preferences.</p>
      </header>

      <div className="space-y-6">
        {/* Avatar section */}
        <div className="card-static p-7 flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[32px] font-bold bg-[var(--color-accent)]">
              {mockUser.name[0]}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center bg-[var(--color-ink)] text-white border-2 border-[var(--color-surface)]"
              aria-label="Change avatar"
            >
              <Camera size={12} />
            </button>
          </div>
          <div className="min-w-0">
            <p className="font-serif font-semibold text-[18px] text-[var(--color-ink)]">
              {mockUser.name}
            </p>
            <p className="text-[13px] text-[var(--color-ink-muted)]">{mockUser.email}</p>
            <button className="text-[11px] uppercase tracking-[1px] mt-2 hover:underline text-[var(--color-accent)]">
              Change photo
            </button>
          </div>
        </div>

        {/* Personal info form */}
        <div className="card-static p-7">
          <h3 className="heading-md mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Full Name',     placeholder: mockUser.name,                   type: 'text',  col2: true },
              { label: 'Email Address', placeholder: mockUser.email,                  type: 'email' },
              { label: 'Phone Number',  placeholder: mockUser.phone ?? '+1 555 0100', type: 'tel' },
              { label: 'Date of Birth', placeholder: '',                              type: 'date' },
            ].map(({ label, placeholder, type, col2 }) => (
              <div key={label} className={col2 ? 'sm:col-span-2' : ''}>
                <label className="input-label">{label}</label>
                <input
                  type={type}
                  defaultValue={placeholder}
                  placeholder={placeholder}
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="card-static p-7">
          <h3 className="heading-md mb-6">Preferences</h3>
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-medium text-[14px] text-[var(--color-ink)]">Newsletter</p>
              <p className="text-[12px] mt-1 text-[var(--color-ink-muted)]">
                Receive new collection drops and exclusive offers
              </p>
            </div>
            <button
              onClick={() => setNewsletter(!newsletter)}
              className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
              style={{ background: newsletter ? 'var(--color-ink)' : 'var(--color-divider-strong)' }}
              aria-label="Toggle newsletter"
              role="switch"
              aria-checked={newsletter}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: newsletter ? 'translateX(22px)' : 'translateX(2px)' }}
              />
            </button>
          </div>
        </div>

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
